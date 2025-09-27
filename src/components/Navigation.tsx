import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import ThemeToggle from '@/components/ThemeToggle';

const Navigation = () => {
  const { user, loading, signOut } = useAuth();

  return (
    <header className="border-b border-border/50 bg-surface/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold bg-gradient-text bg-clip-text text-transparent">
          MathInMotion
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/estimate" className="text-foreground hover:text-primary transition-colors">
            Get Estimate
          </Link>
          <Link to="/request" className="text-foreground hover:text-primary transition-colors">
            Submit Request
          </Link>
          
          {user && (
            <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors">
              Dashboard
            </Link>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {/* Theme toggle always visible and appears to the left of auth button */}
          <ThemeToggle />

          {loading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          ) : user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground hidden sm:block">
                {user.email}
              </span>
              <Button variant="outline" size="sm" onClick={signOut}>
                Sign Out
              </Button>
            </div>
          ) : (
            <Button asChild>
              <Link to="/auth">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
