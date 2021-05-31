from rest_framework.permissions import BasePermission
from django.shortcuts import get_object_or_404

from department.models import Department

from chat.models import Chat


class IsAdmin(BasePermission):
    """Является ли админом"""

    def has_permission(self, request, view):
        try:
            depart = request.data["depart"]
        except KeyError:
            return True
        return request.user == get_object_or_404(Department, id=depart).admin

    def has_object_permission(self, request, view, obj):
        return obj.depart.admin == request.user


class UserInChat(BasePermission):
    """Может ли загружать документы в ту команду"""

    def has_permission(self, request, view):
        try:
            chat = request.data["chat"]
        except:
            return True
        return get_object_or_404(Chat, id=chat) in request.user.chats.all()
