import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, MapPin, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const Checkout = () => {
  const { items, subtotal, deliveryFee, total, placeOrder } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState("221B Baker St, Downtown");
  const [pay, setPay] = useState<"card" | "cash">("card");
  const [card, setCard] = useState({ number: "4242 4242 4242 4242", exp: "12/27", cvc: "123" });

  if (items.length === 0) {
    navigate("/menu", { replace: true });
    return null;
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) {
      toast.error("Please add a delivery address");
      return;
    }
    const order = placeOrder(address.trim());
    toast.success("Order placed!");
    navigate(`/orders/${order.id}`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-8">Checkout</h1>
      <form onSubmit={submit} className="grid lg:grid-cols-[1fr_360px] gap-8">
        <div className="space-y-6">
          <section className="bg-card border border-border/30 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-primary" />
              <h2 className="font-semibold">Delivery address</h2>
            </div>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={2}
              className="w-full bg-background border border-border/40 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </section>

          <section className="bg-card border border-border/30 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Truck className="w-4 h-4 text-primary" />
              <h2 className="font-semibold">Delivery option</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="border border-primary rounded-xl p-3 bg-primary/10">
                <p className="text-sm font-semibold">Standard · 25–35 min</p>
                <p className="text-xs text-muted-foreground">{deliveryFee === 0 ? "Free" : `$${deliveryFee.toFixed(2)}`}</p>
              </div>
              <div className="border border-border/40 rounded-xl p-3 opacity-60">
                <p className="text-sm font-semibold">Priority · 15–20 min</p>
                <p className="text-xs text-muted-foreground">+$4.99 (coming soon)</p>
              </div>
            </div>
          </section>

          <section className="bg-card border border-border/30 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-4 h-4 text-primary" />
              <h2 className="font-semibold">Payment</h2>
            </div>
            <div className="flex gap-2 mb-4">
              {(["card", "cash"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPay(p)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border ${
                    pay === p ? "bg-primary text-primary-foreground border-primary" : "bg-secondary border-border/40"
                  }`}
                >
                  {p === "card" ? "Card" : "Cash on delivery"}
                </button>
              ))}
            </div>
            {pay === "card" && (
              <div className="grid grid-cols-2 gap-3">
                <input value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })} placeholder="Card number" className="col-span-2 bg-background border border-border/40 rounded-xl p-3 text-sm" />
                <input value={card.exp} onChange={(e) => setCard({ ...card, exp: e.target.value })} placeholder="MM/YY" className="bg-background border border-border/40 rounded-xl p-3 text-sm" />
                <input value={card.cvc} onChange={(e) => setCard({ ...card, cvc: e.target.value })} placeholder="CVC" className="bg-background border border-border/40 rounded-xl p-3 text-sm" />
              </div>
            )}
          </section>
        </div>

        <aside className="bg-card border border-border/30 rounded-2xl p-5 h-fit lg:sticky lg:top-24">
          <h3 className="font-semibold text-lg mb-4">Summary</h3>
          <div className="space-y-2 text-sm mb-3 max-h-48 overflow-y-auto pr-2">
            {items.map((i) => (
              <div key={i.dish.id} className="flex justify-between gap-2">
                <span className="text-foreground/80 truncate">{i.quantity} × {i.dish.title}</span>
                <span className="text-muted-foreground">${(i.dish.price * i.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border/40 my-3" />
          <div className="space-y-1 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>{deliveryFee === 0 ? "Free" : `$${deliveryFee.toFixed(2)}`}</span></div>
          </div>
          <div className="border-t border-border/40 my-3" />
          <div className="flex justify-between font-bold text-lg mb-5">
            <span>Total</span><span className="text-primary">${total.toFixed(2)}</span>
          </div>
          <Button type="submit" variant="recipe-primary" className="w-full rounded-full">
            Place order · ${total.toFixed(2)}
          </Button>
        </aside>
      </form>
    </div>
  );
};

export default Checkout;