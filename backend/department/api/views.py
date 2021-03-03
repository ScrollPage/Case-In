from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.generics import UpdateAPIView
from rest_framework.decorators import action
from django.db.models import Count, Subquery, OuterRef, Q, Exists, Avg
from django.shortcuts import get_object_or_404

from url_filter.integrations.drf import DjangoFilterBackend

from .service import SPFModelViewSet
from .serializers import (
    DepartmentSerializer, DepartmentInfoSerializer, 
    DepMembershipSerializer, MembersSerializer
)
from department.models import Department, DepartmentInfo, DepMembership
from .permissions import (
    IsSuperUser, IsDepOwner, IsDepOwnerInfo, 
    IsAdmin, IsDepartMember
)

from worker.models import Worker
from calendly.api.serializers import CalendlySerializer
from doc.api.serializers import DocSerializer
from post.api.serializers import PostSerializer

class DepartmentViewSet(SPFModelViewSet):
    '''Все про отделы'''
    serializer_class = DepartmentSerializer
    serializer_class_by_action = {
        'membertoggle': DepMembershipSerializer,
        'worker': MembersSerializer,
        'calendlytask': CalendlySerializer,
        'post': PostSerializer,
        'doc': DocSerializer
    }
    permission_classes = [permissions.IsAuthenticated]
    permission_classes_by_action = {
        'create': [permissions.IsAuthenticated, IsSuperUser],
        'update': [permissions.IsAuthenticated, IsDepOwner],
        'partial_update': [permissions.IsAuthenticated, IsDepOwner],
        'membertoggle': [permissions.IsAuthenticated, IsDepOwner],
        'mentor': [permissions.IsAuthenticated, IsAdmin]
    }
    filter_backends = [DjangoFilterBackend]
    filter_fields = '__all__'

    @action(detail=True, methods=['post'])
    def membertoggle(self, request, *args, **kwargs):
        '''Войти/выйти из группы'''
        dep = self.get_object()
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = get_object_or_404(Worker, id=serializer.data.get('user'))
        ship, fl = DepMembership.objects.get_or_create(
            user=user, depart=dep
        )
        if fl:
            return Response(status=status.HTTP_201_CREATED)
        else:
            ship.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=True)
    def post(self, request, *args, **kwargs):
        '''Посты отдела'''
        posts = self.fast_response('posts', pre_return=True)
        posts = posts \
            .annotate(num_likes=Count('likes', distinct=True)) \
            .annotate(is_liked=Count('likes', filter=Q(
                likes__user=request.user), distinct=True
                )
            ) \
            .annotate(num_comments=Count('comments', distinct=True))
        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True)
    def worker(self, request, *args, **kwargs):
        '''Работники отдела'''
        return self.fast_response('workers')

    @action(detail=True)
    def doc(self, request, *args, **kwargs):
        '''Документы отдела'''
        return self.fast_response('docs')

    @action(detail=True)
    def calendlytask(self, request, *args, **kwargs):
        '''Календарь отдела'''
        depart = self.get_object()
        tasks = depart.calendly_tasks.all() \
            .annotate(going=Count(
                'confirmations', 
                filter=Q(confirmations__user=self.request.user), distinct=True)
            )
        serializer = self.get_serializer(tasks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def get_queryset(self):
        queryset = Department.objects.all()
        if self.action != 'retrieve' and self.action != 'list':
            return queryset
        return queryset \
            .annotate(num_workers=Count('workers', distinct=True)) \
            .annotate(joined=Exists(
                    DepMembership.objects.filter(
                        depart=OuterRef('id'), 
                        user=self.request.user
                    )
                )
            ) \
            .annotate(rate=Avg('workers__user__rating__star__value')) \
            .annotate(has_chat=Count(
                    'admin__chats', 
                    filter=Q(
                        admin__chats__members__in=[self.request.user],
                        admin__chats__is_chat=True
                    ),
                    distinct=True
                )
            ) \
            .annotate(chat_id=Avg(
                    'admin__chats__id', 
                    filter=Q(
                        admin__chats__members__in=[self.request.user], 
                        admin__chats__is_chat=True
                    ),
                    distinct=True
                )
            ) \
            .order_by(self.request.query_params.get('sort', '-created'))
                
    def perform_create(self, serializer):
        serializer.save(admin=self.request.user)

class DepartmentInfoView(UpdateAPIView):
    '''Обновление информации об отделе'''
    serializer_class = DepartmentInfoSerializer
    permission_classes = [permissions.IsAuthenticated, IsDepOwnerInfo]
    queryset = DepartmentInfo.objects.all()