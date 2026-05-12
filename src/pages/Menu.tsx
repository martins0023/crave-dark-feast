import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus } from "lucide-react";
import { dishes, dishCategories } from "@/data/dishes";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const Menu = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof dishCategories)[number]>("All");
  const navigate = useNavigate();
  const { addItem } = useCart();

  const filtered = useMemo(() => {
    return dishes.filter((d) => {
      const matchCat = category === "All" || d.category === category;
      const q = query.toLowerCase();
      const matchQ =
        !q ||
        d.title.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.tags.some((t) => t.includes(q));
      return matchCat && matchQ;
    });
  }, [query, category]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-3">
          The <span className="text-primary">Menu</span>
        </h1>
        <p className="text-muted-foreground max-w-xl">
          Browse our chef-curated dishes, add favorites to your cart, and we'll
          deliver in under 35 minutes.
        </p>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search dishes, ingredients, tags..."
          className="w-full bg-card border border-border/40 rounded-full pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-3 mb-8 -mx-1 px-1">
        {dishCategories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              category === c
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-foreground/80 border-border/40 hover:border-primary/40"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">No dishes match your search.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((d) => (
            <div
              key={d.id}
              className="group bg-card border border-border/30 rounded-2xl overflow-hidden hover:border-primary/40 transition-all hover:-translate-y-1 hover:shadow-card"
            >
              <button
                onClick={() => navigate(`/dish/${d.id}`)}
                className="block w-full aspect-[5/4] overflow-hidden relative"
              >
                <img src={d.image} alt={d.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-semibold px-2.5 py-1 rounded-full">
                  ${d.price.toFixed(2)}
                </div>
              </button>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-base cursor-pointer hover:text-primary" onClick={() => navigate(`/dish/${d.id}`)}>
                    {d.title}
                  </h3>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">⭐ {d.rating}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{d.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{d.prepMinutes} min · {d.calories} kcal</span>
                  <Button
                    size="sm"
                    variant="recipe-primary"
                    className="rounded-full h-8"
                    onClick={() => {
                      addItem(d);
                      toast.success(`${d.title} added to cart`);
                    }}
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;