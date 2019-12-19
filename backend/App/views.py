from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
import json
from django.http import HttpResponse

from .serializers import ExtJsonSerializer
from .models import Meme, Like, Comment


# Create your views here.

class MemeGetAllView(APIView):
    permission_classes = [AllowAny]

    def get(self, *args, **kwargs):
        read_id = kwargs['id']
        queryset_memes = list(Meme.objects.filter(pk__range=(read_id + 1, read_id + 11)))
        if not queryset_memes:
            return HttpResponse(status=404, content_type="application/json")

        output = ExtJsonSerializer().serialize(queryset_memes, fields=['title', 'img_url', 'date'],
                                               props=['userName', 'NumLikes', 'NumComments'])

        return HttpResponse(output, content_type="application/json")


class MemeAddView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, *args, **kwargs):
        try:
            json_data = json.loads(json.dumps(self.request.data))
        except ValueError:
            return HttpResponse(status=400)

        user = self.request.user
        title = json_data['title']
        img_url = json_data['img_url']
        meme = Meme(user=user, title=title, img_url=img_url)
        meme.save()
        return Response(status=201)


class MemeGetView(APIView):
    permission_classes = [AllowAny]

    def get(self, *args, **kwargs):
        meme_id = kwargs['id']
        queryset_memes = Meme.objects.filter(pk=meme_id)
        if not queryset_memes:
            return HttpResponse(status=404, content_type="application/json")

        output = ExtJsonSerializer().serialize(queryset_memes, fields=['title', 'img_url', 'date'],
                                               props=['userName', 'NumLikes', 'NumComments', 'Comments'])
        return HttpResponse(output, status=200,  content_type="application/json")


class LikeAddView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, *args, **kwargs):
        meme_id = kwargs['id']
        user = self.request.user
        if not Meme.objects.filter(pk=meme_id).exists():
            return HttpResponse(status=404, content_type="application/json")

        meme = Meme.objects.get(pk=meme_id)
        if Like.objects.filter(user=user, meme=meme).exists():
            return HttpResponse(status=409, content_type="application/json")

        like = Like(user=user, meme=meme)
        like.save()
        return Response(status=201)


class CommentAddView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, *args, **kwargs):
        try:
            json_data = json.loads(json.dumps(self.request.data))
        except ValueError:
            return HttpResponse(status=400)

        user = self.request.user
        meme_id = kwargs['id']
        meme = Meme.objects.get(pk=meme_id)
        content = json_data['content']
        comment = Comment(user=user, meme=meme, content=content)
        comment.save()
        return Response(status=201)
