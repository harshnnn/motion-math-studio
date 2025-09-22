import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Calculator, 
  CreditCard, 
  Bell, 
  Filter, 
  SortAsc, 
  Eye, 
  MessageSquare, 
  Download, 
  Copy, 
  Star,
  StarOff,
  User,
  Search,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle,
  AlertCircle,
  PlayCircle,
  FileText,
  DollarSign
} from 'lucide-react';
import { 
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';

interface Project {
  id: string;
  title: string;
  description: string;
  animation_type: string;
  status: string;
  estimated_price?: number;
  final_price?: number;
  created_at: string;
  updated_at: string;
  deadline?: string;
  duration_seconds?: number;
  notes?: string;
  style_preferences?: string;
}

interface QuickEstimate {
  id: string;
  animation_type: string;
  duration_seconds: number;
  complexity_factor: number;
  estimated_price: number;
  email?: string;
  created_at: string;
}

const EnhancedDashboard = () => {
  const { user, loading, signOut } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [estimates, setEstimates] = useState<QuickEstimate[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('created_at');
  const [searchQuery, setSearchQuery] = useState('');
  const [pinnedProjects, setPinnedProjects] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchProjectsAndEstimates();
    }
  }, [user]);

  const fetchProjectsAndEstimates = async () => {
    try {
      // Fetch projects
      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (projectError) throw projectError;
      setProjects(projectData || []);

      // Fetch user's estimates
      const { data: estimateData, error: estimateError } = await supabase
        .from('quick_estimates')
        .select('*')
        .eq('email', user?.email || '')
        .order('created_at', { ascending: false });

      if (estimateError) throw estimateError;
      setEstimates(estimateData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error loading data",
        description: "Please try refreshing the page.",
        variant: "destructive",
      });
    } finally {
      setProjectsLoading(false);
    }
  };

  if (loading || projectsLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'accepted':
      case 'assigned_to_animator':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'rejected':
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'negotiation':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'payment_pending':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'under_process':
      case 'in_revision':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'under_review':
        return <Clock className="h-4 w-4" />;
      case 'accepted':
      case 'assigned_to_animator':
        return <PlayCircle className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
      case 'cancelled':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getProgressPercentage = (status: string) => {
    switch (status) {
      case 'draft': return 10;
      case 'under_review': return 25;
      case 'accepted': return 40;
      case 'assigned_to_animator': return 55;
      case 'payment_pending': return 45;
      case 'under_process': return 75;
      case 'in_revision': return 80;
      case 'completed': return 100;
      case 'rejected':
      case 'cancelled': return 0;
      default: return 0;
    }
  };

  const formatAnimationType = (type: string) => {
    return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatStatus = (status: string) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const filteredProjects = projects
    .filter(project => 
      (filterStatus === 'all' || project.status === filterStatus) &&
      (searchQuery === '' || 
       project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       project.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (pinnedProjects.has(a.id) && !pinnedProjects.has(b.id)) return -1;
      if (!pinnedProjects.has(a.id) && pinnedProjects.has(b.id)) return 1;
      
      switch (sortBy) {
        case 'created_at':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'deadline':
          if (!a.deadline && !b.deadline) return 0;
          if (!a.deadline) return 1;
          if (!b.deadline) return -1;
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const togglePin = (projectId: string) => {
    setPinnedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  const convertEstimateToProject = (estimate: QuickEstimate) => {
    // Navigate to request page with pre-filled data
    const params = new URLSearchParams({
      animation_type: estimate.animation_type,
      duration: estimate.duration_seconds.toString(),
      estimated_price: estimate.estimated_price.toString()
    });
    window.location.href = `/request?${params.toString()}`;
  };

  const sidebarItems = [
    { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { title: "Projects", icon: FolderKanban, path: "/dashboard?tab=projects" },
    { title: "Estimates", icon: Calculator, path: "/dashboard?tab=estimates" },
    { title: "Payments", icon: CreditCard, path: "/dashboard?tab=payments" },
  ];

  // Statistics
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => 
    ['under_review', 'accepted', 'assigned_to_animator', 'under_process', 'in_revision', 'payment_pending'].includes(p.status)
  ).length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const totalSpent = projects.reduce((sum, p) => sum + (p.final_price || p.estimated_price || 0), 0);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {/* Sidebar */}
        <Sidebar className="border-r">
          <SidebarContent>
            <div className="p-4">
              <h1 className="text-lg font-bold bg-gradient-text bg-clip-text text-transparent">
                MathInMotion
              </h1>
            </div>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sidebarItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link to={item.path} className="flex items-center gap-2">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="border-b border-border/50 bg-surface/80 backdrop-blur-sm">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <h1 className="text-xl font-semibold">Dashboard</h1>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {activeProjects > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                      {activeProjects}
                    </span>
                  )}
                </Button>

                {/* Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span className="hidden sm:inline">{user.email}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={signOut}>
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Main Dashboard Content */}
          <main className="flex-1 overflow-auto p-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                  <FolderKanban className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalProjects}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                  <PlayCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{activeProjects}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{completedProjects}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${totalSpent}</div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs for different sections */}
            <Tabs defaultValue="projects" className="space-y-6">
              <TabsList>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="estimates">Estimates</TabsTrigger>
                <TabsTrigger value="quick-actions">Quick Actions</TabsTrigger>
              </TabsList>

              {/* Projects Tab */}
              <TabsContent value="projects" className="space-y-6">
                {/* Filters and Search */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-wrap gap-4 items-center">
                      <div className="flex-1 min-w-[200px]">
                        <Input
                          placeholder="Search projects..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full"
                        />
                      </div>
                      
                      <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="w-[150px]">
                          <Filter className="h-4 w-4 mr-2" />
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="under_review">Under Review</SelectItem>
                          <SelectItem value="accepted">Accepted</SelectItem>
                          <SelectItem value="assigned_to_animator">Assigned</SelectItem>
                          <SelectItem value="under_process">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-[150px]">
                          <SortAsc className="h-4 w-4 mr-2" />
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="created_at">Created Date</SelectItem>
                          <SelectItem value="deadline">Deadline</SelectItem>
                          <SelectItem value="title">Title</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Projects Grid */}
                {filteredProjects.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-8">
                      <p className="text-muted-foreground mb-4">
                        {projects.length === 0 ? "You haven't submitted any projects yet." : "No projects match your filters."}
                      </p>
                      <Button asChild>
                        <Link to="/request">Submit Your First Project</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredProjects.map((project) => (
                      <Card key={project.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-lg flex items-center gap-2">
                                {pinnedProjects.has(project.id) && (
                                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                )}
                                {project.title}
                              </CardTitle>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge className={`${getStatusColor(project.status)} border`}>
                                  {getStatusIcon(project.status)}
                                  <span className="ml-1">{formatStatus(project.status)}</span>
                                </Badge>
                              </div>
                            </div>
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <span className="sr-only">Actions</span>
                                  •••
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setSelectedProject(project)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => togglePin(project.id)}>
                                  {pinnedProjects.has(project.id) ? (
                                    <>
                                      <StarOff className="h-4 w-4 mr-2" />
                                      Unpin
                                    </>
                                  ) : (
                                    <>
                                      <Star className="h-4 w-4 mr-2" />
                                      Pin
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Copy className="h-4 w-4 mr-2" />
                                  Duplicate
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="space-y-4">
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {project.description}
                          </p>
                          
                          {/* Progress Bar */}
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{getProgressPercentage(project.status)}%</span>
                            </div>
                            <Progress value={getProgressPercentage(project.status)} />
                          </div>
                          
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">
                              {formatAnimationType(project.animation_type)}
                            </span>
                            {(project.final_price || project.estimated_price) && (
                              <span className="font-semibold text-primary">
                                ${project.final_price || project.estimated_price}
                              </span>
                            )}
                          </div>
                          
                          <div className="text-xs text-muted-foreground">
                            Created: {new Date(project.created_at).toLocaleDateString()}
                            {project.deadline && (
                              <div>Deadline: {new Date(project.deadline).toLocaleDateString()}</div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Estimates Tab */}
              <TabsContent value="estimates" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Estimates</CardTitle>
                    <CardDescription>
                      Previous price estimates you've calculated
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {estimates.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">
                          You haven't calculated any estimates yet.
                        </p>
                        <Button asChild>
                          <Link to="/estimate">Calculate Estimate</Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {estimates.map((estimate) => (
                          <Card key={estimate.id} className="hover:shadow-sm transition-shadow">
                            <CardContent className="pt-6">
                              <div className="space-y-3">
                                <div className="flex justify-between items-start">
                                  <h4 className="font-medium">
                                    {formatAnimationType(estimate.animation_type)}
                                  </h4>
                                  <span className="text-lg font-bold text-primary">
                                    ${estimate.estimated_price}
                                  </span>
                                </div>
                                
                                <div className="text-sm text-muted-foreground space-y-1">
                                  <div>Duration: {estimate.duration_seconds}s</div>
                                  <div>Complexity: {estimate.complexity_factor}x</div>
                                  <div>Date: {new Date(estimate.created_at).toLocaleDateString()}</div>
                                </div>
                                
                                <Button 
                                  className="w-full" 
                                  size="sm"
                                  onClick={() => convertEstimateToProject(estimate)}
                                >
                                  Convert to Project
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Quick Actions Tab */}
              <TabsContent value="quick-actions" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Estimate</CardTitle>
                      <CardDescription>
                        Get an instant price estimate for your animation
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild className="w-full">
                        <Link to="/estimate">Calculate Estimate</Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>New Project</CardTitle>
                      <CardDescription>
                        Submit a detailed project request
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild className="w-full">
                        <Link to="/request">Submit Request</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>

      {/* Project Details Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>{selectedProject?.title}</DialogTitle>
          </DialogHeader>
          
          {selectedProject && (
            <div className="space-y-6">
              {/* Status and Progress */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge className={`${getStatusColor(selectedProject.status)} border`}>
                    {getStatusIcon(selectedProject.status)}
                    <span className="ml-1">{formatStatus(selectedProject.status)}</span>
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {getProgressPercentage(selectedProject.status)}% Complete
                  </span>
                </div>
                <Progress value={getProgressPercentage(selectedProject.status)} />
              </div>

              {/* Project Details */}
              <div className="grid gap-4">
                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{selectedProject.description}</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-1">Animation Type</h4>
                    <p className="text-sm text-muted-foreground">
                      {formatAnimationType(selectedProject.animation_type)}
                    </p>
                  </div>
                  
                  {selectedProject.duration_seconds && (
                    <div>
                      <h4 className="font-medium mb-1">Duration</h4>
                      <p className="text-sm text-muted-foreground">{selectedProject.duration_seconds}s</p>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="font-medium mb-1">Created</h4>
                    <p className="text-sm text-muted-foreground">
                      {new Date(selectedProject.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  
                  {selectedProject.deadline && (
                    <div>
                      <h4 className="font-medium mb-1">Deadline</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(selectedProject.deadline).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>

                {/* Pricing */}
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedProject.estimated_price && (
                    <div>
                      <h4 className="font-medium mb-1">Estimated Price</h4>
                      <p className="text-lg font-semibold text-primary">${selectedProject.estimated_price}</p>
                    </div>
                  )}
                  
                  {selectedProject.final_price && (
                    <div>
                      <h4 className="font-medium mb-1">Final Price</h4>
                      <p className="text-lg font-semibold text-primary">${selectedProject.final_price}</p>
                    </div>
                  )}
                </div>

                {/* Additional Details */}
                {selectedProject.style_preferences && (
                  <div>
                    <h4 className="font-medium mb-2">Style Preferences</h4>
                    <p className="text-sm text-muted-foreground">{selectedProject.style_preferences}</p>
                  </div>
                )}

                {selectedProject.notes && (
                  <div>
                    <h4 className="font-medium mb-2">Notes</h4>
                    <p className="text-sm text-muted-foreground">{selectedProject.notes}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                {selectedProject.status === 'payment_pending' && (
                  <Button>Make Payment</Button>
                )}
                <Button variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline">
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
};

export default EnhancedDashboard;
