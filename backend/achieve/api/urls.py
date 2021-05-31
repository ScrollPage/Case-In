from django.urls import path

from .views import AchieveView

urlpatterns = [path("achieve/", AchieveView.as_view(), name="achieve")]
