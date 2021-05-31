from rest_framework.routers import DefaultRouter
from django.urls import path

from .views import DocViewSet, ChatDocView

urlpatterns = [path("chatdoc/", ChatDocView.as_view(), name="chat-doc")]

r = DefaultRouter()
r.register("doc", DocViewSet, basename="doc")
urlpatterns += r.urls
