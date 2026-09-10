import { useRef, useEffect } from "react";
import { FoodCard } from "./FoodCard";
import { cn } from "@/lib/utils";

interface ScrollableCardsProps {
  cards: Array<{
    id?: string;
    image: string;
    title: string;
    description?: string;
    price?: number;
  }>;
  className?: string;
  cardSize?: "sm" | "md" | "lg";
  onCardClick?: (id: string) => void;
}

export const ScrollableCards = ({ 
  cards, 
  className, 
  cardSize = "md",
  onCardClick,
}: ScrollableCardsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const sizeClasses = {
    sm: "w-48 h-48",
    md: "w-64 h-64",
    lg: "w-80 h-80"
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // Allow pure horizontal tracks to consume vertical mouse wheel ticks
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollBy({
          left: e.deltaY * 1.5,
          behavior: "auto"
        });
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div 
      ref={scrollRef}
      className={cn(
        "w-full flex gap-6 overflow-x-auto scrollbar-hide pb-4",
        "overscroll-contain touch-pan-x",
        className
      )}
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      {cards.map((card, index) => (
        <div key={card.id || index} className="shrink-0 flex-shrink-0">
          <FoodCard
            image={card.image}
            title={card.title}
            description={card.description}
            price={card.price}
            onClick={card.id && onCardClick ? () => onCardClick(card.id!) : undefined}
            className={cn(
              sizeClasses[cardSize],
              "relative"
            )}
            imageClassName="aspect-square"
          />
        </div>
      ))}
    </div>
  );
};