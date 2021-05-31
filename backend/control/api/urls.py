from django.urls import path

from .views import TestView

urlpatterns = [path("test/<int:pk>/", TestView.as_view(), name="test")]
