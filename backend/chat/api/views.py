

from chat.models import Chat 
from .service import PSFModelViewSet

class ChatViewSet(PSFModelViewSet):
    '''Создание, удаление, список, изменение, обзор чата'''
    serializer_class = 
    serializer_class_by_action = {

    }
    permission_classes = 
    permission_classes_by_action = {
        
    }

    def get_queryset(self):
        return Chat.objects.all()