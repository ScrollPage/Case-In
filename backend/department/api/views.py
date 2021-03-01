from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.generics import UpdateAPIView
from rest_framework.decorators import action
from django.db.models import Count, Subquery, OuterRef, Q, Exists
from django.shortcuts import get_object_or_404

from .service import SPFCreateUpdateDeleteRetrieveViewSet
from .serializers import (
    DepartmentSerializer, DepartmentInfoSerializer, 
    DepMembershipSerializer, MembersSerializer
)
from department.models import Department, DepartmentInfo, DepMembership
from .permissions import IsSuperUser, IsDepOwner, IsDepOwnerInfo

from worker.models import Worker

class DepartmentViewSet(SPFCreateUpdateDeleteRetrieveViewSet):
    '''Все про отделы'''
    serializer_class = DepartmentSerializer
    serializer_class_by_action = {
        'membertoggle': DepMembershipSerializer,
        'worker': MembersSerializer
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
        '''Войти/выйти из группы'''
        dep = self.get_object()
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = get_object_or_404(Worker, id=serializer.data.get('user'))
        ship, fl = DepMembership.objects.get_or_create(
            user=user, depart=dep
        )
        if fl:
            return Response(status=status.HTTP_201_CREATED)
        else:
            ship.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=True)
    def worker(self, request, *args, **kwargs):
        '''Работники отдела'''
        return self.fast_response('workers')

    @action(detail=True)
    def worker(self, request, *args, **kwargs):
        '''Документы отдела'''
        return self.fast_response('docs')

    def get_queryset(self):
        queryset = Department.objects.all()
        if self.action != 'retrieve':
            return queryset
        return queryset \
            .annotate(num_workers=Count('workers', distinct=True)) \
            .annotate(joined=Exists(
                    DepMembership.objects.filter(
                        depart=OuterRef('id'), 
                        user=self.request.user
                    )
                )
            )

    def perform_create(self, serializer):
        serializer.save(admin=self.request.user)

class DepartmentInfoView(UpdateAPIView):
    '''Обновление информации об отделе'''
    serializer_class = DepartmentInfoSerializer
    permission_classes = [permissions.IsAuthenticated, IsDepOwnerInfo]
    queryset = DepartmentInfo.objects.all()