import { useEffect, useState, useMemo, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate, Link, useLocation, useNavigate } from 'react-router-dom';
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
  Download,
  Copy,
  Star,
  StarOff,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  PlayCircle,
  FileText,
  DollarSign,
  ArrowRightCircle,
  HelpCircle
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
import { cn } from '@/lib/utils';
const formatCents = (cents?: number | null) =>
  (cents ?? null) === null ? '' : (cents / 100).toFixed(2);

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
  deliverable_path?: string | null; // add
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
  const location = useLocation();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [estimates, setEstimates] = useState<QuickEstimate[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('created_at');
  const [searchQuery, setSearchQuery] = useState('');
  const [pinnedProjects, setPinnedProjects] = useState<Set<string>>(new Set());
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const [notificationsUnavailable, setNotificationsUnavailable] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [supportMessages, setSupportMessages] = useState<any[]>([]);
  const [supportInput, setSupportInput] = useState('');
  const [loadingSupport, setLoadingSupport] = useState(false);
  const { toast } = useToast();
  const supportEndRef = useRef<HTMLDivElement | null>(null);

  // --- Tab / Navigation Sync ---
  const queryTab = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('tab') || 'projects';
  }, [location.search]);
  const [activeTab, setActiveTab] = useState(queryTab);

  useEffect(() => {
    // Keep internal state in sync when user hits back/forward
    if (queryTab !== activeTab) {
      setActiveTab(queryTab);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryTab]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const params = new URLSearchParams(location.search);
    params.set('tab', value);
    navigate({ pathname: location.pathname, search: params.toString() }, { replace: true });
  };

  useEffect(() => {
    if (user) {
      fetchProjectsAndEstimates();
      fetchNotifications();
      // periodic refresh for notifications (every 30s)
      const intv = setInterval(fetchNotifications, 30000);
      return () => clearInterval(intv);
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

  const fetchNotifications = async () => {
    if (!user || notificationsUnavailable) return;
    try {
      setLoadingNotifications(true);
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(25);
      if (error) throw error;
      setNotifications(data || []);
      setUnreadCount((data || []).filter(n => !n.read_at).length);
    } catch (e: any) {
      if (e?.code === 'PGRST205' || /notifications/.test(e?.message || '')) {
        // Table not found in schema cache — migration not yet applied
        setNotificationsUnavailable(true);
      } else {
        console.error('fetchNotifications error', e);
      }
    } finally {
      setLoadingNotifications(false);
    }
  };

  const markNotificationRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read_at: new Date().toISOString() } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (e) {
      console.error('markNotificationRead error', e);
    }
  };

  const markAllNotificationsRead = async () => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read_at: new Date().toISOString() })
        .is('read_at', null);
      if (error) throw error;
      setNotifications(prev => prev.map(n => n.read_at ? n : { ...n, read_at: new Date().toISOString() }));
      setUnreadCount(0);
    } catch (e) {
      console.error('markAllNotificationsRead error', e);
    }
  };

  const fetchSupportMessages = async () => {
    if (!user) return;
    try {
      setLoadingSupport(true);
      const { data, error } = await supabase
        .from('support_messages')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });
      if (error) throw error;
      setSupportMessages(data || []);
  // (scroll removed: project messaging no longer used)
    } catch (e) {
      console.error('fetchSupportMessages error', e);
    } finally {
      setLoadingSupport(false);
    }
  };

  const sendSupportMessage = async () => {
    if (!supportInput.trim() || !user) return;
    const content = supportInput.trim();
    setSupportInput('');
    try {
      const { data, error } = await supabase
        .from('support_messages')
        .insert({ user_id: user.id, sender_id: user.id, content })
        .select('*')
        .single();
      if (error) throw error;
      setSupportMessages(prev => [...prev, data]);
  // (scroll removed)
    } catch (e) {
      console.error('sendSupportMessage error', e);
      toast({ title: 'Message failed', description: 'Could not send support message.', variant: 'destructive' });
    }
  };

  // Auto-scroll support chat when messages change
  useEffect(() => {
    if (supportEndRef.current) {
      supportEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [supportMessages]);

  // Realtime subscription for client support messages
  useEffect(() => {
    if (!user) return;
    const channel = supabase
      .channel(`support_messages_user_${user.id}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'support_messages',
        filter: `user_id=eq.${user.id}`
      }, (payload) => {
        const newMsg: any = payload.new;
        setSupportMessages(prev => prev.some(m => m.id === newMsg.id) ? prev : [...prev, newMsg]);
      });
    channel.subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user]);

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
    // Dark-theme friendly subtle tinted backgrounds
    switch (status) {
      case 'under_review':
        return 'bg-yellow-500/15 text-yellow-300 border-yellow-500/30';
      case 'accepted':
      case 'assigned_to_animator':
        return 'bg-sky-500/15 text-sky-300 border-sky-500/30';
      case 'rejected':
      case 'cancelled':
        return 'bg-red-500/15 text-red-300 border-red-500/30';
      case 'negotiation':
        return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
      case 'payment_pending':
        return 'bg-orange-500/15 text-orange-300 border-orange-500/30';
      case 'under_process':
      case 'in_revision':
        return 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30';
      case 'completed':
        return 'bg-green-500/15 text-green-300 border-green-500/30';
      default:
        return 'bg-muted/30 text-muted-foreground border-border/50';
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
    const params = new URLSearchParams({
      animation_type: estimate.animation_type,
      duration: estimate.duration_seconds.toString(),
      estimated_price: estimate.estimated_price.toString()
    });
    navigate(`/request?${params.toString()}`);
  };

  const downloadDeliverable = async (p: Project) => {
    if (!p.deliverable_path) return;
    const { data, error } = await supabase.storage
      .from('project-deliverables')
      .createSignedUrl(p.deliverable_path, 60); // seconds
    if (error || !data?.signedUrl) {
      toast({ title: 'Download failed', description: 'Please try again.', variant: 'destructive' });
      return;
    }
    window.open(data.signedUrl, '_blank');
  };

  const sidebarItems: { title: string; icon: any; tab: string; description?: string }[] = [
    { title: 'Overview', icon: LayoutDashboard, tab: 'projects', description: 'Project overview & KPIs' },
    { title: 'Projects', icon: FolderKanban, tab: 'projects', description: 'Manage your animation projects' },
    { title: 'Estimates', icon: Calculator, tab: 'estimates', description: 'Previous quick estimates' },
    { title: 'Payments', icon: CreditCard, tab: 'payments', description: 'Invoices & payment status' }
  ];

  // Statistics
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => 
    ['under_review', 'accepted', 'assigned_to_animator', 'under_process', 'in_revision', 'payment_pending'].includes(p.status)
  ).length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const totalSpentCents = projects.reduce(
    (sum, p) => sum + (p.final_price ?? p.estimated_price ?? 0),
    0
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-b from-background via-background to-background/95">
        {/* Sidebar */}
        <Sidebar className="border-r bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/55">
          <SidebarContent>
            <div className="p-4 border-b border-border/50">
              <h1 className="text-lg font-bold tracking-tight">
                <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">MathInMotion</span>
              </h1>
            </div>
            <SidebarGroup>
              <SidebarGroupLabel className="px-4 text-xs font-semibold text-muted-foreground/70">Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sidebarItems.map((item) => {
                    const isActive = activeTab === item.tab;
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <button
                            onClick={() => handleTabChange(item.tab)}
                            aria-current={isActive ? 'page' : undefined}
                            className={cn(
                              'w-full text-left flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors group',
                              isActive
                                ? 'bg-primary/15 text-primary ring-1 ring-primary/30'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                            )}
                          >
                            <item.icon className={cn('h-4 w-4', isActive && 'text-primary')} />
                            <span className="flex-1">{item.title}</span>
                            {!isActive && item.description && (
                              <ArrowRightCircle className="h-4 w-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" />
                            )}
                          </button>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <div className="mt-auto p-4 border-t border-border/50 text-xs text-muted-foreground/70">
              <p>Signed in as</p>
              <p className="truncate font-medium text-foreground/90">{user.email}</p>
            </div>
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      {unreadCount > 0 && !notificationsUnavailable && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center">
                          {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80 max-h-[400px] overflow-auto">
                    <div className="flex items-center justify-between px-2 py-1.5 border-b">
                      <span className="text-xs font-medium text-muted-foreground">Notifications</span>
                      <Button variant="outline" size="sm" disabled={unreadCount === 0 || notificationsUnavailable} onClick={markAllNotificationsRead}>Mark all read</Button>
                    </div>
                    {notificationsUnavailable && (
                      <div className="p-3 text-xs text-muted-foreground space-y-1">
                        <p>Notifications feature pending migration.</p>
                        <p className="text-[10px] opacity-60">Ask support if this persists.</p>
                      </div>
                    )}
                    {loadingNotifications && (
                      <div className="p-3 text-xs text-muted-foreground">Loading...</div>
                    )}
                    {(!loadingNotifications && notifications.length === 0) && (
                      <div className="p-3 text-xs text-muted-foreground">No notifications yet.</div>
                    )}
                    {notifications.map(n => (
                      <div key={n.id} className={cn('px-3 py-2 text-xs rounded-md cursor-pointer group', !n.read_at ? 'bg-muted/40' : 'hover:bg-muted/30')} onClick={() => markNotificationRead(n.id)}>
                        <div className="flex justify-between gap-2">
                          <p className={cn('font-medium line-clamp-1', !n.read_at && 'text-primary')}>{n.title}</p>
                          {!n.read_at && <span className="w-2 h-2 rounded-full bg-primary shrink-0 self-center" />}
                        </div>
                        <p className="line-clamp-2 mt-0.5 text-muted-foreground/80">{n.message}</p>
                        {n.project_id && (
                          <Button variant="link" size="sm" className="px-0 h-auto mt-1" onClick={(e) => { e.stopPropagation(); const proj = projects.find(p => p.id === n.project_id); if (proj) { setSelectedProject(proj); }}}>
                            Open Project
                          </Button>
                        )}
                      </div>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

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

                {/* Support Chat Button */}
                <Button variant="outline" onClick={() => { setSupportOpen(true); fetchSupportMessages(); }}>
                  <HelpCircle className="h-4 w-4 mr-2" /> Support
                </Button>
              </div>
            </div>
          </header>

          {/* Main Dashboard Content */}
          <main className="flex-1 overflow-auto p-6 space-y-6">
            {/* KPI Row (already present stats moved below with slight visual polish) */}
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                  <div className="text-2xl font-bold">${formatCents(totalSpentCents)}</div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs for different sections */}
            <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
              <TabsList>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="estimates">Estimates</TabsTrigger>
                <TabsTrigger value="payments">Payments</TabsTrigger>
                <TabsTrigger value="quick-actions">Quick Actions</TabsTrigger>
              </TabsList>
                <TabsContent value="projects" className="space-y-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                          <Input
                            placeholder="Search projects..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                          <SelectTrigger className="w-[180px]"><SelectValue placeholder="Filter" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="under_review">Under Review</SelectItem>
                            <SelectItem value="accepted">Accepted</SelectItem>
                            <SelectItem value="assigned_to_animator">Assigned</SelectItem>
                            <SelectItem value="payment_pending">Payment Pending</SelectItem>
                            <SelectItem value="under_process">In Process</SelectItem>
                            <SelectItem value="in_revision">In Revision</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select value={sortBy} onValueChange={setSortBy}>
                          <SelectTrigger className="w-[160px]"><SelectValue placeholder="Sort By" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="created_at">Created Date</SelectItem>
                            <SelectItem value="deadline">Deadline</SelectItem>
                            <SelectItem value="title">Title</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

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
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {project.description}
                            </p>
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
                                  ${project.final_price != null
                                      ? formatCents(project.final_price)
                                      : formatCents(project.estimated_price)}
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

              {/* Payments Tab */}
              <TabsContent value="payments" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Payments & Invoices</CardTitle>
                    <CardDescription>Track what has been billed and what is pending.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-3">
                      <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-xs font-medium tracking-wide text-muted-foreground">Total Spent</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold">${formatCents(totalSpentCents)}</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-xs font-medium tracking-wide text-muted-foreground">Pending Payments</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold">{projects.filter(p => p.status === 'payment_pending').length}</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-xs font-medium tracking-wide text-muted-foreground">Completed (Paid)</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold">{projects.filter(p => p.status === 'completed').length}</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium text-sm tracking-wide text-muted-foreground">Payment Pending Projects</h4>
                      {projects.filter(p => p.status === 'payment_pending').length === 0 ? (
                        <p className="text-sm text-muted-foreground/70">No payments are pending right now.</p>
                      ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                          {projects.filter(p => p.status === 'payment_pending').map(p => (
                            <Card key={p.id} className="border border-orange-500/20 bg-orange-500/5">
                              <CardHeader className="pb-2">
                                <CardTitle className="text-sm flex items-center gap-2">
                                  <CreditCard className="h-4 w-4 text-orange-400" />
                                  {p.title}
                                </CardTitle>
                                <CardDescription className="text-xs line-clamp-2">{p.description}</CardDescription>
                              </CardHeader>
                              <CardContent className="space-y-3">
                                <div className="flex justify-between text-xs text-muted-foreground">
                                  <span>Estimated</span>
                                  <span>${formatCents(p.estimated_price || 0)}</span>
                                </div>
                                {p.final_price && (
                                  <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>Final</span>
                                    <span>${formatCents(p.final_price)}</span>
                                  </div>
                                )}
                                <Button size="sm" className="w-full" variant="secondary">
                                  Pay Now
                                </Button>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>
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
                      <p className="text-lg font-semibold text-primary">
                        ${formatCents(selectedProject.estimated_price)}
                      </p>
                    </div>
                  )}
                  
                  {selectedProject.final_price && (
                    <div>
                      <h4 className="font-medium mb-1">Final Price</h4>
                      <p className="text-lg font-semibold text-primary">
                        ${formatCents(selectedProject.final_price)}
                      </p>
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
                {/* Conversation feature removed */}
                <Button
                  variant="outline"
                  disabled={selectedProject.status !== 'completed' || !selectedProject.deliverable_path}
                  onClick={() => selectedProject && downloadDeliverable(selectedProject)}
                  className={cn((selectedProject.status !== 'completed' || !selectedProject.deliverable_path) && 'opacity-50 cursor-not-allowed')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  {selectedProject.status === 'completed' ? 'Download' : 'Download (locked)'}
                </Button>
                {/* Duplicate removed in modal */}
              </div>

              {/* Project conversation feature removed */}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Support Chat Dialog */}
      <Dialog open={supportOpen} onOpenChange={setSupportOpen}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Support Chat</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-xs text-muted-foreground">Chat directly with our support team.</div>
            <div className="max-h-72 overflow-auto rounded-md border bg-muted/10 p-3 space-y-2 text-sm">
              {loadingSupport && <p className="text-xs text-muted-foreground">Loading...</p>}
              {!loadingSupport && supportMessages.length === 0 && (
                <p className="text-xs text-muted-foreground">No messages yet. Ask us anything!</p>
              )}
              {supportMessages.map(m => (
                <div key={m.id} className={cn('flex flex-col gap-0.5 rounded p-2', m.sender_id === user.id ? 'bg-primary/10 ml-auto max-w-[80%]' : 'bg-muted/30 mr-auto max-w-[80%]') }>
                  <span className="text-[10px] uppercase tracking-wide text-muted-foreground/70">{m.sender_id === user.id ? 'You' : 'Support'}</span>
                  <p>{m.content}</p>
                  <span className="text-[10px] text-muted-foreground/60">{new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              ))}
              <div ref={supportEndRef} />
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={supportInput}
                onChange={(e) => setSupportInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendSupportMessage(); } }}
              />
              <Button onClick={sendSupportMessage} disabled={!supportInput.trim()}>Send</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
};

export default EnhancedDashboard;
