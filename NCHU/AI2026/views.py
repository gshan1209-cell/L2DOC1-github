from django.http import HttpRequest, HttpResponse
from django.shortcuts import render

# Create your views here.

def index(req: HttpRequest):
    return render(req,'hello.html', {"name": "Sean 帥帥derLin"})
