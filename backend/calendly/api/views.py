from rest_framework import permissions

from calendly.models import CalendlyTask, Confirmation
from .service import CreateUpdateDestroyViewSet, CreateDestroyViewSet
from .serializers import CalendlySerializer, ConfirmationSerializer
from .permissions import IsAdmin, IsInDepart

class CalendlyTaskViewSet(CreateUpdateDestroyViewSet):
    '''Задачи в календаре отдела'''

    serializer_class = CalendlySerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]
    queryset = CalendlyTask.objects.all()

class ConfirmationViewSet(CreateDestroyViewSet):
    '''Подтвердить поход на мероприятие'''

    serializer_class = ConfirmationSerializer
    permission_classes = [permissions.IsAuthenticated, IsInDepart]
    queryset = Confirmation.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)