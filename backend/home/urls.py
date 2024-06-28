from django.conf import settings
from django.contrib import admin
from django.urls import include, path
from django.conf.urls.static import static

from rest_framework import routers

from home.views import FeedbackViewSet, dashboard, get_order

router = routers.DefaultRouter()

router.register(r"feedback", FeedbackViewSet, basename="feedback")

urlpatterns = [
    path("dashboard/", dashboard, name="dashboard"),
    path("get-order/<int:pk>/", get_order, name="get-order")
]

urlpatterns += router.urls