import { useNavigate } from "react-router-dom";
import { Sparkles, Send, Brain, Clock, Salad, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const examples = [
  { icon: Salad, label: "Light & healthy under $15" },
  { icon: Wallet, label: "Family dinner for 4 under $60" },
  { icon: Clock, label: "Something fast, under 20 min" },
  { icon: Brain, label: "Surprise me with a chef pick" },
];

const AIConciergeSection = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");

  const launch = (q?: string) => {
    const seed = (q ?? prompt).trim();
    navigate(`/assistant${seed ? `?q=${encodeURIComponent(seed)}` : ""}`);
  };

  return (
    <section className="mb-20 px-4">
      <div className="max-w-6xl mx-auto relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-card via-card to-dark-surface p-6 md:p-12 shadow-elegant">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />

        <div className="relative grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" /> AI Concierge
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4 leading-tight">
              Tell us your craving.<br />
              <span className="text-primary">We'll plate it.</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-6 max-w-lg">
              Forkful's AI concierge builds personalized meal picks, adds them to
              your cart, and tracks your delivery — all in one chat.
            </p>

            <div className="flex flex-col sm:flex-row gap-2 mb-5">
              <input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && launch()}
                placeholder="e.g. spicy dinner for two under $40"
                className="flex-1 bg-background/60 border border-border/40 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <Button variant="recipe-primary" className="rounded-full" onClick={() => launch()}>
                <Send className="w-4 h-4" /> Ask
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {examples.map((e) => (
                <button
                  key={e.label}
                  onClick={() => launch(e.label)}
                  className="inline-flex items-center gap-1.5 text-xs text-foreground/80 px-3 py-1.5 rounded-full bg-secondary/70 hover:bg-secondary border border-border/40 transition-colors"
                >
                  <e.icon className="w-3.5 h-3.5 text-primary" />
                  {e.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-background/50 backdrop-blur border border-border/40 rounded-2xl p-5 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary grid place-items-center text-xs">🙋</div>
              <div className="flex-1 bg-secondary/80 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm">
                I want something cozy for tonight, around $25.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary grid place-items-center text-primary-foreground">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex-1 bg-primary/10 border border-primary/20 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm">
                Try our <span className="text-primary font-semibold">Truffle Mac & Cheese</span> ($19) with a
                Garden Salad. Want me to add both to your cart?
              </div>
            </div>
            <div className="flex gap-2 pl-11">
              <button onClick={() => launch("Add truffle mac and cheese and garden salad")} className="text-xs px-3 py-1.5 rounded-full bg-primary text-primary-foreground font-semibold">
                Add to cart
              </button>
              <button onClick={() => launch("Show me other cozy picks")} className="text-xs px-3 py-1.5 rounded-full bg-secondary border border-border/40">
                Show alternatives
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIConciergeSection;