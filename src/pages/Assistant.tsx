import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Sparkles, Send, ShoppingBag, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { dishes, Dish } from "@/data/dishes";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

type Msg = {
  id: string;
  role: "user" | "assistant";
  text: string;
  suggestions?: Dish[];
  actions?: { label: string; intent: string }[];
};

const fmt = (n: number) => `$${n.toFixed(2)}`;

const findDishes = (q: string): Dish[] => {
  const lower = q.toLowerCase();
  const budgetMatch = lower.match(/\$?(\d{1,3})/);
  const budget = budgetMatch ? parseInt(budgetMatch[1], 10) : undefined;

  let pool = dishes.slice();
  const tagMap: Record<string, (d: Dish) => boolean> = {
    spicy: (d) => d.tags.includes("spicy"),
    healthy: (d) => d.tags.includes("healthy") || d.tags.includes("light"),
    light: (d) => d.tags.includes("light"),
    vegan: (d) => d.tags.includes("vegan"),
    vegetarian: (d) => d.tags.includes("vegetarian") || d.tags.includes("vegan"),
    cozy: (d) => d.tags.includes("comfort"),
    comfort: (d) => d.tags.includes("comfort"),
    fast: (d) => d.prepMinutes <= 20,
    quick: (d) => d.prepMinutes <= 20,
    premium: (d) => d.tags.includes("premium") || d.tags.includes("gourmet"),
    chef: (d) => d.rating >= 4.8,
    salad: (d) => d.category === "Salads",
    pasta: (d) => d.category === "Pasta",
    bbq: (d) => d.category === "BBQ",
    wings: (d) => d.category === "Wings",
    taco: (d) => d.category === "Tacos",
    fish: (d) => d.tags.includes("pescatarian"),
  };
  const matched = Object.keys(tagMap).filter((k) => lower.includes(k));
  if (matched.length) pool = pool.filter((d) => matched.every((m) => tagMap[m](d)));
  if (budget) pool = pool.filter((d) => d.price <= budget);
  pool.sort((a, b) => b.rating - a.rating);
  return pool.slice(0, 3);
};

const reply = (q: string, ctx: { lastOrderId?: string }): Msg => {
  const lower = q.toLowerCase();
  if (/track|where.*order|delivery status/.test(lower)) {
    return {
      id: crypto.randomUUID(),
      role: "assistant",
      text: ctx.lastOrderId
        ? `Your most recent order ${ctx.lastOrderId} is being prepared.`
        : "You don't have an active order yet. Want me to suggest something?",
      actions: ctx.lastOrderId
        ? [{ label: "Track my order", intent: "track" }]
        : [{ label: "Suggest dinner", intent: "Suggest a cozy dinner under $25" }],
    };
  }
  const picks = findDishes(q);
  if (picks.length === 0) {
    return { id: crypto.randomUUID(), role: "assistant", text: "I couldn't find a perfect match. Try a vibe (cozy, spicy, healthy), cuisine, or budget." };
  }
  const top = picks[0];
  return {
    id: crypto.randomUUID(),
    role: "assistant",
    text: `Based on "${q}", I'd start with **${top.title}** (${fmt(top.price)}) — ${top.description.toLowerCase()}. Top picks:`,
    suggestions: picks,
  };
};

const renderMd = (text: string) =>
  text.split(/(\*\*[^*]+\*\*)/g).map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? (
      <strong key={i} className="text-primary font-semibold">{p.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{p}</span>
    )
  );

const Assistant = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { addItem, orders, items } = useCart();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Hi! I'm your Forkful concierge. Tell me your craving, dietary needs, or budget — I'll plate the perfect order.",
      actions: [
        { label: "Cozy dinner under $25", intent: "Cozy dinner under $25" },
        { label: "Healthy & light", intent: "Healthy and light meal" },
        { label: "Surprise me", intent: "Surprise me chef pick" },
      ],
    },
  ]);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = (raw?: string) => {
    const text = (raw ?? input).trim();
    if (!text) return;
    setMessages((m) => [...m, { id: crypto.randomUUID(), role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, reply(text, { lastOrderId: orders[0]?.id })]);
      setTyping(false);
    }, 600);
  };

  const seededRef = useRef(false);
  useEffect(() => {
    if (seededRef.current) return;
    const q = params.get("q");
    if (q) {
      seededRef.current = true;
      send(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAction = (intent: string) => {
    if (intent === "track" && orders[0]) {
      navigate(`/orders/${orders[0].id}`);
      return;
    }
    send(intent);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-primary grid place-items-center">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-heading font-bold text-lg leading-tight">Forkful Concierge</h1>
          <p className="text-xs text-muted-foreground">AI-powered food, order & delivery assistant</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 py-2">
        {messages.map((m) =>
          m.role === "user" ? (
            <div key={m.id} className="flex justify-end">
              <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[80%] text-sm">{m.text}</div>
            </div>
          ) : (
            <div key={m.id} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/15 grid place-items-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 space-y-3">
                <div className="text-sm leading-relaxed text-foreground/90">{renderMd(m.text)}</div>
                {m.suggestions && (
                  <div className="grid sm:grid-cols-3 gap-3">
                    {m.suggestions.map((d) => (
                      <div key={d.id} className="bg-card border border-border/30 rounded-xl overflow-hidden">
                        <button onClick={() => navigate(`/dish/${d.id}`)} className="block w-full aspect-[5/4] overflow-hidden">
                          <img src={d.image} alt={d.title} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                        </button>
                        <div className="p-3">
                          <div className="flex justify-between items-center mb-1">
                            <p className="font-semibold text-sm truncate">{d.title}</p>
                            <span className="text-xs text-primary font-semibold">{fmt(d.price)}</span>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{d.description}</p>
                          <Button size="sm" variant="recipe-primary" className="w-full h-8 rounded-full text-xs" onClick={() => { addItem(d); toast.success(`${d.title} added`); }}>
                            <ShoppingBag className="w-3.5 h-3.5" /> Add to cart
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {m.actions && (
                  <div className="flex flex-wrap gap-2">
                    {m.actions.map((a) => (
                      <button key={a.label} onClick={() => handleAction(a.intent)} className="text-xs px-3 py-1.5 rounded-full bg-secondary border border-border/40 hover:border-primary/40">
                        {a.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        )}
        {typing && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/15 grid place-items-center"><Sparkles className="w-4 h-4 text-primary" /></div>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.15s]" />
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.3s]" />
            </div>
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-border/40">
        <div className="flex gap-2 mb-2 overflow-x-auto scrollbar-hide">
          <button onClick={() => navigate("/cart")} className="flex-shrink-0 inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-secondary border border-border/40">
            <ShoppingBag className="w-3.5 h-3.5 text-primary" /> View cart ({items.length})
          </button>
          {orders[0] && (
            <button onClick={() => navigate(`/orders/${orders[0].id}`)} className="flex-shrink-0 inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-secondary border border-border/40">
              <Receipt className="w-3.5 h-3.5 text-primary" /> Track #{orders[0].id}
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask anything: 'spicy under $20'"
            className="flex-1 bg-card border border-border/40 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <Button variant="recipe-primary" className="rounded-full" onClick={() => send()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Assistant;