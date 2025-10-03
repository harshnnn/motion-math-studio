import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { AdminAuthProvider } from "@/hooks/useAdminAuth";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import EstimatePage from "./pages/EstimatePage";
import RequestPage from "./pages/RequestPage";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRequests from "./pages/admin/AdminRequests";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminClients from "./pages/admin/AdminClients";
import AdminTeam from "./pages/admin/AdminTeam";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminSupport from "./pages/admin/AdminSupport";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminContracts from "./pages/admin/AdminContracts";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";
import Terms from "./pages/policies/Terms";
import Refunds from "./pages/policies/Refunds";
import Shipping from "./pages/policies/Shipping";
import Contact from "./pages/policies/Contact";
import Privacy from "./pages/policies/Privacy";
import ContractRequestPage from "@/pages/ContractRequestPage";
import ThankYou from "@/pages/ThankYou";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AdminAuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/estimate" element={<EstimatePage />} />
                <Route path="/request" element={<RequestPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/contract" element={<ContractRequestPage />} />
                <Route path="/thank-you" element={<ThankYou />} />
                
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={
                  <AdminProtectedRoute>
                    <AdminLayout />
                  </AdminProtectedRoute>
                }>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="requests" element={<AdminRequests />} />
                  <Route path="projects" element={<AdminProjects />} />
                  <Route path="testimonials" element={<AdminTestimonials />} />
                  <Route path="contracts" element={<AdminContracts />} />
                  <Route path="clients" element={<AdminClients />} />
                  <Route path="support" element={<AdminSupport />} />
                  <Route path="team" element={<AdminTeam />} />
                  <Route path="payments" element={<AdminPayments />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>
                
                {/* Policy Routes */}
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/refunds" element={<Refunds />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/contact" element={<Contact />} />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AdminAuthProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
