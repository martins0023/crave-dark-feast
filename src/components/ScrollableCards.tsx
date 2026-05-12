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