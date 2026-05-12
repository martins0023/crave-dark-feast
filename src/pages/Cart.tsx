import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

const Cart = () => {
  const { items, updateQty, removeItem, subtotal, deliveryFee, total } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-secondary grid place-items-center mx-auto mb-5">
          <ShoppingBag className="w-7 h-7 text-muted-foreground" />
        </div>
        <h1 className="font-heading text-3xl font-bold mb-3">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Browse the menu and add something delicious.</p>
        <Button variant="recipe-primary" className="rounded-full" onClick={() => navigate("/menu")}>
          Explore menu
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-8">Your Cart</h1>
      <div className="grid lg:grid-cols-[1fr_360px] gap-8">
        <div className="space-y-3">
          {items.map((i) => (
            <div key={i.dish.id} className="flex gap-4 bg-card border border-border/30 rounded-2xl p-3">
              <Link to={`/dish/${i.dish.id}`} className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                <img src={i.dish.image} alt={i.dish.title} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-2">
                  <Link to={`/dish/${i.dish.id}`} className="font-semibold hover:text-primary">{i.dish.title}</Link>
                  <button onClick={() => removeItem(i.dish.id)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">{i.dish.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2 bg-secondary rounded-full p-1">
                    <button onClick={() => updateQty(i.dish.id, i.quantity - 1)} className="w-7 h-7 grid place-items-center rounded-full hover:bg-background"><Minus className="w-3.5 h-3.5" /></button>
                    <span className="w-5 text-center text-sm font-semibold">{i.quantity}</span>
                    <button onClick={() => updateQty(i.dish.id, i.quantity + 1)} className="w-7 h-7 grid place-items-center rounded-full hover:bg-background"><Plus className="w-3.5 h-3.5" /></button>
                  </div>
                  <span className="font-semibold text-primary">${(i.dish.price * i.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="bg-card border border-border/30 rounded-2xl p-5 h-fit lg:sticky lg:top-24">
          <h3 className="font-semibold text-lg mb-4">Order summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>{deliveryFee === 0 ? "Free" : `$${deliveryFee.toFixed(2)}`}</span></div>
            {deliveryFee > 0 && (
              <p className="text-xs text-muted-foreground">Add ${(40 - subtotal).toFixed(2)} more for free delivery.</p>
            )}
          </div>
          <div className="border-t border-border/40 my-4" />
          <div className="flex justify-between font-bold text-lg mb-5">
            <span>Total</span><span className="text-primary">${total.toFixed(2)}</span>
          </div>
          <Button variant="recipe-primary" className="w-full rounded-full" onClick={() => navigate("/checkout")}>
            Checkout
          </Button>
        </aside>
      </div>
    </div>
  );
};

export default Cart;