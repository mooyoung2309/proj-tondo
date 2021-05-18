from django.urls import path

from . import views

urlpatterns = [
    path('', views.DataView.as_view()),
    path('analyzeComment/<str:video_id>', views.CommentView.as_view()),
]