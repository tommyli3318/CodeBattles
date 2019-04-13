from django.shortcuts import render

# Create your views here.

from django.shortcuts import render
from rest_framework import viewsets          # added
from .serializers import solutionSerializer      # added
from .models import solution                     # added

class TodoView(viewsets.ModelViewSet):       # added
    serializer_class = solutionSerializer          # added
    queryset = solution.objects.all()              # added