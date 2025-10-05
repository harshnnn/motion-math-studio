import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { AdminAuthProvider } from "@/hooks/useAdminAuth";
import ErrorBoundary from "@/components/ErrorBoundary";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Suspense, lazy } from "react";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";

const IndexPage = lazy(() => import("./pages/Index"));
const AuthPage = lazy(() => import("./pages/Auth"));
const EstimatePage = lazy(() => import("./pages/EstimatePage"));
const RequestPage = lazy(() => import("./pages/RequestPage"));
const DashboardPage = lazy(() => import("./pages/Dashboard"));
const ContractRequestPage = lazy(() => import("@/pages/ContractRequestPage"));
const ThankYouPage = lazy(() => import("@/pages/ThankYou"));
const AlgorithmAnimationPage = lazy(() => import("@/pages/AlgorithmAnimation"));
const ShowcasePage = lazy(() => import("@/pages/Showcase"));

const AdminLoginPage = lazy(() => import("./pages/admin/AdminLogin"));
const AdminLayoutShell = lazy(() => import("./components/admin/AdminLayout"));
const AdminDashboardPage = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminRequestsPage = lazy(() => import("./pages/admin/AdminRequests"));
const AdminProjectsPage = lazy(() => import("./pages/admin/AdminProjects"));
const AdminClientsPage = lazy(() => import("./pages/admin/AdminClients"));
const AdminTeamPage = lazy(() => import("./pages/admin/AdminTeam"));
const AdminPaymentsPage = lazy(() => import("./pages/admin/AdminPayments"));
const AdminSettingsPage = lazy(() => import("./pages/admin/AdminSettings"));
const AdminSupportPage = lazy(() => import("./pages/admin/AdminSupport"));
const AdminTestimonialsPage = lazy(() => import("./pages/admin/AdminTestimonials"));
const AdminContractsPage = lazy(() => import("./pages/admin/AdminContracts"));

const TermsPage = lazy(() => import("./pages/policies/Terms"));
const RefundsPage = lazy(() => import("./pages/policies/Refunds"));
const ShippingPage = lazy(() => import("./pages/policies/Shipping"));
const ContactPage = lazy(() => import("./pages/policies/Contact"));
const PrivacyPage = lazy(() => import("./pages/policies/Privacy"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));

const SuspenseFallback = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-background text-muted-foreground">
    <LoadingSpinner size="lg" />
    <span className="text-sm uppercase tracking-[0.3em]">Loading</span>
  </div>
);

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
              <Suspense fallback={<SuspenseFallback />}>
                <Routes>
                  <Route path="/" element={<IndexPage />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/estimate" element={<EstimatePage />} />
                  <Route path="/request" element={<RequestPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/contract" element={<ContractRequestPage />} />
                  <Route path="/thank-you" element={<ThankYouPage />} />
                  <Route path="/algorithm-animation" element={<AlgorithmAnimationPage />} />
                  <Route path="/showcase" element={<ShowcasePage />} />

                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminLoginPage />} />
                  <Route
                    path="/admin"
                    element={
                      <AdminProtectedRoute>
                        <Suspense fallback={<SuspenseFallback />}>
                          <AdminLayoutShell />
                        </Suspense>
                      </AdminProtectedRoute>
                    }
                  >
                    <Route path="dashboard" element={<AdminDashboardPage />} />
                    <Route path="requests" element={<AdminRequestsPage />} />
                    <Route path="projects" element={<AdminProjectsPage />} />
                    <Route path="testimonials" element={<AdminTestimonialsPage />} />
                    <Route path="contracts" element={<AdminContractsPage />} />
                    <Route path="clients" element={<AdminClientsPage />} />
                    <Route path="support" element={<AdminSupportPage />} />
                    <Route path="team" element={<AdminTeamPage />} />
                    <Route path="payments" element={<AdminPaymentsPage />} />
                    <Route path="settings" element={<AdminSettingsPage />} />
                  </Route>

                  {/* Policy Routes */}
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/refunds" element={<RefundsPage />} />
                  <Route path="/shipping" element={<ShippingPage />} />
                  <Route path="/contact" element={<ContactPage />} />

                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </AdminAuthProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
