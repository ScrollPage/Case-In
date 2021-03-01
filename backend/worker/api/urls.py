from rest_framework.routers import DefaultRouter
from django.urls import path

from .views import WorkerInfoUpdateView, WorkerViewSet

urlpatterns = [
    path('worker/info/<int:pk>/', WorkerInfoUpdateView.as_view(), name='info-update')
]

r = DefaultRouter()
r.register('worker', WorkerViewSet, basename='worker')
urlpatterns += r.urls