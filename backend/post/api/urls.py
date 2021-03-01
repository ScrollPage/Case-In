from rest_framework.routers import DefaultRouter

from .views import PostViewSet

urlpatterns = [
    
]

r = DefaultRouter()
r.register('post', PostViewSet, basename='post')
urlpatterns += r.urls