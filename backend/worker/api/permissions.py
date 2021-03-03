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

class IsAdmin(BasePermission):
    '''Админ ли'''
    def has_permission(self, request, view):
        return request.user.is_admin

class CanUpdateReview(BasePermission):
    '''Может ли обновлять отзыв'''
    def has_object_permission(self, request, view, obj):
        return request.user == obj.user

class CanDestroyReview(BasePermission):
    '''Может ли обновлять отзыв'''
    def has_object_permission(self, request, view, obj):
        return any([
            request.user == obj.user,
            request.user == obj.estimated
        ])