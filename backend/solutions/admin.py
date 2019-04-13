from django.contrib import admin

# Register your models here.
from .models import solution # added

class solutionsAdmin(admin.ModelAdmin):  # added
    list_display = ('problem_id', 'solution_text') # add this

# Register your models here.
admin.site.register(solution, solutionsAdmin) # add this
