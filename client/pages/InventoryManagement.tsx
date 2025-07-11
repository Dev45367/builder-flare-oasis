import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Building2,
  Tag,
  Calendar,
  DollarSign,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface InventoryItem {
  id: number;
  name: string;
  sku: string;
  category: string;
  store: string;
  quantity: number;
  minStock: number;
  maxStock: number;
  cost: number;
  sellPrice: number;
  supplier: string;
  lastUpdated: string;
  status: "in-stock" | "low-stock" | "out-of-stock";
}

const mockInventory: InventoryItem[] = [
  {
    id: 1,
    name: "Premium Coffee Beans",
    sku: "PCB-001",
    category: "Food & Beverage",
    store: "Downtown Store",
    quantity: 45,
    minStock: 20,
    maxStock: 100,
    cost: 12.99,
    sellPrice: 24.99,
    supplier: "Fresh Roast Co.",
    lastUpdated: "2024-01-15",
    status: "in-stock",
  },
  {
    id: 2,
    name: "Wireless Headphones",
    sku: "WH-002",
    category: "Electronics",
    store: "Tech Hub",
    quantity: 8,
    minStock: 15,
    maxStock: 50,
    cost: 89.99,
    sellPrice: 149.99,
    supplier: "Tech Solutions Inc.",
    lastUpdated: "2024-01-14",
    status: "low-stock",
  },
  {
    id: 3,
    name: "Organic Pasta",
    sku: "OP-003",
    category: "Food & Beverage",
    store: "Food Court",
    quantity: 0,
    minStock: 30,
    maxStock: 120,
    cost: 3.49,
    sellPrice: 6.99,
    supplier: "Organic Foods Ltd.",
    lastUpdated: "2024-01-13",
    status: "out-of-stock",
  },
  {
    id: 4,
    name: "Designer T-Shirt",
    sku: "DT-004",
    category: "Clothing",
    store: "Mall Location",
    quantity: 23,
    minStock: 10,
    maxStock: 80,
    cost: 15.99,
    sellPrice: 39.99,
    supplier: "Fashion Forward",
    lastUpdated: "2024-01-15",
    status: "in-stock",
  },
];

const categories = [
  "All Categories",
  "Food & Beverage",
  "Electronics",
  "Clothing",
  "Home & Garden",
];
const stores = [
  "All Stores",
  "Downtown Store",
  "Tech Hub",
  "Food Court",
  "Mall Location",
];

