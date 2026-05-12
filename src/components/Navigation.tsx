import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, ShoppingBag, Sparkles, MapPin, Truck, UserRound, X, Home, UtensilsCrossed, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo-forkful.png";
import { useCart } from "@/context/CartContext";

const links = [
  { to: "/", label: "Home", icon: Home },
  { to: "/menu", label: "Menu", icon: UtensilsCrossed },
  { to: "/orders", label: "Orders", icon: Receipt },
  { to: "/assistant", label: "AI Concierge", icon: Sparkles },
];

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <img src={logo} alt="Forkful" className="h-8 w-auto" />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/15 text-primary"
                      : "text-foreground/80 hover:text-foreground hover:bg-secondary"
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          {/* Right side: location, cart, mobile trigger */}
          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-muted-foreground border border-border/40 rounded-full px-3 py-1.5">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              Deliver to <span className="text-foreground font-medium">Downtown</span>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => navigate("/cart")}
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 min-w-5 px-1 text-[10px] bg-primary text-primary-foreground border-0 flex items-center justify-center">
                  {itemCount}
                </Badge>
              )}
            </Button>

            <Button variant="recipe-primary" size="sm" className="hidden sm:inline-flex rounded-full" onClick={() => navigate("/menu")}>
              Order Now
            </Button>

            {/* Mobile drawer */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background border-border/40 w-[85vw] sm:w-[380px] p-0 flex flex-col">
                <SheetHeader className="p-5 border-b border-border/40 flex-row items-center justify-between space-y-0">
                  <SheetTitle className="flex items-center gap-2 text-left">
                    <img src={logo} alt="Forkful" className="h-7 w-auto" />
                  </SheetTitle>
                </SheetHeader>

                <div className="px-5 py-4 border-b border-border/40">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                    <div className="w-10 h-10 rounded-full bg-primary/15 grid place-items-center">
                      <UserRound className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Welcome, Guest</p>
                      <p className="text-xs text-muted-foreground">Sign in for faster checkout</p>
                    </div>
                  </div>
                </div>

                <nav className="flex-1 overflow-y-auto p-3">
                  {links.map((l) => (
                    <NavLink
                      key={l.to}
                      to={l.to}
                      end={l.to === "/"}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors",
                          isActive
                            ? "bg-primary/15 text-primary"
                            : "text-foreground/85 hover:bg-secondary"
                        )
                      }
                    >
                      <l.icon className="w-5 h-5" />
                      {l.label}
                    </NavLink>
                  ))}

                  <div className="my-3 border-t border-border/40" />

                  <NavLink
                    to="/cart"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium text-foreground/85 hover:bg-secondary"
                  >
                    <span className="flex items-center gap-3">
                      <ShoppingBag className="w-5 h-5" />
                      Cart
                    </span>
                    {itemCount > 0 && (
                      <Badge className="bg-primary text-primary-foreground border-0">{itemCount}</Badge>
                    )}
                  </NavLink>

                  <NavLink
                    to="/orders"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-foreground/85 hover:bg-secondary"
                  >
                    <Truck className="w-5 h-5" />
                    Track delivery
                  </NavLink>
                </nav>

                <div className="p-5 border-t border-border/40 space-y-2">
                  <Button
                    variant="recipe-primary"
                    className="w-full rounded-full"
                    onClick={() => {
                      setOpen(false);
                      navigate("/menu");
                    }}
                  >
                    Browse Menu
                  </Button>
                  <Button
                    variant="recipe-outline"
                    className="w-full rounded-full"
                    onClick={() => {
                      setOpen(false);
                      navigate("/assistant");
                    }}
                  >
                    <Sparkles className="w-4 h-4" /> Ask AI Concierge
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;