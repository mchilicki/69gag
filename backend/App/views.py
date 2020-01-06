from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
import json
from django.http import HttpResponse, JsonResponse

from .serializers import ExtJsonSerializer, MemeSerializer
from .models import Meme, Like, Comment
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage


# Create your views here.

class MemeGetAllView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter('page_id', in_=openapi.IN_PATH, type=openapi.TYPE_INTEGER,
                              description='page number', required=True)
        ],
        responses={
            '200': 'Returned 10 memes from page id',
            '401': 'Unauthorized',
            '404': 'Memes not found'
        },
        security=(AllowAny,),
        operation_id='Get list of 10 memes',
        operation_description='List of 10 memes, total pages indicator and current page id, page_id is requested page',
    )
    def get(self, *args, **kwargs):
        page_id = kwargs['page_id']
        queryset_memes = list(Meme.objects.all())
        paginator = Paginator(queryset_memes, 2)
        try:
            queryset_memes = paginator.page(page_id)
        except PageNotAnInteger:
            page_id = 1
            queryset_memes = paginator.page(page_id)
        except EmptyPage:
            page_id = paginator.num_pages
            queryset_memes = paginator.page(page_id)

        output = ExtJsonSerializer().serialize(queryset_memes, fields=['title', 'img_url', 'date'],
                                               props=['userName', 'NumLikes', 'NumComments'])
        data = {'results': json.loads(output), 'totalPages': paginator.num_pages, 'currentPage': page_id}
        return JsonResponse(data, safe=False)


class MemeAddView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        request_body=openapi.Schema(type=openapi.TYPE_OBJECT,
                                    properties={
                                        'title': openapi.Schema(type=openapi.TYPE_STRING, description='Title of meme'),
                                        'img_url': openapi.Schema(type=openapi.TYPE_STRING, description='URL of meme image'),
                                    }),
        responses={
            '201': 'Meme added successfully',
            '400': 'Cannot parse request body',
            '401': 'Unauthorized'
        },
        operation_id='Add meme',
        operation_description='Add new meme with title and URL to image',
    )
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

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter('meme_id', in_=openapi.IN_PATH, type=openapi.TYPE_INTEGER,
                              description='ID of meme', required=True)
        ],
        responses={
            '200': 'Returned selected meme',
            '401': 'Unauthorized',
            '404': 'Meme not found'
        },
        operation_id='Get meme',
        operation_description='Returns meme specified by meme_id',
    )
    def get(self, *args, **kwargs):
        meme_id = kwargs['meme_id']
        queryset_memes = Meme.objects.filter(pk=meme_id)
        if not queryset_memes:
            return HttpResponse(status=404, content_type="application/json")

        output = ExtJsonSerializer().serialize(queryset_memes, fields=['title', 'img_url', 'date'],
                                               props=['userName', 'NumLikes', 'NumComments', 'Comments'])
        return HttpResponse(output, status=200, content_type="application/json")


class LikeView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter('meme_id', in_=openapi.IN_PATH, type=openapi.TYPE_INTEGER,
                              description='ID of meme', required=True)
        ],
        responses={
            '201': 'Like has been added',
            '401': 'Unauthorized',
            '404': 'Meme for like does not exist'
        },
        operation_id='Add like',
        operation_description='Like meme by authorized user. Meme specified by meme_id',
    )
    def post(self, *args, **kwargs):
        meme_id = kwargs['meme_id']
        user = self.request.user
        if not Meme.objects.filter(pk=meme_id).exists():
            return HttpResponse(status=404, content_type="application/json")

        meme = Meme.objects.get(pk=meme_id)
        if Like.objects.filter(user=user, meme=meme).exists():
            return HttpResponse(status=409, content_type="application/json")

        like = Like(user=user, meme=meme)
        like.save()
        return Response(status=201)

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter('meme_id', in_=openapi.IN_PATH, type=openapi.TYPE_INTEGER,
                              description='ID of meme', required=True)
        ],
        responses={
            '204': 'Like has been deleted',
            '401': 'Unauthorized',
            '404': 'Meme is not exist or was not like by authorized user'
        },
        operation_id='Delete like',
        operation_description='Delete like for liked meme by authorized user. Meme specified by meme_id',
    )
    def delete(self, *args, **kwargs):
        meme_id = kwargs['meme_id']
        user = self.request.user
        if not Meme.objects.filter(pk=meme_id).exists():
            return HttpResponse(status=404, content_type="application/json")

        meme = Meme.objects.get(pk=meme_id)
        if not Like.objects.filter(user=user, meme=meme).exists():
            return HttpResponse(status=404, content_type="application/json")

        Like.objects.filter(user=user, meme=meme).delete()
        return HttpResponse(status=204)


class CommentAddView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter('meme_id', in_=openapi.IN_PATH, type=openapi.TYPE_INTEGER,
                              description='ID of meme', required=True)
        ],
        request_body=openapi.Schema(type=openapi.TYPE_OBJECT,
                                    properties={
                                        'content': openapi.Schema(type=openapi.TYPE_STRING, description='Content of the comment'),
                                    }),
        responses={
            '201': 'Comment added successfully',
            '400': 'Cannot parse request body',
            '401': 'Unauthorized'
        },
        operation_id='Add comment',
        operation_description='Add comment to meme specified by meme_id',
    )
    def post(self, *args, **kwargs):
        try:
            json_data = json.loads(json.dumps(self.request.data))
        except ValueError:
            return HttpResponse(status=400)

        user = self.request.user
        meme_id = kwargs['meme_id']
        meme = Meme.objects.get(pk=meme_id)
        content = json_data['content']
        comment = Comment(user=user, meme=meme, content=content)
        comment.save()
        return Response(status=201)
