from django.db import models
from django.contrib.auth.models import User


class Party(models.Model):
    party_name = models.CharField(max_length=255)

    def __str__(self):
        return self.party_name


class Song(models.Model):
    party = models.ForeignKey(Party, on_delete=models.CASCADE, related_name = 'songs')
    name = models.CharField(max_length=255)
    artist = models.CharField(max_length=255)
    favorites = models.ManyToManyField(User, blank=True)

    def __str__(self):
        return self.name

def get_username(self):
    return self.username

User.add_to_class("__str__", get_username)
