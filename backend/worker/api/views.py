from rest_framework.generics import UpdateAPIView
from rest_framework import permissions
from rest_framework.decorators import action
from django.db.models.signals import post_save
from django.dispatch import receiver

from worker.models import WorkerInfo, Worker
from .serializers import WorkerInfoSerializer
from .permissions import IsRightUser
from .service import SPFViewSet 

from achieve.api.serializers import AchievementSerializer
from department.api.serializers import MembersSerializer

class WorkerViewSet(SPFViewSet):
    '''Все про пользователей'''
    serializer_class = AchievementSerializer
    serializer_class_by_action = {
        'depart': MembersSerializer
    }
    permission_classes = [permissions.IsAuthenticated]
    permission_classes_by_action = {

    }
    queryset = Worker.objects.all()

    @action(detail=True)
    def depart(self, request, *args, **kwargs):
        '''Отделы пользователя'''
        return self.fast_response('departments')

    @action(detail=True)
    def achievement(self, request, *args, **kwargs):
        return self.fast_response('achievements')

class WorkerInfoUpdateView(UpdateAPIView):
    '''Обновление информации о сотруднике'''
    queryset = WorkerInfo.objects.all()
    serializer_class = WorkerInfoSerializer
    permission_classes = [permissions.IsAuthenticated, IsRightUser]