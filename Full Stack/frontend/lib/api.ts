// frontend/lib/api.ts

export interface DashboardStats {
  total_reports: number;
  resolved_reports: number;
  pending_reports: number;
  tokens_earned: number;
}

/**
 * Fetch dashboard stats from the Django backend API
 */
export async function getDashboardStats(): Promise<{ data: DashboardStats | null; error?: any }> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/stats/`, {
      credentials: 'include', // send cookies if using session auth
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: DashboardStats = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}
// lib/api.ts

export interface IssueCategory {
  id: number;
  name: string;
  slug: string;
  // add other fields if needed
}

export const apiClient = {
  async getCategories(): Promise<{ data: IssueCategory[] | null; error?: any }> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/`, {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: IssueCategory[] = await response.json();
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  async createReport(formData: FormData): Promise<{ data: any | null; error?: any }> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reports/`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },
};
