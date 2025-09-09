from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Sum
from .models import IssueReport, IssueCategory
from rewards.models import RewardToken
from .serializers import IssueReportSerializer, IssueCategorySerializer

class IssueReportListCreateView(generics.ListCreateAPIView):
    queryset = IssueReport.objects.all()
    serializer_class = IssueReportSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class IssueReportDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = IssueReport.objects.all()
    serializer_class = IssueReportSerializer

class IssueCategoryListView(generics.ListAPIView):
    queryset = IssueCategory.objects.all()
    serializer_class = IssueCategorySerializer

@api_view(['GET'])
def dashboard_stats(request):
    if not request.user.is_authenticated:
        return Response({'error': 'Authentication required'}, status=401)

    user_reports = IssueReport.objects.filter(user=request.user)
    total_reports = user_reports.count()
    resolved_reports = user_reports.filter(status='resolved').count()
    pending_reports = user_reports.filter(status='pending').count()
    tokens_earned = RewardToken.objects.filter(user=request.user).aggregate(total=Sum('amount'))['total'] or 0

    data = {
        'total_reports': total_reports,
        'resolved_reports': resolved_reports,
        'pending_reports': pending_reports,
        'tokens_earned': tokens_earned,
    }
    return Response(data)
