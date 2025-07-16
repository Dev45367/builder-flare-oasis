import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminSidebar } from "./components/AdminSidebar";
import Dashboard from "./pages/Dashboard";
import StoreManagement from "./pages/StoreManagement";
import InventoryManagement from "./pages/InventoryManagement";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";
import {
  FileText,
  Users,
  Package,
  MessageSquare,
  BarChart3,
  Settings,
  TrendingUp,
  Users2,
  ShoppingBag,
} from "lucide-react";

const queryClient = new QueryClient();

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="lg:ml-64 p-6 lg:p-8">{children}</main>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <AdminLayout>
                  <Dashboard />
                </AdminLayout>
              }
            />
            <Route
              path="/stores"
              element={
                <AdminLayout>
                  <StoreManagement />
                </AdminLayout>
              }
            />
            <Route
              path="/listings"
              element={
                <AdminLayout>
                  <PlaceholderPage
                    title="Listings Management"
                    description="Manage product listings, inventory, and catalog items"
                    icon={FileText}
                    features={[
                      "Product catalog management",
                      "Inventory tracking",
                      "Listing optimization",
                      "Bulk operations",
                      "Category management",
                    ]}
                  />
                </AdminLayout>
              }
            />
            <Route
              path="/vendors-staff"
              element={
                <AdminLayout>
                  <PlaceholderPage
                    title="Vendors & Staff Management"
                    description="Manage your vendors, staff members, and team permissions"
                    icon={Users}
                    features={[
                      "Vendor onboarding",
                      "Staff directory",
                      "Role-based permissions",
                      "Performance tracking",
                      "Communication tools",
                    ]}
                  />
                </AdminLayout>
              }
            />
            <Route
              path="/products"
              element={
                <AdminLayout>
                  <PlaceholderPage
                    title="Products & Pricing"
                    description="Manage products, pricing strategies, and promotional offers"
                    icon={Package}
                    features={[
                      "Product management",
                      "Dynamic pricing",
                      "Promotional campaigns",
                      "Price optimization",
                      "Inventory alerts",
                    ]}
                  />
                </AdminLayout>
              }
            />
            <Route
              path="/inventory"
              element={
                <AdminLayout>
                  <InventoryManagement />
                </AdminLayout>
              }
            />
            <Route
              path="/reviews"
              element={
                <AdminLayout>
                  <PlaceholderPage
                    title="Reviews & Feedback"
                    description="Monitor customer reviews, feedback, and satisfaction metrics"
                    icon={MessageSquare}
                    features={[
                      "Review monitoring",
                      "Sentiment analysis",
                      "Response management",
                      "Feedback trends",
                      "Reputation tracking",
                    ]}
                  />
                </AdminLayout>
              }
            />
            <Route
              path="/analytics"
              element={
                <AdminLayout>
                  <PlaceholderPage
                    title="Analytics Overview"
                    description="Comprehensive analytics and business intelligence"
                    icon={BarChart3}
                    features={[
                      "Real-time dashboards",
                      "Custom reports",
                      "Data visualization",
                      "Performance metrics",
                      "Export capabilities",
                    ]}
                  />
                </AdminLayout>
              }
            />
            <Route
              path="/analytics/customers"
              element={
                <AdminLayout>
                  <PlaceholderPage
                    title="Customer Analytics"
                    description="Deep insights into customer behavior and preferences"
                    icon={Users2}
                    features={[
                      "Customer segmentation",
                      "Behavior analysis",
                      "Lifetime value tracking",
                      "Churn prediction",
                      "Engagement metrics",
                    ]}
                  />
                </AdminLayout>
              }
            />
            <Route
              path="/analytics/sales"
              element={
                <AdminLayout>
                  <PlaceholderPage
                    title="Sales Analytics"
                    description="Track sales performance and revenue trends"
                    icon={TrendingUp}
                    features={[
                      "Revenue tracking",
                      "Sales forecasting",
                      "Performance by store",
                      "Product analysis",
                      "Seasonal trends",
                    ]}
                  />
                </AdminLayout>
              }
            />
            <Route
              path="/analytics/market"
              element={
                <AdminLayout>
                  <PlaceholderPage
                    title="Market Analytics"
                    description="Market trends, competition analysis, and opportunities"
                    icon={ShoppingBag}
                    features={[
                      "Market trends",
                      "Competitive analysis",
                      "Market share tracking",
                      "Opportunity identification",
                      "Industry benchmarks",
                    ]}
                  />
                </AdminLayout>
              }
            />
            <Route
              path="/settings"
              element={
                <AdminLayout>
                  <PlaceholderPage
                    title="Settings"
                    description="Configure your admin panel and business settings"
                    icon={Settings}
                    features={[
                      "User management",
                      "Security settings",
                      "Notification preferences",
                      "Integration settings",
                      "Backup & restore",
                    ]}
                  />
                </AdminLayout>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
