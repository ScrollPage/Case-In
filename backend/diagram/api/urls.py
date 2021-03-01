from rest_framework.routers import DefaultRouter

from .views import DiagramTaskViewSet

urlpatterns = [
    
]

r = DefaultRouter()
r.register('diagramtask', DiagramTaskViewSet, basename='diagram-task')
urlpatterns += r.urls

