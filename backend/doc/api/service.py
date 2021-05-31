from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import CreateModelMixin, DestroyModelMixin


class CreateDestroyViewSet(CreateModelMixin, DestroyModelMixin, GenericViewSet):
    """
    Создание сущности, удаление сущности
    Переопределение определения прав доступа
    """
