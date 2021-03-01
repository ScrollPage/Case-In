from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import (
    CreateModelMixin, UpdateModelMixin, 
    ListModelMixin, RetrieveModelMixin, 
    DestroyModelMixin
)

from backend.core import PermissionMixin, SerializerMixin, FastResponseMixin

class SPFViewSet(
    PermissionMixin, SerializerMixin, FastResponseMixin,
    GenericViewSet
):
    '''
    Переопределение методов сериализатора и прав доступа
    '''
    pass
