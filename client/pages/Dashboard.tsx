import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  Package,
  Star,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeDemo } from "@/components/ThemeDemo";

const stats = [
  {
    name: "Total Revenue",
    value: "$124,563",
    change: "+12.5%",
    changeType: "increase",
    icon: TrendingUp,
  },
  {
    name: "Active Stores",
    value: "23",
    change: "+2",
    changeType: "increase",
    icon: Building2,
  },
  {
    name: "Total Orders",
    value: "1,849",
    change: "+8.2%",
    changeType: "increase",
    icon: ShoppingCart,
  },
  {
    name: "Avg Rating",
    value: "4.8",
    change: "-0.1",
    changeType: "decrease",
    icon: Star,
  },
];

const recentActivity = [
  {
    id: 1,
    type: "order",
    message: "New order #1234 received from Downtown Store",
    time: "2 minutes ago",
    amount: "$89.99",
  },
  {
    id: 2,
    type: "review",
    message: "5-star review received for Italian Restaurant",
    time: "15 minutes ago",
    rating: 5,
  },
  {
    id: 3,
    type: "vendor",
    message: "New vendor application submitted",
    time: "1 hour ago",
    vendor: "Fresh Foods Inc.",
  },
  {
    id: 4,
    type: "store",
    message: "Store 'Tech Hub' updated inventory",
    time: "2 hours ago",
    items: 47,
  },
];

const topStores = [
  { name: "Downtown Store", revenue: "$12,450", orders: 89, rating: 4.9 },
  { name: "Mall Location", revenue: "$10,230", orders: 76, rating: 4.8 },
  { name: "Tech Hub", revenue: "$8,890", orders: 65, rating: 4.7 },
  { name: "Food Court", revenue: "$7,560", orders: 54, rating: 4.6 },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-gray-400 mt-2">
          Welcome back! Here's what's happening with your business.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-admin-card border border-admin-card-border rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">{stat.name}</p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {stat.value}
                </p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <span
                className={cn(
                  "flex items-center text-sm font-medium",
                  stat.changeType === "increase"
                    ? "text-green-400"
                    : "text-red-400",
                )}
              >
                {stat.changeType === "increase" ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                {stat.change}
              </span>
              <span className="text-gray-500 text-sm ml-2">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-admin-card border border-admin-card-border rounded-xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-4 p-4 hover:bg-admin-nav-hover rounded-lg transition-colors"
                >
                  <div className="p-2 bg-primary/10 rounded-lg">
                    {activity.type === "order" && (
                      <ShoppingCart className="h-4 w-4 text-primary" />
                    )}
                    {activity.type === "review" && (
                      <Star className="h-4 w-4 text-primary" />
                    )}
                    {activity.type === "vendor" && (
                      <Users className="h-4 w-4 text-primary" />
                    )}
                    {activity.type === "store" && (
                      <Package className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">
                      {activity.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {activity.time}
                    </p>
                  </div>
                  <div className="text-right">
                    {activity.amount && (
                      <p className="text-sm font-medium text-green-400">
                        {activity.amount}
                      </p>
                    )}
                    {activity.rating && (
                      <div className="flex items-center">
                        {[...Array(activity.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-3 w-3 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                    )}
                    {activity.vendor && (
                      <p className="text-sm text-gray-400">{activity.vendor}</p>
                    )}
                    {activity.items && (
                      <p className="text-sm text-gray-400">
                        {activity.items} items
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performing Stores */}
        <div>
          <div className="bg-admin-card border border-admin-card-border rounded-xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Top Performing Stores
            </h2>
            <div className="space-y-4">
              {topStores.map((store, index) => (
                <div
                  key={store.name}
                  className="flex items-center justify-between p-3 hover:bg-admin-nav-hover rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {store.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {store.orders} orders
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">
                      {store.revenue}
                    </p>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                      <span className="text-xs text-gray-400">
                        {store.rating}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-admin-card border border-admin-card-border rounded-xl p-6">
        <h2 className="text-xl font-semibold text-foreground mb-6">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: "Add New Store", icon: Building2, href: "/stores/new" },
            { name: "Create Product", icon: Package, href: "/products/new" },
            { name: "Invite Vendor", icon: Users, href: "/vendors-staff/new" },
            { name: "View Analytics", icon: BarChart3, href: "/analytics" },
          ].map((action) => (
            <button
              key={action.name}
              className="flex items-center space-x-3 p-4 bg-admin-nav hover:bg-admin-nav-hover rounded-lg transition-colors group"
            >
              <action.icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-foreground">
                {action.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
