from rest_framework.routers import DefaultRouter

from .views import CalendlyTaskViewSet, ConfirmationViewSet

urlpatterns = [
]

r = DefaultRouter()
r.register('calendlytask', CalendlyTaskViewSet, basename='caledly-task')
r.register('conf', ConfirmationViewSet, basename='confirmation')
urlpatterns += r.urls