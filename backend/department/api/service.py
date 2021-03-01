from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import (
    CreateModelMixin, UpdateModelMixin, 
    ListModelMixin, RetrieveModelMixin, 
    DestroyModelMixin
)

from backend.core import PermissionMixin, SerializerMixin, FastResponseMixin

class SPFCreateUpdateDeleteRetrieveViewSet(
    GenericViewSet, PermissionMixin, 
    SerializerMixin, FastResponseMixin,
    CreateModelMixin, UpdateModelMixin, 
    RetrieveModelMixin, DestroyModelMixin
):
    '''
    Переопределение методов сериализатора и прав доступа
    '''
    pass
