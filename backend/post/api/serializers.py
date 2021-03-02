from rest_framework import serializers

from post.models import Post, Comment

from worker.api.serializers import ShortWorkerSerializer
from department.api.serializers import DepartmentSerializer

class CommentSerializer(serializers.ModelSerializer):
    '''Сериализация комеентария'''
    user = ShortWorkerSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):
    '''Сериализация поста'''
    depart = DepartmentSerializer(read_only=True)
    num_likes = serializers.IntegerField(read_only=True)
    is_liked = serializers.BooleanField(read_only=True)
    num_comments = serializers.IntegerField(read_only=True)
    last_comment = CommentSerializer(read_only=True)

    class Meta:
        model = Post
        fields = '__all__'
        read_only_fields = ['timestamp']

class PostCreateSerializer(serializers.ModelSerializer):
    '''Сериализация создания поста'''

    class Meta:
        model = Post
        fields = '__all__'
        read_only_fields = ['timestamp']
