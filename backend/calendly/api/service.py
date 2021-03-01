from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework.mixins import (
    CreateModelMixin, UpdateModelMixin, 
    ListModelMixin, RetrieveModelMixin, 
    DestroyModelMixin
)

from backend.core import PermissionMixin, SerializerMixin, FastResponseMixin

class CreatepdateDestroyViewSet(
    GenericViewSet, CreateModelMixin, UpdateModelMixin, 
    DestroyModelMixin
):
    '''
    Переопределение методов сериализатора и прав доступа
    '''
    pass
