from django.urls import path

from .views import WorkerInfoUpdateView

urlpatterns = [
    path('info/<int:pk>/', WorkerInfoUpdateView.as_view(), name='info-update')
]