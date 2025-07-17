import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Building2,
  Shield,
  Users,
  BarChart3,
  Loader2,
} from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!email || !password) {
      setError("Please fill in all fields");
      setIsSubmitting(false);
      return;
    }

    const result = await login(email, password);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Login failed");
    }

    setIsSubmitting(false);
  };

  const features = [
    {
      icon: Building2,
      title: "Multi-Store Management",
      description: "Manage multiple store locations from one dashboard",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Get insights into sales, customers, and market trends",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Coordinate with vendors, staff, and stakeholders",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security for your business data",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex">
      {/* Left Side - Features */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary"></div>
        <div className="relative z-10 flex flex-col justify-center p-12 text-primary-foreground">
          <div
            className={cn(
              "transform transition-all duration-1000 ease-out",
              mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
            )}
          >
            <h1 className="text-4xl font-bold mb-4">AdminPanel</h1>
            <p className="text-xl opacity-90 mb-12">
              Complete business management solution for modern enterprises
            </p>
          </div>

          <div className="space-y-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={cn(
                  "flex items-start space-x-4 transform transition-all duration-1000 ease-out",
                  mounted
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-8 opacity-0",
                )}
                style={{
                  transitionDelay: `${(index + 1) * 200}ms`,
                }}
              >
                <div className="p-2 bg-primary-foreground/10 rounded-lg">
                  <feature.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm opacity-80">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 right-20 w-24 h-24 bg-white rounded-full animate-pulse delay-300"></div>
          <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-white rounded-full animate-pulse delay-700"></div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div
          className={cn(
            "w-full max-w-md transform transition-all duration-1000 ease-out",
            mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          )}
        >
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              AdminPanel
            </h1>
            <p className="text-muted-foreground">Sign in to your account</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
            <div className="hidden lg:block text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Welcome Back
              </h2>
              <p className="text-muted-foreground">
                Sign in to access your admin dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                  {error}
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    placeholder="Enter your password"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    disabled={isSubmitting}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Demo Credentials */}
              <div className="bg-muted/50 rounded-lg p-4 text-sm">
                <p className="text-foreground font-medium mb-2">
                  Demo Credentials:
                </p>
                <div className="space-y-1 text-muted-foreground">
                  <p>
                    <span className="font-medium">Admin:</span>{" "}
                    admin@company.com / admin123
                  </p>
                  <p>
                    <span className="font-medium">Manager:</span>{" "}
                    manager@company.com / manager123
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full relative overflow-hidden bg-primary text-primary-foreground font-medium py-3 px-4 rounded-lg",
                  "transform transition-all duration-200 ease-out",
                  "hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]",
                  "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                  "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
                  "group",
                )}
              >
                <span
                  className={cn(
                    "flex items-center justify-center transition-all duration-300",
                    isSubmitting ? "opacity-0" : "opacity-100",
                  )}
                >
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>

                {/* Loading State */}
                {isSubmitting && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                )}

                {/* Ripple Effect */}
                <div className="absolute inset-0 -top-3 -left-3 bg-primary-foreground opacity-0 group-active:opacity-20 rounded-full scale-0 group-active:scale-150 transition-all duration-500"></div>
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center text-sm text-muted-foreground">
              <p>© 2024 AdminPanel. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
