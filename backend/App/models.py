from django.db import models
from django.utils import timezone


class Meme(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    title = models.CharField(max_length=200, null=False)
    img_url = models.CharField(max_length=400, null=False)
    date = models.DateTimeField(default=timezone.now)

    @property
    def userName(self):
        return self.user.username

    @property
    def NumLikes(self):
        return Like.objects.filter(meme__pk=self.pk).count()

    @property
    def NumComments(self):
        return Comment.objects.filter(meme__pk=self.pk).count()

    @property
    def Comments(self):
        queryset = list(self.comments.values('pk', 'user__username', 'content', 'date'))
        return queryset


class Like(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    meme = models.ForeignKey(Meme, related_name='likes', on_delete=models.CASCADE)
    date = models.DateTimeField(default=timezone.now)


class Comment(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    meme = models.ForeignKey(Meme, related_name='comments', on_delete=models.CASCADE)
    content = models.CharField(max_length=2048, null=False)
    date = models.DateTimeField(default=timezone.now)
