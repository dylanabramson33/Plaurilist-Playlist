from .models import Party, Song, CustomUser
from rest_framework import serializers
from rest_framework_jwt.settings import api_settings




class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('user_email',)

class SongDetailSerializer(serializers.ModelSerializer):
    num_favorites = serializers.SerializerMethodField()
    favorites = CustomUserSerializer(read_only=True, many=True)


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



class SongCreationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ('name','artist','party')

    def create(self, validated_data):
        party = validated_data.pop('party')
        article = Song.objects.create(party=party, **validated_data)
        return article
