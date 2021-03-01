from rest_framework.permissions import BasePermission

class IsRightUser(BasePermission):
    '''Тот ли пользователь'''
    def has_object_permission(self, request, view, obj):
        return request.user.id == obj.id

class RightMentor(BasePermission):
    '''Тот ли ментор'''
    def has_object_permission(self, request, view, obj):
        return any([
            request.user == obj.mentor,
            request.user.is_superuser
        ])
