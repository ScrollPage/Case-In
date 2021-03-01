from rest_framework.routers import DefaultRouter

from .views import DepartmentViewSet

urlpatterns = [
    
]

r = DefaultRouter()
r.register('depart', DepartmentViewSet, basename='department')
urlpatterns += r.urls