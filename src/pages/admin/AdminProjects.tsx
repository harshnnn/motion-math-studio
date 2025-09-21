import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { Eye, Edit, FileText, DollarSign, RefreshCw, Filter } from 'lucide-react';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useToast } from '@/hooks/use-toast';
import { useAdminAuth } from '@/hooks/useAdminAuth';

interface Project {
  id: string;
  title: string;
  description: string;
  animation_type: string;
  status: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  estimated_price?: number | null;
  final_price?: number | null;
  notes?: string | null;
  style_preferences?: string | null;
  duration_seconds?: number | null;
  // Newly surfaced fields
  deadline?: string | null;
  budget_min?: number | null;
  budget_max?: number | null;
  script_content?: string | null;
  reference_materials?: string | null;
}

const STATUSES = [
  'draft',
  'submitted',
  'under_review',
  'payment_pending',
  'in_progress',
  'assigned_to_animator',
  'in_revision',
  'completed',
  'cancelled'
];

const statusColors: Record<string,string> = {
  draft: 'bg-gray-100 text-gray-800',
  submitted: 'bg-slate-100 text-slate-800',
  under_review: 'bg-yellow-100 text-yellow-800',
  payment_pending: 'bg-orange-100 text-orange-800',
  in_progress: 'bg-blue-100 text-blue-800',
  assigned_to_animator: 'bg-purple-100 text-purple-800',
  in_revision: 'bg-indigo-100 text-indigo-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
};

const formatLabel = (s: string) => s.replace(/_/g, ' ');
const formatDate = (d?: string | null) => d ? new Date(d).toLocaleDateString() : '-';
const formatDateTime = (d?: string | null) => d ? new Date(d).toLocaleString() : '-';

