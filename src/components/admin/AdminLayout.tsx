import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  ClipboardList, 
  FolderOpen, 
  UserCheck, 
  CreditCard, 
  Settings, 
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  Bell,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminLayout = () => {
  const { adminUser, signOut } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/requests', label: 'Client Requests', icon: ClipboardList },
    { path: '/admin/projects', label: 'Projects', icon: FolderOpen },
    { path: '/admin/testimonials', label: 'Testimonials', icon: ClipboardList },
    { path: '/admin/clients', label: 'Clients', icon: Users },
    { path: '/admin/support', label: 'Support Inbox', icon: MessageSquare },
    { path: '/admin/team', label: 'Team', icon: UserCheck },
    { path: '/admin/payments', label: 'Payments', icon: CreditCard },
    { path: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className={cn(
        "bg-card border-r transition-all duration-300 flex flex-col",
        sidebarOpen ? "w-64" : "w-16"
      )}>
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          {sidebarOpen && (
            <h1 className="text-lg font-semibold text-primary">Admin Panel</h1>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Button
                key={item.path}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  !sidebarOpen && "justify-center px-2"
                )}
                onClick={() => navigate(item.path)}
              >
                <Icon className={cn("h-4 w-4", sidebarOpen && "mr-2")} />
                {sidebarOpen && <span>{item.label}</span>}
              </Button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-muted-foreground",
              !sidebarOpen && "justify-center px-2"
            )}
            onClick={handleSignOut}
          >
            <LogOut className={cn("h-4 w-4", sidebarOpen && "mr-2")} />
            {sidebarOpen && <span>Sign Out</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-card border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold">
              {menuItems.find(item => item.path === location.pathname)?.label || 'Admin Panel'}
            </h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <div className="text-sm text-muted-foreground">
              Welcome, {adminUser?.username}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
