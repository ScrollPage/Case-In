from rest_framework.generics import UpdateAPIView
from rest_framework import permissions

from control.models import Test

class TestView(CreateAPIView):
    '''Создание теста'''
    serializer_class = 
    permisson_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Test.objects.filter(user=self.request.user)