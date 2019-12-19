"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework import permissions
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from App import views

schema_view = get_schema_view(
   openapi.Info(
      title="69gag API",
      default_version='v1',
      description="funnier than 9gag (look at code)",
      terms_of_service="https://github.com/mchilicki/69gag.git",
      contact=openapi.Contact(email="contact@69gag.com"),
      license=openapi.License(name="MIT License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('meme/', views.MemeAddView.as_view(), name='addmeme'),
    path('allmeme/<int:id>', views.MemeGetAllView.as_view(), name='getmeme'),
    path('meme/<int:id>', views.MemeGetView.as_view(), name='getmeme'),
    path('like/<int:id>', views.LikeAddView.as_view(), name='addlike'),
    path('comment/<int:id>', views.CommentAddView.as_view(), name='addcomment'),
]
