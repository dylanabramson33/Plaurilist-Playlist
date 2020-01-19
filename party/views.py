import requests
from base64 import b64encode
from urllib.parse import quote
from django.conf import settings
from django.shortcuts import render
from django.shortcuts import redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from rest_framework import mixins, generics, viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from rest_framework_jwt.settings import api_settings
from rest_framework import permissions
from .models import Party, Song
from .serializers import *




def spotify_login(request):
    uri = 'https://accounts.spotify.com/authorize'
    scope = "streaming playlist-modify-public playlist-read-private user-read-private"
    client_id = settings.SPOTIFY_CLIENT_ID
    redirect_uri = 'http://127.0.0.1:8000/spotify-login/callback'
    query_parameters = {
        'response_type' : 'code',
        'redirect_uri' : redirect_uri,
        'client_id' : client_id,
        'scope' : scope
    }

    response = requests.get(uri,params=query_parameters)

    return redirect(response.url)

def spotify_login_callback(request):
    code = request.GET.get('code')
    uri = 'https://accounts.spotify.com/api/token'
    redirect_uri = 'http://127.0.0.1:8000/spotify-login/callback'
    body_params = {
        'code' : code,
        'grant_type' : 'authorization_code',
        'redirect_uri' : redirect_uri
    }
    client_id = settings.SPOTIFY_CLIENT_ID
    client_secret = settings.SPOTIFY_SECRET_KEY
    spotify_response = requests.post(uri,data=body_params,auth=(client_id,client_secret))
    redirect_uri = 'http://localhost:3000/login'

    api_token =  spotify_response.json()["access_token"]
    refresh_token =  spotify_response.json()["access_token"]
    uri_with_params = (redirect_uri + "?api_token=" + api_token)

    return redirect(uri_with_params)


class PartyList(generics.ListAPIView):
    serializer_class = PartyListSerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        party_name = self.kwargs['party_name']
        return Party.objects.filter(party_name__contains=party_name)


class PartyDetail(mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    generics.GenericAPIView):
    queryset = Party.objects.all()
    serializer_class = PartySerializer
    permission_classes = (permissions.AllowAny,)

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

class PartyCreate(mixins.CreateModelMixin):
    serializer_class = PartySerializer
