from django.http import HttpResponse, HttpRequest, JsonResponse
from django.shortcuts import render
from httplib2 import Response
from rest_framework import generics
from .serializers import DataSerializer
from .models import data
import sys
import json
import datetime
import time

sys.path.append('/backend/djangoreactapi')
import predict_by_url
#import predict_by_url
from django.views.generic import View


class CreateDataView(generics.ListCreateAPIView):
    def get(self, request: HttpRequest, url: str):
        queryset = data.objects.filter(channel_id=url)

        if not queryset:
            predict_by_url.get_predict(url)
            queryset=data.objects.filter(channel_id=url)
        else:
            info = json.loads(queryset.values()[0]['info'])
            date_time_obj = datetime.datetime.strptime(info['updated_time'], '%y/%m/%d-%H:%M:%S')
            now = datetime.datetime.now()
            time_diff = now - date_time_obj
            print(time_diff.days)
            if time_diff.days >= 1:
                data.objects.filter(channel_id=url).delete()
                predict_by_url.get_predict(url)
                queryset = data.objects.filter(channel_id=url)

        serializer_class = DataSerializer(queryset,many=True)
        return JsonResponse(serializer_class.data, safe=False)
    serializer_class = DataSerializer
    queryset = data.objects.all()
