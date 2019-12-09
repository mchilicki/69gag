from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
import json
from django.http import HttpResponse

from .serializers import ExtJsonSerializer
from .models import Meme, Like, Comment


# Create your views here.

class MemeAddView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, *args, **kwargs):
        json_data = json.loads(self.request.body)
        user = self.request.user
        title = json_data['title']
        img_url = json_data['img_url']
        meme = Meme(user=user, title=title, img_url=img_url)
        meme.save()
        return Response(status=200)


class MemeGetAllView(APIView):
    permission_classes = [AllowAny]

    def get(self, *args, **kwargs):
        json_data = json.loads(self.request.body)
        read_id = json_data['read_id']
        querysetMemes = list(Meme.objects.filter(pk__range=(read_id + 1, read_id + 11)))
        output = ExtJsonSerializer().serialize(querysetMemes, fields=['title', 'img_url', 'date'], props=['userName', 'NumLikes', 'NumComments'])
        return HttpResponse(output, content_type="application/json")


class MemeGetView(APIView):
    permission_classes = [AllowAny]

    def get(self, *args, **kwargs):
        json_data = json.loads(self.request.body)
        meme_id = json_data['meme_id']
        querysetMemes = Meme.objects.filter(pk=meme_id)
        output = ExtJsonSerializer().serialize(querysetMemes, fields=['title', 'img_url', 'date'], props=['userName', 'NumLikes', 'NumComments', 'Comments'])
        return HttpResponse(output, content_type="application/json")


class LikeAddView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, *args, **kwargs):
        json_data = json.loads(self.request.body)
        user = self.request.user
        meme_id = json_data['meme_id']
        meme = Meme.objects.get(pk=meme_id)
        # actLike = Like.objects.filter(meme__pk=meme_id, user__pk=user.pk)
        like = Like(user=user, meme=meme)
        like.save()
        return Response(status=200)


class CommentAddView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, *args, **kwargs):
        json_data = json.loads(self.request.body)
        user = self.request.user
        meme_id = json_data['meme_id']
        meme = Meme.objects.get(pk=meme_id)
        content = json_data['content']
        comment = Comment(user=user, meme=meme, content=content)
        comment.save()
        return Response(status=200)
