import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  MapPin,
  Phone,
  Mail,
  Star,
  TrendingUp,
  Users,
  Package,
} from "lucide-react";
import { cn } from "@/lib/utils";

const stores = [
  {
    id: 1,
    name: "Downtown Store",
    address: "123 Main St, Downtown",
    phone: "(555) 123-4567",
    email: "downtown@store.com",
    manager: "John Smith",
    status: "active",
    revenue: "$12,450",
    orders: 89,
    rating: 4.9,
    staff: 12,
    products: 156,
  },
  {
    id: 2,
    name: "Mall Location",
    address: "456 Shopping Center, Mall District",
    phone: "(555) 987-6543",
    email: "mall@store.com",
    manager: "Sarah Johnson",
    status: "active",
    revenue: "$10,230",
    orders: 76,
    rating: 4.8,
    staff: 8,
    products: 134,
  },
  {
    id: 3,
    name: "Tech Hub",
    address: "789 Innovation Blvd, Tech District",
    phone: "(555) 456-7890",
    email: "tech@store.com",
    manager: "Mike Chen",
    status: "active",
    revenue: "$8,890",
    orders: 65,
    rating: 4.7,
    staff: 6,
    products: 89,
  },
  {
    id: 4,
    name: "Food Court",
    address: "321 Foodie Ave, Restaurant Row",
    phone: "(555) 789-0123",
    email: "food@store.com",
    manager: "Lisa Garcia",
    status: "pending",
    revenue: "$7,560",
    orders: 54,
    rating: 4.6,
    staff: 15,
    products: 67,
  },
];

export default function StoreManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedStore, setSelectedStore] = useState<number | null>(null);

  const filteredStores = stores.filter((store) => {
    const matchesSearch = store.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || store.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Store Management
          </h1>
          <p className="text-gray-400 mt-2">
            Manage your stores, locations, and performance
          </p>
        </div>
        <button className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          Add New Store
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search stores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-admin-card border border-admin-card-border rounded-lg text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-admin-card border border-admin-card-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            name: "Total Stores",
            value: stores.length.toString(),
            icon: Package,
            color: "text-blue-400",
          },
          {
            name: "Active Stores",
            value: stores
              .filter((s) => s.status === "active")
              .length.toString(),
            icon: TrendingUp,
            color: "text-green-400",
          },
          {
            name: "Total Staff",
            value: stores
              .reduce((acc, store) => acc + store.staff, 0)
              .toString(),
            icon: Users,
            color: "text-purple-400",
          },
          {
            name: "Avg Rating",
            value: (
              stores.reduce((acc, store) => acc + store.rating, 0) /
              stores.length
            ).toFixed(1),
            icon: Star,
            color: "text-yellow-400",
          },
        ].map((stat) => (
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
                <stat.icon className={cn("h-6 w-6", stat.color)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredStores.map((store) => (
          <div
            key={store.id}
            className="bg-admin-card border border-admin-card-border rounded-xl p-6 hover:border-primary/50 transition-colors cursor-pointer"
            onClick={() => setSelectedStore(store.id)}
          >
            {/* Store Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {store.name}
                </h3>
                <div className="flex items-center mt-1">
                  <span
                    className={cn(
                      "px-2 py-1 text-xs font-medium rounded-full",
                      store.status === "active"
                        ? "bg-green-500/10 text-green-400"
                        : store.status === "pending"
                          ? "bg-yellow-500/10 text-yellow-400"
                          : "bg-red-500/10 text-red-400",
                    )}
                  >
                    {store.status.charAt(0).toUpperCase() +
                      store.status.slice(1)}
                  </span>
                </div>
              </div>
              <button className="p-2 hover:bg-admin-nav-hover rounded-lg transition-colors">
                <MoreHorizontal className="h-4 w-4 text-gray-400" />
              </button>
            </div>

            {/* Store Info */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm text-gray-400">
                <MapPin className="h-4 w-4 mr-2" />
                {store.address}
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <Phone className="h-4 w-4 mr-2" />
                {store.phone}
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <Mail className="h-4 w-4 mr-2" />
                {store.email}
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <Users className="h-4 w-4 mr-2" />
                Manager: {store.manager}
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-admin-card-border">
              <div>
                <p className="text-xs text-gray-400">Revenue</p>
                <p className="text-sm font-medium text-foreground">
                  {store.revenue}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Orders</p>
                <p className="text-sm font-medium text-foreground">
                  {store.orders}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Rating</p>
                <div className="flex items-center">
                  <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                  <p className="text-sm font-medium text-foreground">
                    {store.rating}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400">Staff</p>
                <p className="text-sm font-medium text-foreground">
                  {store.staff}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredStores.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            No stores found
          </h3>
          <p className="text-gray-400 mb-4">
            Try adjusting your search terms or filters
          </p>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
