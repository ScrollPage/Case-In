from rest_framework import permissions

from doc.models import Doc
from .serializers import DocSerializer
from .service import CreateDestroyViewSet
from .permissions import IsAdmin

class DocViewSet(CreateDestroyViewSet):
    '''Создание и удаление документов'''
    serializer_class = DocSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]
    queryset = Doc.objects.all()