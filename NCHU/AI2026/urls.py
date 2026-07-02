# pyrefly: ignore [missing-import]
from django.urls import path
from . import views

urlpatterns = [
    path('hello/',views.index,name='hello'),
]
