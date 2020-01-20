from .models import Party, Song
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_jwt.settings import api_settings




class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)

class SongDetailSerializer(serializers.ModelSerializer):
    num_favorites = serializers.SerializerMethodField()
    favorites = UserSerializer(read_only=True, many=True)


    def get_num_favorites(self, obj):
        return obj.favorites.all().count()

    class Meta:
        model = Song
        fields = ('name','id','artist','num_favorites','favorites')

class PartySerializer(serializers.ModelSerializer):
    songs = SongDetailSerializer(
        many=True,
        read_only=True,

    )

    class Meta:
        model = Party
        fields = ('party_name','songs', )

class PartyCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Party
        fields = ('party_name','public','password' )

    def create(self, validated_data):
        return Party.objects.create(**validated_data)

class PartyListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Party
        fields = ('id','party_name', 'public')
