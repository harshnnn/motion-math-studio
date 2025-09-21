// Add typing for admin_get_projects, admin_update_project, admin_get_dashboard, and admin_get_quick_estimates
declare module '@supabase/supabase-js' {
  interface SupabaseClient {
    rpc(
      fn: 'admin_get_projects',
      params: {}
    ): Promise<{ data: any; error: any }>;
    rpc(
      fn: 'admin_update_project',
      params: {
        p_id: string;
        p_final_price?: number | null;
        p_status?: string | null;
        p_notes?: string | null;
      }
    ): Promise<{ data: any; error: any }>;
    rpc(fn:'admin_get_dashboard', params:{}): Promise<{ data:any; error:any }>;
    rpc(fn:'admin_get_quick_estimates', params:{}): Promise<{ data:any; error:any }>;
    rpc(fn:'admin_get_requests', params:{}): Promise<{ data:any; error:any }>;
    rpc(fn:'admin_update_project_status', params:{ p_id:string; p_status:string }): Promise<{ data:any; error:any }>;
  }
}
