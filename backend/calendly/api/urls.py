from rest_framework.routers import DefaultRouter

from .views import CalendlyTaskViewSet

urlpatterns = [
    
]

r = DefaultRouter()
r.register('calendlytask', CalendlyTaskViewSet, basename='caledly-task')
urlpatterns += r.urls