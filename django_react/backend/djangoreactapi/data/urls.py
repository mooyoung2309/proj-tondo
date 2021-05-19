from django.urls import path

from . import views

urlpatterns = [
    path('viewComment', views.CommentView.as_view()),
    path('', views.DataView.as_view()),
]