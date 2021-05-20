from django.urls import path

from . import views

urlpatterns = [
    path('createComment/<str:url>', views.CreateDataView.as_view()),
    path('', views.DataView.as_view()),
]