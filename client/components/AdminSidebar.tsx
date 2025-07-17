import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { SidebarThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import {
  BarChart3,
  Building2,
  FileText,
  Users,
  Package,
  MessageSquare,
  TrendingUp,
  Settings,
  Menu,
  X,
  ChevronDown,
  Home,
  Archive,
  LogOut,
} from "lucide-react";

const navigationItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    name: "Store Management",
    href: "/stores",
    icon: Building2,
  },
  {
    name: "Listings",
    href: "/listings",
    icon: FileText,
  },
  {
    name: "Vendors & Staff",
    href: "/vendors-staff",
    icon: Users,
  },
  {
    name: "Products & Pricing",
    href: "/products",
    icon: Package,
  },
  {
    name: "Inventory",
    href: "/inventory",
    icon: Archive,
  },
  {
    name: "Reviews & Feedback",
    href: "/reviews",
    icon: MessageSquare,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
    submenu: [
      { name: "Customer Analytics", href: "/analytics/customers" },
      { name: "Sales Analytics", href: "/analytics/sales" },
      { name: "Market Analytics", href: "/analytics/market" },
    ],
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

interface AdminSidebarProps {
  className?: string;
}

export function AdminSidebar({ className }: AdminSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const toggleSubmenu = (itemName: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemName)
        ? prev.filter((name) => name !== itemName)
        : [...prev, itemName],
    );
  };

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  const isSubmenuActive = (submenu: any[]) => {
    return submenu.some((item) => location.pathname === item.href);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    // Add a small delay for animation effect
    await new Promise((resolve) => setTimeout(resolve, 500));
    logout();
    setIsLoggingOut(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-admin-nav rounded-lg text-sidebar-foreground"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 h-full w-64 bg-admin-nav border-r border-admin-card-border z-40 transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          className,
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-admin-card-border">
            <h1 className="text-xl font-bold text-sidebar-foreground">
              AdminPanel
            </h1>
            <p className="text-sm text-sidebar-foreground/70 mt-1">
              Business Management
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.name}>
                  {item.submenu ? (
                    <div>
                      <button
                        onClick={() => toggleSubmenu(item.name)}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                          isSubmenuActive(item.submenu)
                            ? "bg-primary text-primary-foreground"
                            : "text-sidebar-foreground/80 hover:bg-admin-nav-hover hover:text-sidebar-foreground",
                        )}
                      >
                        <div className="flex items-center">
                          <item.icon className="mr-3 h-5 w-5" />
                          {item.name}
                        </div>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            expandedItems.includes(item.name)
                              ? "rotate-180"
                              : "",
                          )}
                        />
                      </button>
                      {expandedItems.includes(item.name) && (
                        <ul className="mt-2 ml-6 space-y-1">
                          {item.submenu.map((subitem) => (
                            <li key={subitem.name}>
                              <Link
                                to={subitem.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                  "block px-3 py-2 text-sm rounded-lg transition-colors",
                                  isActive(subitem.href)
                                    ? "bg-primary text-primary-foreground"
                                    : "text-sidebar-foreground/60 hover:bg-admin-nav-hover hover:text-sidebar-foreground",
                                )}
                              >
                                {subitem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                        isActive(item.href)
                          ? "bg-primary text-primary-foreground"
                          : "text-sidebar-foreground/80 hover:bg-admin-nav-hover hover:text-sidebar-foreground",
                      )}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Theme Toggle */}
          <div className="p-4 border-t border-admin-card-border">
            <SidebarThemeToggle />
          </div>

          {/* User info */}
          <div className="p-4 border-t border-admin-card-border">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-sidebar-foreground/60 truncate">
                  {user?.email || "user@example.com"}
                </p>
                <span className="inline-block px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full mt-1">
                  {user?.role || "user"}
                </span>
              </div>
            </div>

            {/* Animated Logout Button */}
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={cn(
                "w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ease-out group relative overflow-hidden",
                "text-sidebar-foreground/80 hover:bg-destructive/10 hover:text-destructive",
                "transform hover:scale-[1.02] active:scale-[0.98]",
                "focus:outline-none focus:ring-2 focus:ring-destructive/50",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
                isLoggingOut && "animate-pulse",
              )}
            >
              <div className="relative mr-3">
                <LogOut
                  className={cn(
                    "h-4 w-4 transition-all duration-300",
                    isLoggingOut
                      ? "animate-spin opacity-0"
                      : "group-hover:translate-x-0.5 opacity-100",
                  )}
                />
                {isLoggingOut && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              <span
                className={cn(
                  "transition-all duration-300",
                  isLoggingOut ? "opacity-60" : "group-hover:translate-x-1",
                )}
              >
                {isLoggingOut ? "Signing out..." : "Sign Out"}
              </span>

              {/* Ripple effect */}
              <div className="absolute inset-0 bg-destructive/20 rounded-lg scale-0 group-active:scale-100 opacity-0 group-active:opacity-100 transition-all duration-200"></div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
