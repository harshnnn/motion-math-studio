import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import ThemeToggle from '@/components/ThemeToggle';
import { useEffect, useState, useCallback } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const { user, loading, signOut } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleHashNav = useCallback((e: React.MouseEvent, id: string) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileOpen(false);
  }, [location.pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Close if viewport resized to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768 && mobileOpen) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [mobileOpen]);

  return (
    <header className="border-b border-border/50 bg-surface/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        <Link
          to="/"
            className="text-2xl font-bold bg-gradient-text bg-clip-text text-transparent"
          onClick={() => setMobileOpen(false)}
        >
          AlgoVisuals
        </Link>

        {/* Desktop Nav */}
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
          <Link
            to="/#contract-plans"
            className="text-foreground hover:text-primary transition-colors"
            onClick={(e) => handleHashNav(e, 'contract-plans')}
          >
            View Contract Plans
          </Link>
        </nav>

        {/* Right side (desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          {loading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
          ) : user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">{user.email}</span>
              <Button variant="outline" size="sm" onClick={signOut}>
                Sign Out
              </Button>
            </div>
          ) : (
            <Button asChild size="sm">
              <Link to="/auth">Sign In</Link>
            </Button>
          )}
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen(o => !o)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Panel */}
      <div
        id="mobile-nav"
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 border-t border-border/50 ${
          mobileOpen ? 'max-h-[500px]' : 'max-h-0'
        }`}
      >
        <nav className="px-4 pt-4 pb-6 space-y-4">
          {user && (
            <Link
              to="/dashboard"
              className="block text-foreground hover:text-primary"
              onClick={() => setMobileOpen(false)}
            >
              Dashboard
            </Link>
          )}
          <Link
            to="/estimate"
            className="block text-foreground hover:text-primary"
            onClick={() => setMobileOpen(false)}
          >
            Get Estimate
          </Link>
          <Link
            to="/request"
            className="block text-foreground hover:text-primary"
            onClick={() => setMobileOpen(false)}
          >
            Submit Request
          </Link>
          <Link
            to="/#contract-plans"
            className="block text-foreground hover:text-primary"
            onClick={(e) => handleHashNav(e, 'contract-plans')}
          >
            View Contract Plans
          </Link>

            <div className="pt-4 border-t border-border/40 space-y-3">
            {loading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
            ) : user ? (
              <>
                <div className="text-xs text-muted-foreground break-all">{user.email}</div>
                <Button variant="outline" size="sm" className="w-full" onClick={() => { signOut(); setMobileOpen(false); }}>
                  Sign Out
                </Button>
              </>
            ) : (
              <Button asChild size="sm" className="w-full" onClick={() => setMobileOpen(false)}>
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
