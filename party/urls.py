
from django.urls import path, include
from . import views
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    path('token-auth/', obtain_jwt_token),
    path('users/', views.UserList.as_view()),
    path('partys/<int:pk>/', views.PartyDetail.as_view(),name="party-detail"),
    path('partys/name=<slug:party_name>/', views.PartyList.as_view()),

]
