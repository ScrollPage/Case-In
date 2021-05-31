from rest_framework.permissions import BasePermission


class IsFirstLogin(BasePermission):
    """Первый ли логин"""

    def has_permission(self, request, view):
        return request.user.first_login
