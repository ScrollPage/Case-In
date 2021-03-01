from rest_framework import permissions

from calendly.models import CalendlyTask
from .service import CreatepdateDestroyViewSet
from .serializers import CalendlySerializer
from .permissions import IsAdmin

class CalendlyTaskViewSet(CreatepdateDestroyViewSet):
    '''Задачи в календаре отдела'''

    serializer_class = CalendlySerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]
    queryset = CalendlyTask.objects.all()