from rest_framework.generics import UpdateAPIView
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Avg, Count, Q, Avg

from url_filter.integrations.drf import DjangoFilterBackend

from ..models import WorkerInfo, Worker, Review
from .serializers import (
    WorkerInfoSerializer,
    WorkerSerializer,
    ReviewSerializer,
    ReviewSerializer,
)
from .permissions import (
    IsRightUser,
    RightMentor,
    CanUpdateReview,
    CanDestroyReview,
    IsAdmin,
)
from .service import SPFListRetrieveViewSet, PCreateUpdateDestroy

from ...achieve.api.serializers import AchievementSerializer
from ...department.api.serializers import MembersSerializer
from ...diagram.api.serializers import TaskSerializer
from ...calendly.api.serializers import CalendlySerializer
from ...chat.api.serializers import ChatSerializer
from ...achieve.api.serializers import AchievementSerializer
from ...calendly.models import CalendlyTask
from ...notifications.api.serializers import NotificatonsSeralizer
from ...control.api.serializers import TestSerializer
from ...backend.core import EmptySerializer


class WorkerViewSet(SPFListRetrieveViewSet):
    """Все про пользователей"""

    serializer_class = WorkerSerializer
    serializer_class_by_action = {
        "depart": MembersSerializer,
        "achiebement": AchievementSerializer,
        "mentor": EmptySerializer,
        "donementor": EmptySerializer,
        "diagramtask": TaskSerializer,
        "calendlytask": CalendlySerializer,
        "chat": ChatSerializer,
        "review": ReviewSerializer,
        "test": TestSerializer,
        "notification": NotificatonsSeralizer,
        "achieve": AchievementSerializer,
    }
    permission_classes = [permissions.IsAuthenticated]
    permission_classes_by_action = {
        "donementor": [permissions.IsAuthenticated, RightMentor],
        "diagramtask": [permissions.IsAuthenticated, RightMentor],
        "test": [permissions.IsAuthenticated, IsRightUser],
        "update": [permissions.IsAuthenticated, IsRightUser],
        "partial_update": [permissions.IsAuthenticated, IsRightUser],
        "mentor": [permissions.IsAuthenticated, IsAdmin],
    }
    filter_backends = [DjangoFilterBackend]
    filter_fields = "__all__"

    def get_queryset(self):
        queryset = Worker.objects.all()
        if self.request.method != "GET":
            return queryset
        return (
            queryset.annotate(rate=Avg("rating__star"))
            .annotate(num_reviews=Count("reviews", distinct=True))
            .annotate(
                has_chat=Count(
                    "chats",
                    filter=Q(
                        chats__members__in=[self.request.user], chats__is_chat=True
                    ),
                    distinct=True,
                )
            )
            .annotate(
                chat_id=Avg(
                    "chats__id",
                    filter=Q(
                        chats__members__in=[self.request.user], chats__is_chat=True
                    ),
                )
            )
            .annotate(
                achieve=Count(
                    "achievements", filter=Q(achievements__done=True), disctinct=True
                )
            )
            .annotate(total_achieve=Count("achievements", disctinct=True))
            .order_by(self.request.query_params.get("sort", "-registered"))
        )

    @action(detail=True, methods=["post"])
    def donementor(self, request, *args, **kwargs):
        """Ментор оканчивает свою работу и уходит в закат"""
        user = self.get_object()
        user.mentor = None
        user.ready = True
        user.save()
        return Response(status=status.HTTP_200_OK)

    @action(detail=False)
    def padawan(self, request, *args, **kwargs):
        padawans = self.get_queryset().filter(mentor=None, ready=False)
        serializer = self.get_serializer(padawans, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=["post"])
    def mentor(self, request, *args, **kwargs):
        """Стать ментором"""
        user = self.get_object()
        if user.mentor:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        user.mentor = request.user
        user.save()
        """Ачивка номер 3"""
        user.achievements.get(name=3).set_done()
        return Response(status=status.HTTP_200_OK)

    @action(detail=False)
    def me(self, request, *args, **kwargs):
        """Вывод собственной страницы"""
        user = self.get_queryset().get(id=self.request.user.id)
        user.num_tests = user.tests.aggregate(
            num_tests=Count("id", filter=Q(is_passed=False))
        )["num_tests"]
        user.num_notes = user.notifications.aggregate(
            num_notes=Count("id", filter=Q(seen=False))
        )["num_notes"]
        user.code = user.tg_code.get().code
        serializer = self.get_serializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False)
    def calendlytask(self, request, *args, **kwargs):
        """Все задачи из календаря"""
        user = request.user
        memberships = user.departments.all().select_related("depart")
        departs = [membership.depart for membership in memberships]
        queryset = (
            CalendlyTask.objects.filter(depart__in=departs)
            .annotate(
                going=Count(
                    "confirmations",
                    filter=Q(confirmations__user=self.request.user),
                    distinct=True,
                )
            )
            .order_by("-datetime")
        )
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False)
    def chat(self, request, *args, **kwargs):
        """Все задачи из календаря"""
        user = request.user
        chats = user.chats.all()
        serializer = self.get_serializer(chats, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True)
    def diagramtask(self, request, *args, **kwargs):
        """Все задачи на диаграмме ганта пользователя"""
        return self.fast_response("diagram_tasks")

    @action(detail=False)
    def notification(self, request, *args, **kwargs):
        """Все задачи на диаграмме ганта пользователя"""
        user = request.user
        notes = user.notifications.all()
        serializer = self.get_serializer(notes, many=True)
        notes.update(seen=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True)
    def depart(self, request, *args, **kwargs):
        """Отделы пользователя"""
        return self.fast_response("departments")

    @action(detail=False)
    def test(self, request, *args, **kwargs):
        """Тесты пользователя"""
        user = request.user
        tests = user.tests.all()
        serializer = self.get_serializer(tests, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True)
    def review(self, request, *args, **kwargs):
        """Отзывы пользователя"""
        return self.fast_response("reviews")

    @action(detail=True)
    def achieve(self, request, *args, **kwargs):
        """Достижения пользователя"""
        return self.fast_response("achievements")


class WorkerInfoUpdateView(UpdateAPIView):
    """Обновление информации о сотруднике"""

    queryset = WorkerInfo.objects.all()
    serializer_class = WorkerInfoSerializer
    permission_classes = [permissions.IsAuthenticated, IsRightUser]


class ReviewViewSet(PCreateUpdateDestroy):
    """Создание, удаление, обновление отзыва"""

    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated, CanUpdateReview]
    permission_classes_by_action = {
        "create": [permissions.IsAuthenticated],
        "destroy": [permissions.IsAuthenticated, CanDestroyReview],
    }
    queryset = Review.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
