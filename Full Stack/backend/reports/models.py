from django.db import models
from django.contrib.auth.models import User

class IssueCategory(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    color = models.CharField(max_length=7, default='#000000')  # Hex color
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class IssueReport(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('verified', 'Verified'),
        ('in_progress', 'In Progress'),
        ('resolved', 'Resolved'),
        ('rejected', 'Rejected'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.ForeignKey(IssueCategory, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='issue_images/')
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    address = models.CharField(max_length=500)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    ai_analysis = models.JSONField(null=True, blank=True)
    verification_score = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} - {self.user.username}"
