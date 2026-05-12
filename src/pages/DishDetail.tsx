import { useNavigate, useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Clock, Flame, Star, Minus, Plus, ShoppingBag } from "lucide-react";
import { getDishById, dishes } from "@/data/dishes";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const DishDetail = () => {
  const { id } = useParams();
  const dish = id ? getDishById(id) : undefined;
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  if (!dish) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground mb-4">Dish not found.</p>
        <Link to="/menu" className="text-primary underline">Back to menu</Link>
      </div>
    );
  }

  const related = dishes.filter((d) => d.id !== dish.id && d.category === dish.category).slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div className="rounded-3xl overflow-hidden shadow-elegant">
          <img src={dish.image} alt={dish.title} className="w-full h-full object-cover aspect-square" />
        </div>

        <div>
          <span className="text-xs uppercase tracking-wider text-primary font-semibold">{dish.category}</span>
          <h1 className="font-heading text-3xl md:text-5xl font-bold mt-2 mb-4">{dish.title}</h1>
          <p className="text-muted-foreground text-lg mb-6">{dish.longDescription}</p>

          <div className="flex flex-wrap gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-secondary"><Star className="w-4 h-4 text-primary" /> {dish.rating}</span>
            <span className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-secondary"><Clock className="w-4 h-4 text-primary" /> {dish.prepMinutes} min</span>
            <span className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-secondary"><Flame className="w-4 h-4 text-primary" /> {dish.calories} kcal</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {dish.tags.map((t) => (
              <span key={t} className="text-xs px-2.5 py-1 rounded-full border border-border/40 text-muted-foreground">#{t}</span>
            ))}
          </div>

          <div className="flex items-center justify-between bg-card border border-border/30 rounded-2xl p-4 mb-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-6 text-center font-semibold">{qty}</span>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setQty((q) => q + 1)}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Total</p>
              <p className="text-2xl font-bold text-primary">${(dish.price * qty).toFixed(2)}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="recipe-primary" size="lg" className="rounded-full flex-1" onClick={() => { addItem(dish, qty); toast.success(`${qty} × ${dish.title} added`); }}>
              <ShoppingBag className="w-4 h-4" /> Add to cart
            </Button>
            <Button variant="recipe-outline" size="lg" className="rounded-full flex-1" onClick={() => { addItem(dish, qty); navigate("/checkout"); }}>
              Order now
            </Button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="font-heading text-2xl font-bold mb-6">You might also like</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link key={r.id} to={`/dish/${r.id}`} className="group bg-card border border-border/30 rounded-2xl overflow-hidden hover:border-primary/40 transition-all">
                <div className="aspect-[5/4] overflow-hidden">
                  <img src={r.image} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <span className="font-semibold">{r.title}</span>
                  <span className="text-primary font-semibold">${r.price.toFixed(2)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DishDetail;