from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import (
    CreateModelMixin, UpdateModelMixin, 
    ListModelMixin, RetrieveModelMixin, 
    DestroyModelMixin
)

from backend.core import PermissionMixin, SerializerMixin, FastResponseMixin

class UpdateCreateDestoyViewSet(
    CreateModelMixin, UpdateModelMixin, DestroyModelMixin, 
    GenericViewSet
):
    '''
    Переопределение методов сериализатора и прав доступа
    '''
    pass

class SPFUpdateCreateDestoyViewSet(
    PermissionMixin, SerializerMixin, FastResponseMixin,
    CreateModelMixin, UpdateModelMixin, DestroyModelMixin, 
    GenericViewSet
):
    '''
    Переопределение методов сериализатора и прав доступа
    '''
    pass

class PUpdateCreateDestoyViewSet(
    PermissionMixin, CreateModelMixin, UpdateModelMixin, 
    DestroyModelMixin, GenericViewSet
):
    '''
    Переопределение методов сериализатора и прав доступа
    '''
    pass