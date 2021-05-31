from rest_framework import permissions
from rest_framework.generics import CreateAPIView

from doc.models import Doc
from .serializers import DocSerializer, ChatDocSerializer
from .service import CreateDestroyViewSet
from .permissions import IsAdmin, UserInChat


class DocViewSet(CreateDestroyViewSet):
    """Создание и удаление документов"""

    serializer_class = DocSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]
    queryset = Doc.objects.all()


class ChatDocView(CreateAPIView):
    """Создание документа в чате"""

    serializer_class = ChatDocSerializer
    permission_classes = [permissions.IsAuthenticated, UserInChat]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