const AdminProjects = () => {
  const { isAuthenticated } = useAdminAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState('');
  const [finalPrice, setFinalPrice] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated) fetchProjects();
  }, [isAuthenticated]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.rpc('admin_get_projects', {});
      if (error) throw error;
      setProjects(data || []);
    } catch (error:any) {
      console.error('Error fetching projects:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to fetch projects',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price?: number | null) =>
    price || price === 0
      ? new Intl.NumberFormat('en-US',{ style:'currency', currency:'USD'}).format(price / 100)
      : '-';

  const optimisticUpdate = (id: string, partial: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...partial } : p));
  };

  const updateProject = async (
    projectId: string,
    updates: { final_price?: number; status?: string; notes?: string }
  ) => {
    setUpdatingId(projectId);
    optimisticUpdate(projectId, {
      final_price: updates.final_price ?? undefined,
      status: updates.status ?? undefined,
      notes: updates.notes ?? undefined
    });

    try {
      const { data, error } = await supabase.rpc('admin_update_project', {
        p_id: projectId,
        p_final_price: updates.final_price ?? null,
        p_status: updates.status ?? null,
        p_notes: updates.notes ?? null
      });
      if (error) throw error;
      if (data && data.length > 0) {
        const row = data[0];
        optimisticUpdate(projectId, {
          final_price: row.final_price,
          status: row.status,
          notes: row.notes
        });
      } else {
        await fetchProjects();
      }
      toast({ title: 'Success', description: 'Project updated' });
    } catch (error:any) {
      console.error('Update error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Update failed',
        variant: 'destructive'
      });
      await fetchProjects();
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSetFinalPrice = () => {
    if (selectedProject && finalPrice) {
      const cents = parseInt(finalPrice, 10) * 100;
      updateProject(selectedProject.id, {
        final_price: cents,
        status: 'payment_pending'
      });
      setFinalPrice('');
      setSelectedProject(null);
    }
  };

  const handleSaveNotes = () => {
    if (selectedProject) {
      updateProject(selectedProject.id, { notes: notes.trim() || undefined });
      setNotes('');
      setSelectedProject(null);
    }
  };

  const handleStatusChange = (project: Project, newStatus: string) => {
    if (project.status === newStatus) return;
    updateProject(project.id, { status: newStatus });
  };

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return projects.filter(p => {
      const matchesSearch =
        p.title.toLowerCase().includes(term) ||
        (p.description || '').toLowerCase().includes(term) ||
        p.animation_type.toLowerCase().includes(term) ||
        p.status.toLowerCase().includes(term) ||
        (p.notes || '').toLowerCase().includes(term);

      const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
      const matchesType = typeFilter === 'all' || p.animation_type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [projects, search, statusFilter, typeFilter]);

  if (!isAuthenticated) return <div className="p-6 text-sm">Unauthorized</div>;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const uniqueTypes = Array.from(new Set(projects.map(p => p.animation_type))).sort();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Project Management</CardTitle>
                  <CardDescription>Full control over client project lifecycle</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={fetchProjects}>
                  <RefreshCw className="h-4 w-4 mr-1" /> Refresh
                </Button>
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 flex gap-2">
              <Input
                placeholder="Search (title, desc, type, status, notes)…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {STATUSES.map(s => (
                  <SelectItem key={s} value={s}>{formatLabel(s)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {uniqueTypes.map(t => (
                  <SelectItem key={t} value={t}>{formatLabel(t)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Pricing</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="min-w-[260px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(project => {
                  const budget =
                    project.budget_min == null && project.budget_max == null
                      ? '-'
                      : `${project.budget_min ?? '?'} - ${project.budget_max ?? '?'}`;
                  return (
                    <TableRow key={project.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">{project.title}</p>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {project.description}
                          </p>
                          {project.duration_seconds && (
                            <p className="text-[10px] text-muted-foreground">
                              Duration: {project.duration_seconds}s
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={project.status}
                          onValueChange={(v) => handleStatusChange(project, v)}
                          disabled={updatingId === project.id}
                        >
                          <SelectTrigger className={`h-8 w-40 justify-start ${updatingId === project.id ? 'opacity-70' : ''}`}>
                            <Badge className={statusColors[project.status] || 'bg-gray-100 text-gray-800'}>
                              {formatLabel(project.status)}
                            </Badge>
                          </SelectTrigger>
                          <SelectContent>
                            {STATUSES.map(s => (
                              <SelectItem key={s} value={s}>
                                {formatLabel(s)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {formatLabel(project.animation_type)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <p className="text-xs">{budget}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-xs">{formatDate(project.deadline)}</p>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1 text-sm">
                          {project.final_price ? (
                            <div className="font-semibold text-green-600">
                              Final {formatPrice(project.final_price)}
                            </div>
                          ) : project.estimated_price ? (
                            <div className="text-muted-foreground">
                              Est {formatPrice(project.estimated_price)}
                            </div>
                          ) : (
                            <div className="text-muted-foreground">-</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(project.created_at)}</TableCell>
                      <TableCell>{formatDate(project.updated_at)}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>{project.title}</DialogTitle>
                                <DialogDescription>Project details</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-5 text-sm">
                                <section>
                                  <h4 className="font-medium mb-1">Description</h4>
                                  <p className="text-muted-foreground">{project.description || '-'}</p>
                                </section>

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-medium mb-1">Animation Type</h4>
                                    <p className="text-muted-foreground">{formatLabel(project.animation_type)}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-1">Status</h4>
                                    <p className="text-muted-foreground">{formatLabel(project.status)}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-1">Deadline</h4>
                                    <p className="text-muted-foreground">{formatDate(project.deadline)}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-1">Duration (seconds)</h4>
                                    <p className="text-muted-foreground">
                                      {project.duration_seconds ?? '-'}
                                    </p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-1">Created</h4>
                                    <p className="text-muted-foreground">
                                      {formatDateTime(project.created_at)}
                                    </p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-1">Updated</h4>
                                    <p className="text-muted-foreground">
                                      {formatDateTime(project.updated_at)}
                                    </p>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-medium mb-1">Budget Min</h4>
                                    <p className="text-muted-foreground">
                                      {project.budget_min ?? '-'}
                                    </p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-1">Budget Max</h4>
                                    <p className="text-muted-foreground">
                                      {project.budget_max ?? '-'}
                                    </p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-1">Estimated Price</h4>
                                    <p className="text-muted-foreground">
                                      {formatPrice(project.estimated_price ?? undefined)}
                                    </p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-1">Final Price</h4>
                                    <p className="text-muted-foreground">
                                      {formatPrice(project.final_price ?? undefined)}
                                    </p>
                                  </div>
                                </div>

                                {project.script_content && (
                                  <section>
                                    <h4 className="font-medium mb-1">Script Content</h4>
                                    <p className="text-muted-foreground whitespace-pre-line">
                                      {project.script_content}
                                    </p>
                                  </section>
                                )}

                                {project.reference_materials && (
                                  <section>
                                    <h4 className="font-medium mb-1">Reference Materials</h4>
                                    <p className="text-muted-foreground whitespace-pre-line">
                                      {project.reference_materials}
                                    </p>
                                  </section>
                                )}

                                {project.style_preferences && (
                                  <section>
                                    <h4 className="font-medium mb-1">Style Preferences</h4>
                                    <p className="text-muted-foreground">
                                      {project.style_preferences}
                                    </p>
                                  </section>
                                )}

                                {project.notes && (
                                  <section>
                                    <h4 className="font-medium mb-1">Admin Notes</h4>
                                    <p className="text-muted-foreground whitespace-pre-line">
                                      {project.notes}
                                    </p>
                                  </section>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedProject(project)}
                              >
                                <DollarSign className="h-4 w-4 mr-1" />
                                Price
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Set Final Price</DialogTitle>
                                <DialogDescription>{project.title}</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <Input
                                  type="number"
                                  placeholder="Enter price (USD)"
                                  value={selectedProject?.id === project.id ? finalPrice : ''}
                                  onChange={(e) => setFinalPrice(e.target.value)}
                                />
                                <Button
                                  disabled={!finalPrice}
                                  onClick={handleSetFinalPrice}
                                  className="w-full"
                                >
                                  Save Final Price
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedProject(project);
                                  setNotes(project.notes || '');
                                }}
                              >
                                <FileText className="h-4 w-4 mr-1" />
                                Notes
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Project Notes</DialogTitle>
                                <DialogDescription>{project.title}</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <Textarea
                                  rows={5}
                                  value={selectedProject?.id === project.id ? notes : project.notes || ''}
                                  onChange={(e) => setNotes(e.target.value)}
                                  placeholder="Add internal notes..."
                                />
                                <Button onClick={handleSaveNotes} className="w-full">
                                  Save Notes
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-1" />
                                Status
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Update Status</DialogTitle>
                                <DialogDescription>{project.title}</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <Select
                                  defaultValue={project.status}
                                  onValueChange={(v) => handleStatusChange(project, v)}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Choose status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {STATUSES.map(s => (
                                      <SelectItem key={s} value={s}>{formatLabel(s)}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <p className="text-xs text-muted-foreground">
                                  Status updates are applied immediately.
                                </p>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            {filtered.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No projects found.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminProjects;
