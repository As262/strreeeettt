from django.urls import path
from . import views

urlpatterns = [
    path('reports/', views.IssueReportListCreateView.as_view(), name='report-list'),
    path('reports/<int:pk>/', views.IssueReportDetailView.as_view(), name='report-detail'),
    path('categories/', views.IssueCategoryListView.as_view(), name='category-list'),
    path('dashboard/stats/', views.dashboard_stats, name='dashboard-stats'),
]
