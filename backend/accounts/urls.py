from django.urls import path
from rest_framework import routers

from . import views

urlpatterns = [
    path("login/", views.CustomAuthToken.as_view(), name="login"),
    path("logout/", views.LogoutView.as_view(), name="logout"),
    path("user_role/", views.getUserRole, name="user_role"),
    path("user_details/", views.getUserDetail, name="user_details"),
]

router = routers.DefaultRouter()

router.register(r'users', views.UserViewSet)
urlpatterns += router.urls