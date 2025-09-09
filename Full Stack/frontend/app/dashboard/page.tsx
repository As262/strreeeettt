'use client';

import React, { useEffect, useState } from 'react';
import { getDashboardStats, DashboardStats } from '../../lib/api';

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      const { data, error } = await getDashboardStats();
      if (data) {
        setStats(data);
        setError(null);
      } else {
        setError(error?.message || 'Failed to fetch stats');
      }
      setLoading(false);
    }

    fetchStats();
  }, []);

  if (loading) {
    return <div>Loading dashboard statistics...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!stats) {
    return <div>No stats available.</div>;
  }

  return (
    <div>
      <h1>Dashboard Statistics</h1>
      <ul>
        <li>Total Reports: {stats.total_reports}</li>
        <li>Resolved Reports: {stats.resolved_reports}</li>
        <li>Pending Reports: {stats.pending_reports}</li>
        <li>Tokens Earned: {stats.tokens_earned}</li>
      </ul>
    </div>
  );
}
