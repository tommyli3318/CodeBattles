from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets          # added
from .serializers import cbServerSerializer  # added
from .models import CodeProblem              # added

class cbServerView(viewsets.ModelViewSet):       # added
    serializer_class = cbServerSerializer    # added
    queryset = CodeProblem.objects.all()            # added