import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "sidebar";
}

export function ThemeToggle({
  className,
  size = "md",
  variant = "default",
}: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  const iconSizes = {
    sm: 16,
    md: 18,
    lg: 20,
  };

  const variantClasses = {
    default:
      "bg-admin-card border border-admin-card-border hover:bg-admin-nav-hover",
    sidebar: "bg-transparent hover:bg-admin-nav-hover",
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative inline-flex items-center justify-center rounded-lg transition-all duration-200 ease-in-out",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      <div className="relative">
        {/* Sun icon for light mode */}
        <Sun
          size={iconSizes[size]}
          className={cn(
            "absolute transition-all duration-300 ease-in-out text-yellow-500",
            theme === "light"
              ? "rotate-0 scale-100 opacity-100"
              : "rotate-90 scale-0 opacity-0",
          )}
        />
        {/* Moon icon for dark mode */}
        <Moon
          size={iconSizes[size]}
          className={cn(
            "absolute transition-all duration-300 ease-in-out text-blue-400",
            theme === "dark"
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0",
          )}
        />
      </div>
    </button>
  );
}

// Alternative compact version for sidebar
export function SidebarThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
        "text-gray-300 hover:bg-admin-nav-hover hover:text-white",
        "group",
      )}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      <div className="relative mr-3 h-5 w-5">
        <Sun
          className={cn(
            "absolute h-5 w-5 transition-all duration-300 ease-in-out text-yellow-500",
            theme === "light"
              ? "rotate-0 scale-100 opacity-100"
              : "rotate-90 scale-0 opacity-0",
          )}
        />
        <Moon
          className={cn(
            "absolute h-5 w-5 transition-all duration-300 ease-in-out text-blue-400",
            theme === "dark"
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0",
          )}
        />
      </div>
      <span className="capitalize">{theme} Theme</span>
    </button>
  );
}

// Advanced toggle with more visual feedback
export function AdvancedThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={cn(
        "relative flex items-center p-1 bg-admin-card border border-admin-card-border rounded-lg",
        className,
      )}
    >
      {/* Background slider */}
      <div
        className={cn(
          "absolute top-1 bottom-1 w-8 bg-primary rounded-md transition-all duration-300 ease-in-out",
          theme === "light" ? "left-1" : "left-9",
        )}
      />

      {/* Light mode button */}
      <button
        onClick={() => toggleTheme()}
        className={cn(
          "relative z-10 flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200",
          theme === "light"
            ? "text-primary-foreground"
            : "text-gray-400 hover:text-gray-300",
        )}
        aria-label="Switch to light theme"
      >
        <Sun size={16} />
      </button>

      {/* Dark mode button */}
      <button
        onClick={() => toggleTheme()}
        className={cn(
          "relative z-10 flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200",
          theme === "dark"
            ? "text-primary-foreground"
            : "text-gray-400 hover:text-gray-300",
        )}
        aria-label="Switch to dark theme"
      >
        <Moon size={16} />
      </button>
    </div>
  );
}
