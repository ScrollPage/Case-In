from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

from .serializers import AchievementSerializer
from achieve.models import Achievement
from .permissions import IsFirstLogin


class AchieveView(APIView):
    """Создание достижений"""

    serializer_class = AchievementSerializer
    permission_classes = [permissions.IsAuthenticated, IsFirstLogin]

    def put(self, request, *args, **kwargs):
        """Ачивка номер 1"""
        user = request.user
        user.first_login = False
        user.save()
        achieve = Achievement.objects.get(name=1, user=user)
        achieve.set_done()
        return Response(status=status.HTTP_202_ACCEPTED)
