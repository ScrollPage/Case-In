from rest_framework.permissions import BasePermission
from django.shortcuts import get_object_or_404

from department.models import Department

class IsSuperUser(BasePermission):
    '''Явлсяется ли суперпользователем'''
    def has_permission(self, request, view):
        return request.user.is_superuser

class IsDepOwner(BasePermission):
    '''Явлсяется ли суперпользователем'''
    def has_object_permission(self, request, view, obj):
        return obj.admin == request.user