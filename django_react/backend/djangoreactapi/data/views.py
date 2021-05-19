from django.http import HttpResponse
from django.shortcuts import render
from httplib2 import Response
from rest_framework import generics
from .serializers import DataSerializer
from .models import data
#import predict_by_url
from django.views.generic import View

class CommentView(generics.ListCreateAPIView):
    serializer_class = DataSerializer
    queryset = data.objects.all()
    def get(self, request):
        queryset=self.get_queryset()
        queryset=data.objects.filter(channel_id=request).values()
        return Response(queryset)

class DataView(generics.ListCreateAPIView):
    serializer_class = DataSerializer
    queryset = data.objects.all()

