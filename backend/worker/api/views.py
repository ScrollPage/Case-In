from rest_framework.generics import UpdateAPIView
from rest_framework import permissions

from worker.models import WorkerInfo
from .serializers import WorkerInfoSerializer
from .permissions import IsRightUser



class WorkerInfoUpdateView(UpdateAPIView):
    '''Обновление информации о сотруднике'''
    queryset = WorkerInfo.objects.all()
    serializer_class = WorkerInfoSerializer
    permission_classes = [permissions.IsAuthenticated, IsRightUser]