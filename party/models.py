from django.db import models


class CustomUser(models.Model):
    user_email = models.EmailField()


class Party(models.Model):
    party_name = models.CharField(max_length=255)
    public = models.BooleanField(default=True)
    password = models.CharField(max_length=255,default='', blank=True)
    def __str__(self):
        return self.party_name


class Song(models.Model):
    party = models.ForeignKey(Party, on_delete=models.CASCADE, related_name = 'songs')
    name = models.CharField(max_length=255)
    artist = models.CharField(max_length=255)
    favorites = models.ManyToManyField(CustomUser, blank=True)

    def __str__(self):
        return self.name
