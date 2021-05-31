from rest_framework.permissions import BasePermission

from django.shortcuts import get_object_or_404


class IsRightMentor(BasePermission):
    """Является ментором пользователя"""

    def has_permission(self, request, view):
        try:
            user = request.data["user"]
        except KeyError:
            return any(
                [
                    request.user.padawans.filter(id=int(user)).exists(),
                    request.user.is_superuser,
                    all([request.user == user, request.user.ready]),
                ]
            )

    def has_object_permission(self, request, view, obj):
        return any(
            [
                obj.mentor == request.user,
                request.user.is_superuser,
                all([request.user == obj.user, request.user.ready]),
            ]
        )
