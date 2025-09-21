import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { Eye, Mail, Phone, Building, Ban, CheckCircle } from 'lucide-react';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useToast } from '@/hooks/use-toast';
import ClientMessageForm from '@/components/admin/ClientMessageForm';

interface Client {
  user_id: string;
  email: string;
  full_name: string;
  phone?: string;
  company?: string;
  created_at: string;
  projectCount: number;
  totalSpent: number;
  lastProject?: string;
}

const AdminClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      // Fetch profiles with project data
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Fetch projects to calculate stats
      const { data: projects, error: projectsError } = await supabase
        .from('projects')
        .select('user_id, final_price, created_at, title');

      if (projectsError) throw projectsError;

      // Calculate client statistics
      const clientsWithStats = profiles.map(profile => {
        const userProjects = projects.filter(p => p.user_id === profile.user_id);
        const totalSpent = userProjects
          .filter(p => p.final_price)
          .reduce((sum, p) => sum + (p.final_price || 0), 0);
        
        const lastProject = userProjects
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];

        return {
          ...profile,
          projectCount: userProjects.length,
          totalSpent,
          lastProject: lastProject?.title
        };
      });

      setClients(clientsWithStats);
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast({
        title: "Error",
        description: "Failed to fetch clients data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredClients = clients.filter(client => {
    const searchTerm = search.toLowerCase();
    return (
      client.full_name?.toLowerCase().includes(searchTerm) ||
      client.email.toLowerCase().includes(searchTerm) ||
      client.company?.toLowerCase().includes(searchTerm)
    );
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount / 100);
  };

  const getClientStatus = (client: Client) => {
    if (client.projectCount === 0) return { label: 'New', color: 'bg-blue-100 text-blue-800' };
    if (client.projectCount >= 5) return { label: 'VIP', color: 'bg-purple-100 text-purple-800' };
    if (client.totalSpent > 100000) return { label: 'Premium', color: 'bg-gold-100 text-gold-800' };
    return { label: 'Active', color: 'bg-green-100 text-green-800' };
  };

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
          <CardDescription>
            Manage your client base and track their project history
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="mb-6">
            <Input
              placeholder="Search clients by name, email, or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-md"
            />
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{clients.length}</div>
                <p className="text-xs text-muted-foreground">Total Clients</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">
                  {clients.filter(c => c.projectCount > 0).length}
                </div>
                <p className="text-xs text-muted-foreground">Active Clients</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">
                  {clients.filter(c => c.projectCount >= 5).length}
                </div>
                <p className="text-xs text-muted-foreground">VIP Clients</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">
                  {formatCurrency(clients.reduce((sum, c) => sum + c.totalSpent, 0))}
                </div>
                <p className="text-xs text-muted-foreground">Total Revenue</p>
              </CardContent>
            </Card>
          </div>

          {/* Clients Table */}
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
                {filteredClients.map((client) => {
                  const status = getClientStatus(client);
                  return (
                    <TableRow key={client.user_id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{client.full_name || 'Unknown'}</p>
                          {client.company && (
                            <p className="text-sm text-muted-foreground flex items-center">
                              <Building className="h-3 w-3 mr-1" />
                              {client.company}
                            </p>
                          )}
                          {client.lastProject && (
                            <p className="text-xs text-muted-foreground">
                              Last: {client.lastProject}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="h-3 w-3 mr-1" />
                            {client.email}
                          </div>
                          {client.phone && (
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Phone className="h-3 w-3 mr-1" />
                              {client.phone}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center">
                          <div className="font-medium">{client.projectCount}</div>
                          <div className="text-xs text-muted-foreground">projects</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-green-600">
                          {formatCurrency(client.totalSpent)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={status.color}>
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
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
                                  Complete information for {client.full_name || client.email}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-medium mb-1">Full Name</h4>
                                    <p className="text-sm text-muted-foreground">
                                      {client.full_name || 'Not provided'}
                                    </p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-1">Email</h4>
                                    <p className="text-sm text-muted-foreground">{client.email}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-1">Phone</h4>
                                    <p className="text-sm text-muted-foreground">
                                      {client.phone || 'Not provided'}
                                    </p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-1">Company</h4>
                                    <p className="text-sm text-muted-foreground">
                                      {client.company || 'Not provided'}
                                    </p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-1">Member Since</h4>
                                    <p className="text-sm text-muted-foreground">
                                      {new Date(client.created_at).toLocaleDateString()}
                                    </p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-1">Project Count</h4>
                                    <p className="text-sm text-muted-foreground">
                                      {client.projectCount} projects
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Mail className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Send Message</DialogTitle>
                                <DialogDescription>
                                  Send a message to {client.full_name || client.email}
                                </DialogDescription>
                              </DialogHeader>
                              <ClientMessageForm client={client} />
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            {filteredClients.length === 0 && (
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