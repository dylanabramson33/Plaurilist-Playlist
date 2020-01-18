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
    scopes = "user-read-private"
    client_id = settings.SPOTIFY_CLIENT_ID
    response = redirect('https://accounts.spotify.com/authorize' +
        '?response_type=code' + '&client_id=' + client_id +
        '&scope=' + quote(scopes) + '&redirect_uri=' +
        quote('http://http://127.0.0.1:8000/spotify-login/callback'))

    return response

def spotify_login_callback(request, code):
    response = redirect('https://accounts.spotify.com/authorize' +
        '?response_type=code' + '&client_id=' + client_id +
        '&scope=' + quote(scopes) + '&redirect_uri=' +
        quote('http://http://127.0.0.1:8000/spotify-login/callback'))

    return response


@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """

    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PartyList(generics.ListAPIView):
    serializer_class = PartyListSerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        party_name = self.kwargs['party_name']
        return Party.objects.filter(party_name__contains=party_name)


"""
    For viewing individual party
"""
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
