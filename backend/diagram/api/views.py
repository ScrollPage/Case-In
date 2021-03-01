from rest_framework import permissions

from .permissions import IsRightMentor
from diagram.models import DiagramTask
from .serializers import TaskSerializer
from .service import UpdateCreateDestoyViewSet

class DiagramTaskViewSet(UpdateCreateDestoyViewSet):
    '''Задачи на диаграмме ганта'''
    serializer_class = TaskSerializer
    permissions_Class = [permissions.IsAuthenticated, IsRightMentor]
    queryset = DiagramTask.objects.all()
    