import ProjectRequestForm from '@/components/ProjectRequestForm';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const RequestPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">
            <span className="bg-gradient-text bg-clip-text text-transparent">
              Submit Project Request
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Please sign in to submit a project request and track your animations.
          </p>
          <div className="space-y-4">
            <Link to="/auth">
              <Button size="lg" className="mr-4">
                Sign In
              </Button>
            </Link>
            <Link to="/estimate">
              <Button variant="outline" size="lg">
                Get Quick Estimate Instead
              </Button>
            </Link>
          </div>
        </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-text bg-clip-text text-transparent">
              Submit Project Request
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tell us about your mathematical animation project. We'll review your request 
            and provide a detailed quote within 24 hours.
          </p>
        </div>

        <ProjectRequestForm />
      </div>
      </div>
    </div>
  );
};

export default RequestPage;