export default function InventoryManagement() {
  const [inventory, setInventory] = useState(mockInventory);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [storeFilter, setStoreFilter] = useState("All Stores");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  const [newItem, setNewItem] = useState({
    name: "",
    sku: "",
    category: "",
    store: "",
    quantity: 0,
    minStock: 0,
    maxStock: 0,
    cost: 0,
    sellPrice: 0,
    supplier: "",
  });

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "All Categories" || item.category === categoryFilter;
    const matchesStore =
      storeFilter === "All Stores" || item.store === storeFilter;
    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStore && matchesStatus;
  });

  const handleAddItem = () => {
    const status =
      newItem.quantity === 0
        ? "out-of-stock"
        : newItem.quantity <= newItem.minStock
          ? "low-stock"
          : "in-stock";

    const item: InventoryItem = {
      id: Date.now(),
      ...newItem,
      lastUpdated: new Date().toISOString().split("T")[0],
      status,
    };

    setInventory([...inventory, item]);
    setNewItem({
      name: "",
      sku: "",
      category: "",
      store: "",
      quantity: 0,
      minStock: 0,
      maxStock: 0,
      cost: 0,
      sellPrice: 0,
      supplier: "",
    });
    setShowAddModal(false);
  };

  const handleDeleteItem = (id: number) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-stock":
        return "bg-green-500/10 text-green-400";
      case "low-stock":
        return "bg-yellow-500/10 text-yellow-400";
      case "out-of-stock":
        return "bg-red-500/10 text-red-400";
      default:
        return "bg-gray-500/10 text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "in-stock":
        return <TrendingUp className="h-3 w-3" />;
      case "low-stock":
        return <AlertTriangle className="h-3 w-3" />;
      case "out-of-stock":
        return <TrendingDown className="h-3 w-3" />;
      default:
        return <Package className="h-3 w-3" />;
    }
  };

  const stats = [
    {
      name: "Total Items",
      value: inventory.length.toString(),
      icon: Package,
      color: "text-blue-400",
    },
    {
      name: "In Stock",
      value: inventory
        .filter((item) => item.status === "in-stock")
        .length.toString(),
      icon: TrendingUp,
      color: "text-green-400",
    },
    {
      name: "Low Stock",
      value: inventory
        .filter((item) => item.status === "low-stock")
        .length.toString(),
      icon: AlertTriangle,
      color: "text-yellow-400",
    },
    {
      name: "Out of Stock",
      value: inventory
        .filter((item) => item.status === "out-of-stock")
        .length.toString(),
      icon: TrendingDown,
      color: "text-red-400",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Inventory Management
          </h1>
          <p className="text-gray-400 mt-2">
            Track and manage your inventory across all stores
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Item
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-admin-card border border-admin-card-border rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">{stat.name}</p>
                <p className="text-2xl font-bold text-white mt-1">
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

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-admin-card border border-admin-card-border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-admin-card border border-admin-card-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            value={storeFilter}
            onChange={(e) => setStoreFilter(e.target.value)}
            className="px-3 py-2 bg-admin-card border border-admin-card-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {stores.map((store) => (
              <option key={store} value={store}>
                {store}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-admin-card border border-admin-card-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Status</option>
            <option value="in-stock">In Stock</option>
            <option value="low-stock">Low Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-admin-card border border-admin-card-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-admin-nav border-b border-admin-card-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Store
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Pricing
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-card-border">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-admin-nav-hover">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-white">
                        {item.name}
                      </div>
                      <div className="text-sm text-gray-400">
                        SKU: {item.sku}
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.category}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Building2 className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-white">{item.store}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-white">
                        {item.quantity} units
                      </div>
                      <div className="text-xs text-gray-400">
                        Min: {item.minStock} | Max: {item.maxStock}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-white">
                        Sell: ${item.sellPrice}
                      </div>
                      <div className="text-xs text-gray-400">
                        Cost: ${item.cost}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                        getStatusColor(item.status),
                      )}
                    >
                      {getStatusIcon(item.status)}
                      <span className="ml-1">
                        {item.status.replace("-", " ")}
                      </span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-400 hover:text-white">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-gray-400 hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-admin-card border border-admin-card-border rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">
                Add New Inventory Item
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-admin-nav border border-admin-card-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  SKU
                </label>
                <input
                  type="text"
                  value={newItem.sku}
                  onChange={(e) =>
                    setNewItem({ ...newItem, sku: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-admin-nav border border-admin-card-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter SKU"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={newItem.category}
                  onChange={(e) =>
                    setNewItem({ ...newItem, category: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-admin-nav border border-admin-card-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select category</option>
                  {categories.slice(1).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Store
                </label>
                <select
                  value={newItem.store}
                  onChange={(e) =>
                    setNewItem({ ...newItem, store: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-admin-nav border border-admin-card-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select store</option>
                  {stores.slice(1).map((store) => (
                    <option key={store} value={store}>
                      {store}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Current Quantity
                </label>
                <input
                  type="number"
                  value={newItem.quantity}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      quantity: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 bg-admin-nav border border-admin-card-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Supplier
                </label>
                <input
                  type="text"
                  value={newItem.supplier}
                  onChange={(e) =>
                    setNewItem({ ...newItem, supplier: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-admin-nav border border-admin-card-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter supplier name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Min Stock Level
                </label>
                <input
                  type="number"
                  value={newItem.minStock}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      minStock: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 bg-admin-nav border border-admin-card-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Max Stock Level
                </label>
                <input
                  type="number"
                  value={newItem.maxStock}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      maxStock: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 bg-admin-nav border border-admin-card-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Cost Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={newItem.cost}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      cost: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 bg-admin-nav border border-admin-card-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Sell Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={newItem.sellPrice}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      sellPrice: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 bg-admin-nav border border-admin-card-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddItem}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
