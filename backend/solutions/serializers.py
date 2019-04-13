from rest_framework import serializers
from .models import solution

class solutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = solution
        fields = ('problem_id','solution_text')