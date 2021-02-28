from rest_framework.permissions import BasePermission

class IsRightUser(BasePermission):
    '''Тот ли пользователь'''
    def has_object_permission(self, request, view, obj):
        return request.user.id == obj.id