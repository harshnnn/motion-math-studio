import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { LoadingSpinner } from '@/components/LoadingSpinner';

interface RecentActivityItem {
  id: string;
  title: string;
  created_at: string;
  status: string | null;
  source: 'project' | 'estimate';
}

interface DashboardStats {
  totalRequests: number;
  pendingRequests: number;
  completedProjects: number;
  totalRevenue: number;
  activeClients: number;
  recentActivity: RecentActivityItem[];
}

const AdminDashboard = () => {
  const { isAuthenticated } = useAdminAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) fetchDashboardData();
  }, [isAuthenticated]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.rpc('admin_get_dashboard', {});
      if (error) throw error;
      if (data) {
        setStats(data as DashboardStats);
      } else {
        setStats(null);
      }
    } catch (err) {
      console.error('Dashboard load error:', err);
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
      .format((amount || 0) / 100);

  const getStatusColor = (status: string | null) => {
    if (!status) return 'bg-gray-100 text-gray-700';
    const map: Record<string, string> = {
      under_review: 'bg-yellow-100 text-yellow-800',
      payment_pending: 'bg-orange-100 text-orange-800',
      in_progress: 'bg-blue-100 text-blue-800',
      assigned_to_animator: 'bg-purple-100 text-purple-800',
      in_revision: 'bg-indigo-100 text-indigo-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return map[status] || 'bg-gray-100 text-gray-700';
  };

  if (!isAuthenticated)
    return <div className="p-6 text-sm">Unauthorized</div>;

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );

  if (!stats)
    return (
      <div className="p-6 text-sm">
        No dashboard data. <button onClick={fetchDashboardData} className="underline">Retry</button>
      </div>
    );

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
          </CardHeader>
            <CardContent className="text-2xl font-bold">{stats.totalRequests}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
            <CardContent className="text-2xl font-bold">{stats.pendingRequests}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
            <CardContent className="text-2xl font-bold">{stats.completedProjects}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
          </CardHeader>
            <CardContent className="text-2xl font-bold">{stats.activeClients}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
            <CardContent className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest projects and estimates</CardDescription>
        </CardHeader>
        <CardContent>
          {stats.recentActivity.length === 0 && (
            <div className="text-sm text-muted-foreground">No recent activity.</div>
          )}
          <ul className="space-y-3">
            {stats.recentActivity.map(item => (
              <li key={`${item.source}-${item.id}`} className="flex items-center justify-between border rounded p-3">
                <div className="space-y-1">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(item.created_at).toLocaleString()} • {item.source}
                  </p>
                </div>
                {item.source === 'project' && (
                  <Badge className={getStatusColor(item.status)}>{item.status || 'n/a'}</Badge>
                )}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
