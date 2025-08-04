import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FoodCardProps {
  image: string;
  title: string;
  description?: string;
  className?: string;
  imageClassName?: string;
}

export const FoodCard = ({ 
  image, 
  title, 
  description, 
  className, 
  imageClassName 
}: FoodCardProps) => {
  return (
    <Card className={cn(
      "group overflow-hidden bg-card border-border/20 hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-card cursor-pointer",
      className
    )}>
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className={cn(
            "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110",
            imageClassName
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        {description && (
          <p className="text-sm text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            {description}
          </p>
        )}
      </div>
    </Card>
  );
};