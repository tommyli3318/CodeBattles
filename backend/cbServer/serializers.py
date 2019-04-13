from rest_framework import serializers
from .models import CodeProblem

class cbServerSerializer(serializers.ModelSerializer):
    class Meta:
        model = CodeProblem
        fields = ('id', 'prompt', 'description', 'completed')