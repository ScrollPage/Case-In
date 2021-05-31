from rest_framework.routers import DefaultRouter
from django.urls import path

from .views import DepartmentViewSet, DepartmentInfoView

urlpatterns = [
    path("depart/info/<int:pk>/", DepartmentInfoView.as_view(), name="department-info")
]

r = DefaultRouter()
r.register("depart", DepartmentViewSet, basename="department")
urlpatterns += r.urls
