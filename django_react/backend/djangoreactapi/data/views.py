from django.http import HttpResponse, HttpRequest, JsonResponse
from django.shortcuts import render
from httplib2 import Response
from rest_framework import generics
from .serializers import DataSerializer
from .models import data
import sys

sys.path.append('/backend/djangoreactapi')
import predict_by_url
#import predict_by_url
from django.views.generic import View


class DataView(generics.ListCreateAPIView):

    serializer_class = DataSerializer
    queryset = data.objects.all()


class CreateDataView(generics.ListCreateAPIView):
    def get(self, request: HttpRequest, url: str):
        queryset = data.objects.filter(channel_id=url)
        if not queryset:
            predict_by_url.get_predict(url)
            queryset=data.objects.filter(channel_id=url)
        serializer_class = DataSerializer(queryset,many=True)
        return JsonResponse(serializer_class.data, safe=False)
    serializer_class = DataSerializer
    queryset = data.objects.all()
