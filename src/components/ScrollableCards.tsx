import { useEffect, useRef } from "react";
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
    const element = scrollRef.current;
    if (!element) return;

    const handleWheel = (e: WheelEvent) => {
      // If there is horizontal scrolling capacity, redirect deltaY to horizontal scroll
      if (element.scrollWidth > element.clientWidth) {
        const atStart = element.scrollLeft === 0 && (e.deltaY < 0 || e.deltaX < 0);
        const atEnd =
          element.scrollLeft + element.clientWidth >= element.scrollWidth - 1 &&
          (e.deltaY > 0 || e.deltaX > 0);

        // Always prevent page scroll while the cursor is inside the carousel
        e.preventDefault();

        // Convert vertical mouse wheel movement into horizontal scroll
        element.scrollLeft += e.deltaY !== 0 ? e.deltaY : e.deltaX;
      }
    };

    // { passive: false } is required to allow e.preventDefault()
    element.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      element.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div 
      ref={scrollRef}
      className={cn(
        "flex gap-6 overflow-x-auto scrollbar-hide pb-4",
        "snap-x snap-mandatory",
        "overscroll-x-contain touch-pan-x",
        className
      )}
    >
      {cards.map((card, index) => (
        <div key={card.id ?? index} className="flex-shrink-0 snap-start">
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