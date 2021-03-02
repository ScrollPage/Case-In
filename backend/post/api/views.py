from rest_framework import permissions
from rest_framework.decorators import action

from .serializers import PostSerializer, CommentSerializer, PostCreateSerializer
from .service import UpdateCreateDestoyViewSet
from .permissions import IsAdmin, IsCommentAuthor
from post.models import Post, Comment

from backend.core import PermissionMixin, FastResponseMixin, SerializerMixin

class PostViewSet(FastResponseMixin, SerializerMixin, UpdateCreateDestoyViewSet):
    '''Создание, удаление, обновление поста'''
    serializer_class = PostSerializer
    serializer_class_by_action = {
        'comment': CommentSerializer,
        'create': PostCreateSerializer
    }
    permission_classes = [permissions.IsAuthenticated, IsAdmin]
    queryset = Post.objects.all()

    @action(detail=True)
    def comment(self, request, *args, **kwargs):
        '''Комментарии поста'''
        return self.fast_response('comments')

class CommentViewSet(PermissionMixin, UpdateCreateDestoyViewSet):
    '''Создание, удаление, изменение комментария'''
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated, IsCommentAuthor]
    permission_classes_by_action = {
        'create': [permissions.IsAuthenticated],
    }
    queryset = Comment.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
