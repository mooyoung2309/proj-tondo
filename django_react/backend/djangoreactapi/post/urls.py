from django.urls import path

from . import views

urlpatterns = [
    path('', views.ListPost.as_view()),
    path('<int:pk>/', views.DetailPost.as_view()),
    path('/analyzeComment', views.ListPost.as_view()),
    path('/createComment', views.ListPost.as_view()),
]