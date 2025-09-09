from django.db import models
from django.contrib.auth.models import User
from reports.models import IssueReport

class RewardToken(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.IntegerField(default=0)
    earned_from_report = models.ForeignKey(IssueReport, on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
