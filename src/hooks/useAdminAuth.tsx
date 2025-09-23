import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Extend Supabase types to include the 'admin_login' RPC
type AdminLoginParams = {
  p_username: string;
  p_password: string;
};

declare module '@supabase/supabase-js' {
  interface SupabaseClient {
    rpc(
      fn: 'admin_login',
      params: AdminLoginParams
    ): Promise<{ data: any; error: any }>;
  }
}

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
      const { data, error } = await supabase.rpc('admin_login', {
        p_username: username,
        p_password: password
      });
      if (error) throw error;
      if (!data || data.length === 0) {
        throw new Error('Invalid credentials');
      }
      const row = data[0];
      const adminUser = {
        id: row.id,
        username: row.username,
        email: row.email,
        last_login: row.last_login,
        is_active: true
      };
      // Ensure Supabase auth session (needed for RLS auth.uid())
      const sessionCheck = await supabase.auth.getSession();
      const currentEmail = sessionCheck.data.session?.user?.email;
      if (currentEmail?.toLowerCase() !== adminUser.email.toLowerCase()) {
        const { error: signInErr } = await supabase.auth.signInWithPassword({
          email: adminUser.email,
          password
        });
        if (signInErr) {
          console.warn('Supabase auth sign-in for admin failed:', signInErr.message);
          throw new Error('Admin auth session could not be established');
        }
      }
      setAdminUser(adminUser);
      localStorage.setItem('admin_user', JSON.stringify(adminUser));
      toast({
        title: "Welcome back!",
        description: "Signed in to admin panel.",
      });
      return { error: null };
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
