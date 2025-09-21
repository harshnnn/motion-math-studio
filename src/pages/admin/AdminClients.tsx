import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { Eye, Mail, Phone, Building } from 'lucide-react';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useToast } from '@/hooks/use-toast';
import { useAdminAuth } from '@/hooks/useAdminAuth';

interface Client {
  user_id: string;
  email: string;
  full_name: string;
  phone?: string;
  company?: string;
  created_at: string;
  project_count: number;
  total_spent: number;     // stored in smallest unit (matches DB final_price)
  last_project?: string;
}

const AdminClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { toast } = useToast();
  const { isAuthenticated } = useAdminAuth();

  useEffect(() => {
    if (isAuthenticated) fetchClients();
  }, [isAuthenticated]);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.rpc('admin_get_clients', {});
      if (error) throw error;
      setClients(data || []);
    } catch (error: any) {
      console.error('Error fetching clients:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to fetch clients data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filtered = clients.filter(c => {
    const q = search.toLowerCase();
    return (
      c.full_name?.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.company?.toLowerCase().includes(q)
    );
  });

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
      .format(amount / 100); // adjust if your amounts are already dollars

  const getClientStatus = (c: Client) => {
    if (c.project_count === 0) return { label: 'New', color: 'bg-blue-100 text-blue-800' };
    if (c.project_count >= 5) return { label: 'VIP', color: 'bg-purple-100 text-purple-800' };
    if (c.total_spent > 100000) return { label: 'Premium', color: 'bg-yellow-100 text-yellow-800' };
    return { label: 'Active', color: 'bg-green-100 text-green-800' };
  };

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
          <CardTitle>Client Management</CardTitle>
          <CardDescription>Manage your client base and track their project history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Input
              placeholder="Search clients by name, email, or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-md"
            />
          </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card><CardContent className="pt-6">
                <div className="text-2xl font-bold">{clients.length}</div>
                <p className="text-xs text-muted-foreground">Total Clients</p>
              </CardContent></Card>
              <Card><CardContent className="pt-6">
                <div className="text-2xl font-bold">
                  {clients.filter(c => c.project_count > 0).length}
                </div>
                <p className="text-xs text-muted-foreground">Active Clients</p>
              </CardContent></Card>
              <Card><CardContent className="pt-6">
                <div className="text-2xl font-bold">
                  {clients.filter(c => c.project_count >= 5).length}
                </div>
                <p className="text-xs text-muted-foreground">VIP Clients</p>
              </CardContent></Card>
              <Card><CardContent className="pt-6">
                <div className="text-2xl font-bold">
                  {formatCurrency(clients.reduce((s, c) => s + c.total_spent, 0))}
                </div>
                <p className="text-xs text-muted-foreground">Total Revenue</p>
              </CardContent></Card>
            </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Projects</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(c => {
                  const status = getClientStatus(c);
                  return (
                    <TableRow key={c.user_id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{c.full_name || 'Unknown'}</p>
                          {c.company && (
                            <p className="text-sm text-muted-foreground flex items-center">
                              <Building className="h-3 w-3 mr-1" />
                              {c.company}
                            </p>
                          )}
                          {c.last_project && (
                            <p className="text-xs text-muted-foreground">Last: {c.last_project}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="h-3 w-3 mr-1" />
                            {c.email}
                          </div>
                          {c.phone && (
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Phone className="h-3 w-3 mr-1" />
                              {c.phone}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center">
                          <div className="font-medium">{c.project_count}</div>
                          <div className="text-xs text-muted-foreground">projects</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-green-600">
                          {formatCurrency(c.total_spent)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={status.color}>{status.label}</Badge>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Client Details</DialogTitle>
                              <DialogDescription>
                                Complete information for {c.full_name || c.email}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <h4 className="font-medium mb-1">Full Name</h4>
                                <p className="text-muted-foreground">{c.full_name || 'Not provided'}</p>
                              </div>
                              <div>
                                <h4 className="font-medium mb-1">Email</h4>
                                <p className="text-muted-foreground">{c.email}</p>
                              </div>
                              <div>
                                <h4 className="font-medium mb-1">Phone</h4>
                                <p className="text-muted-foreground">{c.phone || 'Not provided'}</p>
                              </div>
                              <div>
                                <h4 className="font-medium mb-1">Company</h4>
                                <p className="text-muted-foreground">{c.company || 'Not provided'}</p>
                              </div>
                              <div>
                                <h4 className="font-medium mb-1">Member Since</h4>
                                <p className="text-muted-foreground">
                                  {new Date(c.created_at).toLocaleDateString()}
                                </p>
                              </div>
                              <div>
                                <h4 className="font-medium mb-1">Project Count</h4>
                                <p className="text-muted-foreground">{c.project_count}</p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {filtered.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No clients found matching your search.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminClients;
