from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import CodeProblem # added

class CodeProblemsAdmin(admin.ModelAdmin):  # added
    list_display = ('prompt', 'description', 'completed') # added

# Register your models here.
admin.site.register(CodeProblem, CodeProblemsAdmin) # added