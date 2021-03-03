from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action

from .serializers import PostSerializer, CommentSerializer, PostCreateSerializer
from .service import SPFUpdateCreateDestoyViewSet, PUpdateCreateDestoyViewSet
from .permissions import IsAdmin, IsCommentAuthor
from post.models import Post, Comment

from backend.core import (
    PermissionMixin, FastResponseMixin, 
    SerializerMixin, EmptySerializer
)
from feed.models import Like

class PostViewSet(SPFUpdateCreateDestoyViewSet):
    '''Создание, удаление, обновление поста'''
    serializer_class = PostSerializer
    serializer_class_by_action = {
        'comment': CommentSerializer,
        'create': PostCreateSerializer,
        'like': EmptySerializer
    }
    permission_classes = [permissions.IsAuthenticated, IsAdmin]
    permission_classes_by_action = {
        'like': [permissions.IsAuthenticated],
        'comment': [permissions.IsAuthenticated],
    }
    queryset = Post.objects.all()

    @action(detail=True)
    def comment(self, request, *args, **kwargs):
        '''Комментарии поста'''
        return self.fast_response('comments')

    @action(detail=True, methods=['post'])
    def like(self, request, *args, **kwargs):
        '''Лайк к посту'''
        post = self.get_object()
        like, fl = Like.objects.get_or_create(post=post, user=request.user)
        if fl:
            return Response(status=status.HTTP_201_CREATED)
        else:
            like.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

class CommentViewSet(PUpdateCreateDestoyViewSet):
    '''Создание, удаление, изменение комментария'''
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated, IsCommentAuthor]
    permission_classes_by_action = {
        'create': [permissions.IsAuthenticated],
    }
    queryset = Comment.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
