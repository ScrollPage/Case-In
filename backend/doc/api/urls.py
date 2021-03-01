from rest_framework.routers import DefaultRouter
from django.urls import path

from .views import DocViewSet

urlpatterns = [
    
]

r = DefaultRouter()
r.register('doc', DocViewSet, basename='doc')
urlpatterns += r.urls