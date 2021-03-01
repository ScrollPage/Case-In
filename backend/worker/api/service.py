from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import (
    CreateModelMixin, UpdateModelMixin, 
    ListModelMixin, RetrieveModelMixin, 
    DestroyModelMixin
)

from backend.core import PermissionMixin, SerializerMixin, FastResponseMixin

class SPFViewSet(
    GenericViewSet, PermissionMixin, 
    SerializerMixin, FastResponseMixin
):
    '''
    Переопределение методов сериализатора и прав доступа
    '''
    pass
