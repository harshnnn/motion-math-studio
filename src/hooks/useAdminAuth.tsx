import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type AdminLoginParams = { p_username: string; p_password: string; };

declare module '@supabase/supabase-js' {
  interface SupabaseClient {
    rpc(fn: 'admin_login', params: AdminLoginParams): Promise<{ data: any; error: any }>;
    rpc(fn: 'debug_admin_context'): Promise<{ data: any; error: any }>;
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
  signIn: (usernameOrEmail: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  lastCheck?: any;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  return ctx;
};

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastCheck, setLastCheck] = useState<any>(null);
  const { toast } = useToast();

  // Restore cached admin (UI convenience only; still re-validates later)
  useEffect(() => {
    try {
      const raw = localStorage.getItem('admin_user');
      if (raw) setAdminUser(JSON.parse(raw));
    } catch {
      localStorage.removeItem('admin_user');
    } finally {
      setLoading(false);
    }
  }, []);

  const ensureAuthSession = async (email: string, password: string) => {
    // If already signed in as that email, skip
    const sess = await supabase.auth.getSession();
    const currentEmail = sess.data.session?.user?.email;
    if (currentEmail && currentEmail.toLowerCase() === email.toLowerCase()) return;

    // Try normal sign-in
    const { error: signInErr } = await supabase.auth.signInWithPassword({ email, password });
    if (!signInErr) return;

    if (signInErr.message.toLowerCase().includes('invalid login')) {
      // Try creating the auth user (only if email confirmations disabled or you accept pending)
      const { error: signUpErr } = await supabase.auth.signUp({ email, password });
      if (signUpErr) throw new Error(`Auth user create failed: ${signUpErr.message}`);
      // Attempt sign-in again (may already be signed in if auto-confirm)
      const { error: secondErr } = await supabase.auth.signInWithPassword({ email, password });
      if (secondErr) {
        // If email confirmation required, session may not exist yet
        throw new Error('Check email to confirm admin account before continuing.');
      }
    } else {
      throw new Error(`Auth session error: ${signInErr.message}`);
    }
  };

  const verifyAdminMapping = async () => {
    const { data, error } = await supabase.rpc('debug_admin_context');
    if (error) throw new Error(`debug_admin_context failed: ${error.message}`);
    setLastCheck(data);
    if (!data?.is_admin) {
      throw new Error('Auth user not mapped to admin_users (user_id missing or mismatch).');
    }
  };

  const signIn = async (usernameOrEmail: string, password: string) => {
    setLoading(true);
    try {
      // 1. Custom table authentication
      const { data, error } = await supabase.rpc('admin_login', {
        p_username: usernameOrEmail,
        p_password: password
      });
      if (error) throw new Error(`admin_login failed: ${error.message}`);
      if (!data || data.length === 0) throw new Error('Invalid credentials');

      const row = data[0];
      const hydrated: AdminUser = {
        id: row.id,
        username: row.username,
        email: row.email,
        last_login: row.last_login,
        is_active: row.is_active
      };

      if (!hydrated.email) throw new Error('Admin row missing email.');

      // 2. Ensure Supabase auth session (so auth.uid() works for RLS)
      await ensureAuthSession(hydrated.email, password);

      // 3. Verify mapping (user_id in admin_users)
      await verifyAdminMapping();

      // 4. Cache in memory + local storage
      setAdminUser(hydrated);
      localStorage.setItem('admin_user', JSON.stringify(hydrated));

      toast({ title: 'Admin signed in', description: 'Privileges established.' });
      return { error: null };
    } catch (err: any) {
      setAdminUser(null);
      localStorage.removeItem('admin_user');
      toast({
        title: 'Admin sign-in failed',
        description: err.message || 'Unknown error',
        variant: 'destructive'
      });
      return { error: err };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
    } catch {
      /* ignore */
    } finally {
      setAdminUser(null);
      localStorage.removeItem('admin_user');
      toast({ title: 'Signed out', description: 'Admin session cleared.' });
      setLoading(false);
    }
  };

  const value: AdminAuthContextType = {
    adminUser,
    loading,
    signIn,
    signOut,
    isAuthenticated: !!adminUser,
    lastCheck
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
