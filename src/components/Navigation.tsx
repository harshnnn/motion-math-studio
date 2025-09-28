import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import ThemeToggle from '@/components/ThemeToggle';

const Navigation = () => {
  const { user, loading, signOut } = useAuth();
  const location = useLocation();

  const handleHashNav = (e: React.MouseEvent, id: string) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="border-b border-border/50 bg-surface/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold bg-gradient-text bg-clip-text text-transparent">
          MathInMotion
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {user && (
            <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors">
              Dashboard
            </Link>
          )}
          <Link to="/estimate" className="text-foreground hover:text-primary transition-colors">
            Get Estimate
          </Link>
          <Link to="/request" className="text-foreground hover:text-primary transition-colors">
            Submit Request
          </Link>
          {/* New: smooth-scroll links */}
          <Link
            to="/#contract-plans"
            className="text-foreground hover:text-primary transition-colors"
            onClick={(e) => handleHashNav(e, 'contract-plans')}
          >
            View Contract Plans
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
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
