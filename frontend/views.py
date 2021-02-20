from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User
# Create your views here.


def index(request):
    return render(request, "frontend/index.html")
