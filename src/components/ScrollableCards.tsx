import { FoodCard } from "./FoodCard";
import { cn } from "@/lib/utils";

interface ScrollableCardsProps {
  cards: Array<{
    image: string;
    title: string;
    description?: string;
  }>;
  className?: string;
  cardSize?: "sm" | "md" | "lg";
}

export const ScrollableCards = ({ 
  cards, 
  className, 
  cardSize = "md" 
}: ScrollableCardsProps) => {
  const sizeClasses = {
    sm: "w-48 h-48",
    md: "w-64 h-64",
    lg: "w-80 h-80"
  };

  return (
    <div className={cn(
      "flex gap-6 overflow-x-auto scrollbar-hide pb-4",
      "snap-x snap-mandatory",
      className
    )}>
      {cards.map((card, index) => (
        <div key={index} className="flex-shrink-0 snap-start">
          <FoodCard
            image={card.image}
            title={card.title}
            description={card.description}
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