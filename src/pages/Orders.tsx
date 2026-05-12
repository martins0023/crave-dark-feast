import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CheckCircle2, ChefHat, Truck, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

const STAGES = [
  { key: "preparing", label: "Preparing your meal", icon: ChefHat },
  { key: "out-for-delivery", label: "Out for delivery", icon: Truck },
  { key: "delivered", label: "Delivered", icon: CheckCircle2 },
] as const;

const Orders = () => {
  const { orders } = useCart();
  const { id } = useParams();

  if (orders.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="font-heading text-3xl font-bold mb-3">No orders yet</h1>
        <p className="text-muted-foreground mb-6">Your past and active orders will show up here.</p>
        <Link to="/menu"><Button variant="recipe-primary" className="rounded-full">Order something</Button></Link>
      </div>
    );
  }

  const focused = id ? orders.find((o) => o.id === id) : orders[0];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-8">Your Orders</h1>
      <div className="grid lg:grid-cols-[1fr_320px] gap-8">
        {focused && <OrderTracker key={focused.id} order={focused} />}
        <aside>
          <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">Recent</h3>
          <div className="space-y-2">
            {orders.map((o) => (
              <Link
                key={o.id}
                to={`/orders/${o.id}`}
                className={`block bg-card border rounded-xl p-3 transition-colors ${
                  focused?.id === o.id ? "border-primary" : "border-border/30 hover:border-primary/40"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-sm">#{o.id}</span>
                  <span className="text-xs text-primary">${o.total.toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{new Date(o.placedAt).toLocaleString()}</p>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

const OrderTracker = ({ order }: { order: ReturnType<typeof useCart>["orders"][number] }) => {
  const [stageIdx, setStageIdx] = useState(() => {
    const elapsed = (Date.now() - new Date(order.placedAt).getTime()) / 60000;
    if (elapsed > order.etaMinutes) return 2;
    if (elapsed > order.etaMinutes / 2) return 1;
    return 0;
  });

  useEffect(() => {
    if (stageIdx >= 2) return;
    const t = setTimeout(() => setStageIdx((s) => Math.min(2, s + 1)), 8000);
    return () => clearTimeout(t);
  }, [stageIdx]);

  return (
    <div className="bg-card border border-border/30 rounded-2xl p-6">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-xs text-muted-foreground">Order</p>
          <h2 className="font-heading text-2xl font-bold">#{order.id}</h2>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground inline-flex items-center gap-1"><Clock className="w-3 h-3" /> ETA</p>
          <p className="font-semibold">{order.etaMinutes} min</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <MapPin className="w-4 h-4 text-primary" /> {order.address}
      </div>

      <div className="relative mb-8">
        <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-border" />
        <div className="absolute left-5 top-5 w-0.5 bg-primary transition-all duration-700" style={{ height: `${stageIdx * 50}%` }} />
        <ul className="space-y-6 relative">
          {STAGES.map((s, i) => {
            const Icon = s.icon;
            const reached = i <= stageIdx;
            return (
              <li key={s.key} className="flex items-center gap-4">
                <span className={`w-10 h-10 rounded-full grid place-items-center border-2 transition-colors ${
                  reached ? "bg-primary border-primary text-primary-foreground" : "border-border bg-card text-muted-foreground"
                }`}>
                  <Icon className="w-4 h-4" />
                </span>
                <div>
                  <p className={`font-semibold ${reached ? "text-foreground" : "text-muted-foreground"}`}>{s.label}</p>
                  {i === stageIdx && i < 2 && <p className="text-xs text-primary">In progress…</p>}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="border-t border-border/40 pt-4">
        <h3 className="font-semibold mb-3">Items</h3>
        <div className="space-y-2 text-sm">
          {order.items.map((i) => (
            <div key={i.dish.id} className="flex justify-between">
              <span>{i.quantity} × {i.dish.title}</span>
              <span className="text-muted-foreground">${(i.dish.price * i.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold pt-2 border-t border-border/40">
            <span>Total</span><span className="text-primary">${order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;