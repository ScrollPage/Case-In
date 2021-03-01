from rest_framework import permissions

from .serializers import PostSerializer
from .service import UpdateCreateDestoyViewSet
from .permissions import IsAdmin
from post.models import Post

class PostViewSet(UpdateCreateDestoyViewSet):
    '''Создание, удаление, обновление поста'''
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]
    queryset = Post.objects.all()