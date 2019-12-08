from django.db import models
from django.utils import timezone
from django.core import serializers


class Meme(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    title = models.CharField(max_length=200, null=False)
    img_url = models.CharField(max_length=400, null=False)
    date = models.DateTimeField(default=timezone.now)

    @property
    def NumLikes(self):
        return self.likes.count()

    @property
    def NumComments(self):
        return self.comments.count()

    @property
    def Comments(self):
        comments = self.comments.all()
        data = serializers.serialize('json', comments)
        return data


class Like(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    meme = models.ForeignKey(Meme, related_name='likes', on_delete=models.CASCADE)
    date = models.DateTimeField(default=timezone.now)


class Comment(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    meme = models.ForeignKey(Meme, related_name='comments', on_delete=models.CASCADE)
    content = models.CharField(max_length=2048, null=False)
    date = models.DateTimeField(default=timezone.now)
