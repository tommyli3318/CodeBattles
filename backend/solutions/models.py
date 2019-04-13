from django.db import models

# Create your models here.

class solution(models.Model):
    problem_id = models.CharField(max_length = 100)
    solution_text = models.TextField()

    def _str_(self):
        return (self.problem_id,self.solution_text)