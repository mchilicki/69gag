from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Meme, Like, Comment
from django.core.serializers.json import Serializer as JsonSerializer
from django.core.serializers.python import Serializer as PythonSerializer
from django.core.serializers.base import Serializer as BaseSerializer


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class MemeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Meme
        fields = '__all__'


class ExtBaseSerializer(BaseSerializer):
    def serialize(self, queryset, **options):
        self.selected_props = options.pop('props')
        return super(ExtBaseSerializer, self).serialize(queryset, **options)

    def serialize_property(self, obj):
        model = type(obj)
        for field in self.selected_props:
            if hasattr(model, field) and type(getattr(model, field)) == property:
                self.handle_prop(obj, field)

    def handle_prop(self, obj, field):
        self._current[field] = getattr(obj, field)

    def end_object(self, obj):
        self.serialize_property(obj)

        super(ExtBaseSerializer, self).end_object(obj)


class ExtPythonSerializer(ExtBaseSerializer, PythonSerializer):
    pass


class ExtJsonSerializer(ExtPythonSerializer, JsonSerializer):
    pass
