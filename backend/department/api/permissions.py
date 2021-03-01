from rest_framework.permissions import BasePermission
from django.shortcuts import get_object_or_404

from department.models import Department, DepMembership

class IsSuperUser(BasePermission):
    '''Явлсяется ли суперпользователем'''
    def has_permission(self, request, view):
        return request.user.is_superuser

class IsDepOwner(BasePermission):
    '''Явлсяется ли админом'''
    def has_object_permission(self, request, view, obj):
        return obj.admin == request.user

class IsDepOwnerInfo(BasePermission):
    '''Явлсяется ли админом'''
    def has_object_permission(self, request, view, obj):
        return obj.depart.admin == request.user

class IsAdmin(BasePermission):
    '''Админ ли'''
    def has_permission(self, request, view):
        return request.user.is_admin

class IsDepartMember(BasePermission):
    '''Является ли работаником отдела'''
    def has_object_permission(self, request, view, obj):
        return DepMembership.objects.filter(user=self.request.user, depart=obj)
