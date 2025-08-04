import { FoodCard } from "./FoodCard";
import { cn } from "@/lib/utils";

interface FoodGridProps {
  cards: Array<{
    image: string;
    title: string;
    description?: string;
  }>;
  className?: string;
  columns?: 2 | 3 | 4;
  cardSize?: "sm" | "md" | "lg";
}

export const FoodGrid = ({ 
  cards, 
  className, 
  columns = 3,
  cardSize = "md"
}: FoodGridProps) => {
  const gridClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
  };

  const sizeClasses = {
    sm: "h-48",
    md: "h-64",
    lg: "h-80"
  };

  return (
    <div className={cn(
      "grid gap-6",
      gridClasses[columns],
      className
    )}>
      {cards.map((card, index) => (
        <FoodCard
          key={index}
          image={card.image}
          title={card.title}
          description={card.description}
          className={cn(
            sizeClasses[cardSize],
            "relative"
          )}
          imageClassName="aspect-square"
        />
      ))}
    </div>
  );
};