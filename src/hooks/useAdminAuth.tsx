import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AdminUser {
  id: string;
  username: string;
  email: string;
  last_login?: string;
  is_active: boolean;
}

interface AdminAuthContextType {
  adminUser: AdminUser | null;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for stored admin session
    const checkAdminSession = () => {
      const adminData = localStorage.getItem('admin_user');
      if (adminData) {
        try {
          const user = JSON.parse(adminData);
          setAdminUser(user);
        } catch (error) {
          localStorage.removeItem('admin_user');
        }
      }
      setLoading(false);
    };

    checkAdminSession();
  }, []);

  const signIn = async (username: string, password: string) => {
    try {
      setLoading(true);
      
      // Simple check - in production, implement proper hashing
      if (username === 'admin' && password === 'admin123') {
        const { data, error } = await supabase
          .from('admin_users')
          .select('*')
          .eq('username', username)
          .eq('is_active', true)
          .maybeSingle();

        if (error) throw error;

        // Update last login
        await supabase
          .from('admin_users')
          .update({ last_login: new Date().toISOString() })
          .eq('id', data.id);

        const adminUser = {
          id: data.id,
          username: data.username,
          email: data.email,
          last_login: data.last_login,
          is_active: data.is_active
        };

        setAdminUser(adminUser);
        localStorage.setItem('admin_user', JSON.stringify(adminUser));
        
        toast({
          title: "Welcome back!",
          description: "Successfully signed in to admin panel.",
        });

        return { error: null };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message || "Invalid username or password",
        variant: "destructive",
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setAdminUser(null);
    localStorage.removeItem('admin_user');
    toast({
      title: "Signed out",
      description: "You have been signed out of the admin panel.",
    });
  };

  const value = {
    adminUser,
    loading,
    signIn,
    signOut,
    isAuthenticated: !!adminUser,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
