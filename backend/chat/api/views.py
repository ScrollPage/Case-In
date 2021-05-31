from rest_framework import permissions
from rest_framework.decorators import action

from chat.models import Chat
from .service import PSFModelViewSet
from .serializers import ChatSerializer, ChatCreateSerializer
from chat.models import Chat, Message
from doc.api.serializers import ChatDocSerializer
from .permissions import (
    IsNotChat,
    IsChat,
    IsTwoMembers,
    NoSuchChat,
    IsMember,
    YourIdIn,
    NotYourSelfChat,
)

from doc.api.serializers import ChatDocSerializer


class ChatViewSet(PSFModelViewSet):
    """Создание, удаление, список, изменение, обзор чата"""

    serializer_class = ChatSerializer
    serializer_class_by_action = {
        "create": ChatCreateSerializer,
        "doc": ChatDocSerializer,
    }
    permission_classes = [permissions.IsAuthenticated, IsNotChat, IsMember]
    permission_classes_by_action = {
        "create": [
            permissions.IsAuthenticated,
            IsTwoMembers,
            NoSuchChat,
            YourIdIn,
            NotYourSelfChat,
        ],
        "list": [permissions.IsAuthenticated],
        "retrieve": [permissions.IsAuthenticated, IsMember],
        "destroy": [permissions.IsAuthenticated, IsChat, IsMember],
    }

    def get_queryset(self):
        return Chat.objects.all()

    @action(detail=True)
    def doc(self, request, *args, **kwargs):
        """Документы чата"""
        return self.fast_response("docs")
