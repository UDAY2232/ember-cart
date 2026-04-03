import { motion } from "framer-motion";
import { Package, Clock, CheckCircle, Truck as TruckIcon } from "lucide-react";
import { Link } from "react-router-dom";

const mockOrders = [
  {
    id: "ORD-001",
    date: "2024-03-15",
    total: 279.98,
    status: "Delivered",
    items: [
      { title: "Wireless Noise-Cancelling Headphones Pro", qty: 1, price: 249.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100" },
      { title: "Premium Cotton Crew Neck T-Shirt", qty: 1, price: 29.99, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100" },
    ],
  },
  {
    id: "ORD-002",
    date: "2024-03-20",
    total: 399.99,
    status: "Shipped",
    items: [
      { title: "Smart Watch Ultra Series 5", qty: 1, price: 399.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100" },
    ],
  },
  {
    id: "ORD-003",
    date: "2024-03-22",
    total: 59.99,
    status: "Pending",
    items: [
      { title: "Wireless Bluetooth Speaker", qty: 1, price: 59.99, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100" },
    ],
  },
];

const statusConfig: Record<string, { icon: typeof Package; color: string; step: number }> = {
  Pending: { icon: Clock, color: "text-primary", step: 1 },
  Shipped: { icon: TruckIcon, color: "text-primary", step: 2 },
  Delivered: { icon: CheckCircle, color: "text-success", step: 3 },
};

const OrderTimeline = ({ status }: { status: string }) => {
  const step = statusConfig[status]?.step || 0;
  const steps = ["Ordered", "Shipped", "Delivered"];
  return (
    <div className="flex items-center gap-1 mt-3">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-1 flex-1">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
            i < step ? "bg-success text-success-foreground" : i === step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}>
            {i < step ? "✓" : i + 1}
          </div>
          <span className={`text-[10px] ${i < step ? "text-success" : "text-muted-foreground"}`}>{s}</span>
          {i < steps.length - 1 && (
            <div className={`flex-1 h-0.5 rounded ${i < step ? "bg-success" : "bg-muted"}`} />
          )}
        </div>
      ))}
    </div>
  );
};

const Orders = () => (
  <div className="container py-8 max-w-3xl">
    <h1 className="text-2xl font-bold text-foreground mb-6">Your Orders</h1>
    {mockOrders.length === 0 ? (
      <div className="text-center py-16">
        <Package className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
        <p className="text-muted-foreground">No orders yet</p>
        <Link to="/products" className="text-primary text-sm mt-2 inline-block">Start Shopping</Link>
      </div>
    ) : (
      <div className="space-y-4">
        {mockOrders.map((order, i) => {
          const config = statusConfig[order.status];
          const Icon = config?.icon || Package;
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs text-muted-foreground">{order.id}</p>
                  <p className="text-xs text-muted-foreground">{order.date}</p>
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${config?.color}`}>
                  <Icon className="w-4 h-4" />
                  {order.status}
                </div>
              </div>
              {order.items.map((item) => (
                <div key={item.title} className="flex items-center gap-3 py-2 border-t border-border">
                  <img src={item.image} alt={item.title} className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.qty}</p>
                  </div>
                  <p className="text-sm font-semibold text-foreground">${item.price.toFixed(2)}</p>
                </div>
              ))}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="text-lg font-bold text-foreground">${order.total.toFixed(2)}</span>
              </div>
              <OrderTimeline status={order.status} />
            </motion.div>
          );
        })}
      </div>
    )}
  </div>
);

export default Orders;
