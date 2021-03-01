from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import (
    CreateModelMixin, UpdateModelMixin, 
    ListModelMixin, RetrieveModelMixin, 
    DestroyModelMixin
)

from backend.core import PermissionMixin, SerializerMixin, FastResponseMixin

class SPFListRetrieveViewSet(
    PermissionMixin, SerializerMixin, FastResponseMixin,
    GenericViewSet, RetrieveModelMixin, ListModelMixin,
):
    '''
    Переопределение методов сериализатора и прав доступа
    '''
    pass

# def union_qs(depart, queryset):
    
#     def _union(instances, queryset):
#         return queryset.union(instances)
    
#     return list(map(lambda instances:_union(instances, queryset)))