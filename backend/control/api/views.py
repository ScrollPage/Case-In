from rest_framework.generics import UpdateAPIView
from rest_framework import permissions

from .serializers import TestSerializer
from control.models import Test

class TestView(UpdateAPIView):
    '''Создание теста'''
    serializer_class = TestSerializer
    permisson_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Test.objects.filter(user=self.request.user)