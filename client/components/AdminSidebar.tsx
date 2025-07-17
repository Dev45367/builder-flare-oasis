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
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">
                  A
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-sidebar-foreground">
                  Admin User
                </p>
                <p className="text-xs text-sidebar-foreground/60">
                  admin@company.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
