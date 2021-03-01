from rest_framework.generics import UpdateAPIView
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db.models import Avg

from worker.models import WorkerInfo, Worker
from .serializers import WorkerInfoSerializer, WorkerSerializer
from .permissions import IsRightUser, RightMentor
from .service import SPFListRetrieveViewSet

from achieve.api.serializers import AchievementSerializer
from department.api.serializers import MembersSerializer

from backend.core import EmptySerializer

class WorkerViewSet(SPFListRetrieveViewSet):
    '''Все про пользователей'''
    serializer_class = WorkerSerializer 
    serializer_class_by_action = {
        'depart': MembersSerializer,
        'achiebement': AchievementSerializer,
        'mentor': EmptySerializer,
        'donementor': EmptySerializer
    }
    permission_classes = [permissions.IsAuthenticated]
    permission_classes_by_action = {
        'donementor': [permissions.IsAuthenticated, RightMentor],
        'diagramtask': [permissions.IsAuthenticated, RightMentor]
    }

    def get_queryset(self):
        queryset = Worker.objects.all()
        if self.request.method != 'GET':
            return queryset
        return queryset \
            .annotate(avg_rating=Avg('rating__star'))
            
    @action(detail=True, methods=['post'])
    def donementor(self, request, *args, **kwargs):
        '''Ментор оканчивает свою работу и уходит в закат'''
        user = self.get_object()
        user.mentor = None
        user.ready = True
        user.save()
        return Response(status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def mentor(self, request, *args, **kwargs):
        '''Стать ментором'''
        user = self.get_object()
        if user.mentor:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        user.mentor = request.user
        user.save()
        return Response(status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'])
    def me(self, request, *args, **kwargs):
        '''Вывод собственной страницы'''
        user = self.get_queryset().get(id=self.request.user.id)
        serializer = self.get_serializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True)
    def diagramtask(self, request, *args, **kwargs):
        '''Все задачи на диаграмме ганта пользователя'''
        return self.fast_response('diagram_tasks')

    @action(detail=True)
    def depart(self, request, *args, **kwargs):
        '''Отделы пользователя'''
        return self.fast_response('departments')

    @action(detail=True)
    def achievement(self, request, *args, **kwargs):
        '''Достижения пользователя'''
        return self.fast_response('achievements')

class WorkerInfoUpdateView(UpdateAPIView):
    '''Обновление информации о сотруднике'''
    queryset = WorkerInfo.objects.all()
    serializer_class = WorkerInfoSerializer
    permission_classes = [permissions.IsAuthenticated, IsRightUser]