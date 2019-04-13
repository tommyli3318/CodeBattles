from django.db import models

class CodeProblem(models.Model):
    prompt = models.TextField()
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def _str_(self):
        return (self.prompt,self.description)