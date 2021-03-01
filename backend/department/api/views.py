from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.generics import UpdateAPIView
from rest_framework.decorators import action
from django.db.models import Count, Subquery, OuterRef, Q

from .service import SPFCreateUpdateDeleteRetrieveViewSet
from .serializers import (
    DepartmentSerializer, DepartmentInfoSerializer, 
    DepMembershipSerializer
)
from department.models import Department, DepartmentInfo, DepMembership
from .permissions import IsSuperUser, IsDepOwner

class DepartmentViewSet(SPFCreateUpdateDeleteRetrieveViewSet):
    '''Все про отделы'''
    serializer_class = DepartmentSerializer
    serializer_class_by_action = {

    }
    permission_classes = [permissions.IsAuthenticated]
    permission_classes_by_action = {
        'create': [permissions.IsAuthenticated, IsSuperUser],
        'update': [permissions.IsAuthenticated, IsDepOwner],
        'partial_update': [permissions.IsAuthenticated, IsDepOwner],
        'membertoggle': [permissions.IsAuthenticated, IsDepOwner],
    }

    @action(detail=True, methods=['post'])
    def membertoggle(self, request, *args, **kwargs):
        dep = self.get_object()
        serializer = self.get_serializer(request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.data.get('user')
        ship, fl = DepMembership.objects.get_or_create(user=user, depart=dep)
        if fl:
            return Response(status=status.HTTP_201_CREATED)
        else:
            ship.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

    def get_queryset(self):
        queryset = Department.objects.all()
        if self.action != 'retrieve':
            return queryset
        return queryset \
            .annotate(num_workers=Count('workers', distinct=True))

    def perform_create(self, serializer):
        serializer.save(admin=self.request.user)

class DepartmentInfo(UpdateAPIView):
    '''Обновление информации об отделе'''
    serializer_class = DepartmentInfoSerializer
    permission_classes = [IsDepOwner]
    queryset = DepartmentInfo.objects.all()