import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { Eye, Edit, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useToast } from '@/hooks/use-toast';
import { useAdminAuth } from '@/hooks/useAdminAuth';

interface RequestRow {
  id: string;
  title: string;
  description: string;
  animation_type: string;
  status: string;
  created_at: string;
  user_id: string;
  estimated_price?: number;
  final_price?: number;
  profile_full_name?: string;
  profile_email?: string;
}

const AdminRequests = () => {
  const [requests, setRequests] = useState<RequestRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const { toast } = useToast();
  const { isAuthenticated } = useAdminAuth();

  useEffect(() => {
    if (isAuthenticated) fetchData();
  }, [isAuthenticated]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.rpc('admin_get_requests', {});
      if (error) throw error;
      setRequests(data || []);
    } catch (error: any) {
      console.error('Error fetching requests:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to fetch requests",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProjectStatus = async (projectId: string, newStatus: string) => {
    // Optimistic snapshot
    setRequests(prev =>
      prev.map(r => (r.id === projectId ? { ...r, status: newStatus } : r))
    );

    try {
      const { data, error } = await supabase.rpc('admin_update_project_status', {
        p_id: projectId,
        p_status: newStatus
      });

      if (error) throw error;
      if (!data || data.length === 0) {
        throw new Error('Update returned no row');
      }

      // Optionally ensure exact status from DB (already optimistic)
      const returned = data[0];
      setRequests(prev =>
        prev.map(r => (r.id === returned.id ? { ...r, status: returned.status } : r))
      );

      // Re-fetch to stay in sync (especially if other fields may change later)
      fetchData();

      toast({ title: "Updated", description: "Status changed successfully" });
    } catch (err: any) {
      console.error('Status update error:', err);

      // Revert optimistic change
      await fetchData();

      toast({
        title: "Error",
        description: err.message || "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const getClientName = (row: RequestRow) =>
    row.profile_full_name || row.profile_email || 'Unknown Client';

  const getStatusColor = (status: string) => {
    const colors: Record<string,string> = {
      draft: 'bg-gray-100 text-gray-800',
      under_review: 'bg-yellow-100 text-yellow-800',
      payment_pending: 'bg-orange-100 text-orange-800',
      in_progress: 'bg-blue-100 text-blue-800',
      assigned_to_animator: 'bg-purple-100 text-purple-800',
      in_revision: 'bg-indigo-100 text-indigo-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'under_review':
      case 'payment_pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'in_progress':
      case 'assigned_to_animator':
      case 'in_revision':
        return <AlertCircle className="h-4 w-4 text-blue-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const filtered = requests.filter(r => {
    const matchesFilter = filter === 'all' || r.status === filter;
    const term = search.toLowerCase();
    const matchesSearch =
      r.title.toLowerCase().includes(term) ||
      r.description.toLowerCase().includes(term) ||
      getClientName(r).toLowerCase().includes(term);
    return matchesFilter && matchesSearch;
  });

  const formatPrice = (price?: number) =>
    price
      ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
          .format(price / 100)
      : '-';

  if (!isAuthenticated) {
    return <div className="p-6 text-sm">Unauthorized</div>;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Client Requests</CardTitle>
          <CardDescription>Manage and track all client project requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              placeholder="Search by project, client, or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1"
            />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Requests</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="payment_pending">Payment Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="assigned_to_animator">Assigned</SelectItem>
                <SelectItem value="in_revision">In Revision</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(r => (
                  <TableRow key={r.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{r.title}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {r.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{getClientName(r)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {r.animation_type.replace('_',' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(r.status)}
                        <Badge className={getStatusColor(r.status)}>
                          {r.status.replace('_',' ')}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        {r.final_price
                          ? <span className="font-medium text-green-600">{formatPrice(r.final_price)}</span>
                          : r.estimated_price
                            ? <span className="text-muted-foreground">~{formatPrice(r.estimated_price)}</span>
                            : <span className="text-muted-foreground">-</span>}
                      </div>
                    </TableCell>
                    <TableCell>{new Date(r.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Select
                          value={r.status}
                          onValueChange={(value) => updateProjectStatus(r.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <Edit className="h-4 w-4" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under_review">Under Review</SelectItem>
                            <SelectItem value="payment_pending">Payment Pending</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="assigned_to_animator">Assigned</SelectItem>
                            <SelectItem value="in_revision">In Revision</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filtered.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No requests found matching your criteria.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminRequests;
