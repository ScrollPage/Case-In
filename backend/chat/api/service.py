from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework.mixins import CreateModelMixin, UpdateModelMixin, DestroyModelMixin, ListModelMixin

from backend.core import PermissionMixin, SerializerMixin, FastResponseMixin

class PSFModelViewSet(
    PermissionMixin, SerializerMixin, FastResponseMixin, 
    ModelViewSet, GenericViewSet
):
    '''
    Создание модели
    Изменение модели
    Удаление модели
    Переопределение определения сериализатора и прав доступа
    '''
    pass
