from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import generics
from .serializers import DataSerializer
from .models import data
from django.views.generic import View

class DataView(generics.ListCreateAPIView):
    serializer_class = DataSerializer
    queryset = data.objects.all()
class CommentView(generics.ListCreateAPIView):
    serializer_class = DataSerializer
    def get(self, request, video_id):
        self.queryset = data.objects.filter(channel_id=video_id).values()


