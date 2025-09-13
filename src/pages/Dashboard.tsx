import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Project {
  id: string;
  title: string;
  description: string;
  animation_type: string;
  status: string;
  estimated_price?: number;
  created_at: string;
}

const Dashboard = () => {
  const { user, loading, signOut } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [user]);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: "Error loading projects",
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
      case 'submitted':
        return 'bg-secondary';
      case 'quoted':
        return 'bg-accent';
      case 'approved':
        return 'bg-primary';
      case 'in_progress':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-destructive';
      default:
        return 'bg-muted';
    }
  };

  const formatAnimationType = (type: string) => {
    return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-surface">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-text bg-clip-text text-transparent">
            MathInMotion Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-muted-foreground">Welcome, {user.email}</span>
            <Button variant="outline" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Card className="bg-card border-border/50">
            <CardHeader>
              <CardTitle>Quick Estimate</CardTitle>
              <CardDescription>
                Get an instant price estimate for your animation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <a href="/estimate">Calculate Estimate</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/50">
            <CardHeader>
              <CardTitle>New Project</CardTitle>
              <CardDescription>
                Submit a detailed project request
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <a href="/request">Submit Request</a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Projects List */}
        <Card className="bg-card border-border/50">
          <CardHeader>
            <CardTitle>Your Projects</CardTitle>
            <CardDescription>
              Track the status of your animation projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            {projects.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">
                  You haven't submitted any projects yet.
                </p>
                <Button asChild>
                  <a href="/request">Submit Your First Project</a>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="border border-border rounded-lg p-4 hover:bg-surface-elevated transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{project.title}</h3>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status.replace(/_/g, ' ')}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-2 line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">
                        {formatAnimationType(project.animation_type)}
                      </span>
                      <div className="flex items-center space-x-4">
                        {project.estimated_price && (
                          <span className="font-semibold text-primary">
                            ${project.estimated_price}
                          </span>
                        )}
                        <span className="text-muted-foreground">
                          {new Date(project.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;