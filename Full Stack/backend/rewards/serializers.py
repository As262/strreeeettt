from rest_framework import serializers
from .models import IssueReport, IssueCategory

class IssueCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = IssueCategory
        fields = '__all__'

class IssueReportSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = IssueReport
        fields = '__all__'
