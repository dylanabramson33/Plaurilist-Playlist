
from django.urls import path, include
from . import views
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    path('spotify-login/callback', views.spotify_login_callback),
    path('spotify-login/', views.spotify_login),
    path('partys/<int:pk>/', views.PartyDetail.as_view(),name="party-detail"),
    path('partys/create/', views.party_create,name="party-create"),
    path('songs/create/', views.song_create,name="song-create"),
    path('partys/name=<slug:party_name>/', views.PartyList.as_view()),

]
