import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

const STORAGE_KEY = 'theme';

export const ThemeToggle = ({ className }: { className?: string }) => {
  const [isLight, setIsLight] = useState(false);

  // Initialize from localStorage; default = dark (no .light class)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const light = stored === 'light';
      setIsLight(light);
      document.documentElement.classList.toggle('light', light);
    } catch {
      // ignore
    }
  }, []);

  const toggle = () => {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.classList.toggle('light', next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? 'light' : 'dark');
    } catch {
      // ignore
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={toggle}
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      className={className}
      title={isLight ? 'Dark mode' : 'Light mode'}
    >
      {isLight ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </Button>
  );
};

export default ThemeToggle;
