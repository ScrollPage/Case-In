from rest_framework import serializers

from post.models import Post

from department.api.serializers import DepartmentSerializer

class PostSerializer(serializers.ModelSerializer):
    '''Сериализация поста'''
    depart = DepartmentSerializer(read_only=True)
    num_likes = serializers.IntegerField(read_only=True)
    is_liked = serializers.BooleanField(read_only=True)

    class Meta:
        model = Post
        exclude = ['timestamp']
