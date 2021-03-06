from rest_framework.permissions import BasePermission
from django.shortcuts import get_object_or_404

from department.models import Department, DepMembership


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


class IsInDepart(BasePermission):
    def has_permission(self, request, view):
        try:
            depart = request.data["depart"]
        except KeyError:
            return True
        return DepMembership.objects.filter(depart=depart, user=request.user).exists()

    def has_object_permission(self, request, view, obj):
        return DepMembership.objects.filter(
            depart=obj.depart, user=request.user
        ).exists()
