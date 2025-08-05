import { Button } from "@/components/ui/button";
import { FoodCard } from "@/components/FoodCard";
import { ScrollableCards } from "@/components/ScrollableCards";
import { FoodGrid } from "@/components/FoodGrid";
import Navigation from "@/components/Navigation";

// Import all the generated food images
import heroImage from "@/assets/hero-dish.jpg";
import chickenDinner from "@/assets/chicken-dinner.jpg";
import salmonDish from "@/assets/salmon-dish.jpg";
import freshSalad from "@/assets/fresh-salad.jpg";
import macCheese1 from "@/assets/mac-cheese-1.jpg";
import macCheese2 from "@/assets/mac-cheese-2.jpg";
import macCheese3 from "@/assets/mac-cheese-3.jpg";
import beefSteak from "@/assets/beef-steak.jpg";
import friedChicken from "@/assets/fried-chicken.jpg";
import fishTacos from "@/assets/fish-tacos.jpg";
import pastaCarbonara from "@/assets/pasta-carbonara.jpg";
import bbqRibs from "@/assets/bbq-ribs.jpg";
import vegetableStirFry from "@/assets/vegetable-stir-fry.jpg";
import chickenWings from "@/assets/chicken-wings.jpg";
import beefKebabs from "@/assets/beef-kebabs.jpg";
import appetizerSpread from "@/assets/appetizer-spread.jpg";
import { ArrowLeft, ArrowRight, ArrowRightIcon } from "lucide-react";

const Index = () => {
  const craveWorthyDishes = [
    {
      image: chickenDinner,
      title: "Juicy Chicken Dinner",
      description: "Perfectly roasted with herbs and spices"
    },
    {
      image: salmonDish,
      title: "Spicy Grilled Salmon",
      description: "Fresh Atlantic salmon with citrus glaze"
    },
    {
      image: freshSalad,
      title: "Fresh Garden Salad",
      description: "Crisp vegetables with house dressing"
    }
  ];

  const exploreMoreDishes = [
    { image: pastaCarbonara, title: "Pasta Carbonara", description: "Classic Italian comfort food" },
    { image: bbqRibs, title: "BBQ Ribs", description: "Smoky and tender ribs" },
    { image: vegetableStirFry, title: "Vegetable Stir Fry", description: "Fresh and healthy option" },
    { image: chickenWings, title: "Buffalo Wings", description: "Crispy and spicy wings" },
    { image: beefKebabs, title: "Beef Kebabs", description: "Grilled to perfection" },
    { image: fishTacos, title: "Fish Tacos", description: "Fresh and zesty flavors" }
  ];

  const macCheeseVariations = [
    {
      image: macCheese1,
      title: "Classic Mac & Cheese",
      description: "Traditional comfort food"
    },
    {
      image: macCheese2,
      title: "Baked Mac & Cheese",
      description: "With crispy breadcrumb topping"
    },
    {
      image: macCheese3,
      title: "Truffle Mac & Cheese",
      description: "Gourmet version with herbs"
    }
  ];

  const fanFavorites = [
    { image: beefSteak, title: "Grilled Steak", description: "Perfectly seasoned beef" },
    { image: friedChicken, title: "Fried Chicken", description: "Crispy golden perfection" },
    { image: bbqRibs, title: "BBQ Ribs", description: "Fall-off-the-bone tender" },
    { image: fishTacos, title: "Fish Tacos", description: "Fresh coastal flavors" },
    { image: chickenWings, title: "Buffalo Wings", description: "Spicy and satisfying" },
    { image: pastaCarbonara, title: "Pasta Carbonara", description: "Rich and creamy" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Header Section */}
      <header className="text-center py-16 px-4">
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-primary">
          88 All-Time <span className="text-white">Best Dinner
            <br /> Recipes to</span> <span className="text-primary">Savor</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Explore 88 of the best dinner recipes perfect with flavor, perfect for
          family dinners and special occasions.
        </p>
        <Button variant="recipe-primary" size="xl" className="font-normal rounded-full">
          See Them All
          <ArrowRightIcon className="text-white w-5 h-5" />
        </Button>
      </header>

      {/* Hero Section */}
      <section className="relative mb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-elegant">
            <img
              src={heroImage}
              alt="Elegant gourmet dish with wine glass and bokeh lights"
              className="w-full h-[400px] md:h-[600px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Crave-Worthy Dishes Section */}
      <section className="mb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              Crave-Worthy Dishes<br />
              <span className="text-muted-foreground text-2xl md:text-3xl">You'll Love</span>
            </h2>

            <div className="">
              <div>
                <p className="text-muted-foreground max-w-md text-left hidden md:block">
                  Discover crave-worthy dishes you'll love—easy to make,
                  full of flavor, and always satisfying.
                </p>
              </div>

              <div className="flex flex-row gap-4 justify-end">
                <div className="bg-gray-800 rounded-md p-3">
                  <ArrowLeft className="w-4 h-4" />
                </div>
                <div className="bg-primary rounded-md p-3">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

          </div>

          <ScrollableCards
            cards={craveWorthyDishes}
            cardSize="lg"
            className="px-2"
          />
        </div>
      </section>

      {/* Explore More Section */}
      <section className="mb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
            Explore More
          </h2>

          <FoodGrid
            cards={exploreMoreDishes}
            columns={3}
            cardSize="md"
          />
        </div>
      </section>

      {/* Ultimate Creamy Mac and Cheese Section */}
      <section className="mb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                Ultimate Creamy Mac<br />
                and Cheese
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Indulge in the ultimate comfort food with our rich and creamy mac and cheese
                recipe featuring multiple cheese varieties with crispy breadcrumb topping—a true
                family favorite that brings everyone together.
              </p>
              <ul className="text-muted-foreground mb-8 space-y-2">
                <li>• Rich, velvety cheese sauce</li>
                <li>• Comfort food made effortlessly delicious</li>
                <li>• Perfect as a side or main course</li>
              </ul>
              <Button variant="recipe-primary" size="lg" className="font-heading">
                Get Recipe Now
              </Button>
            </div>

            <div>
              <ScrollableCards
                cards={macCheeseVariations}
                cardSize="md"
                className="justify-center lg:justify-start"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Fan Favorites Section */}
      <section className="mb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
            Fan Favorites
          </h2>

          <FoodGrid
            cards={fanFavorites}
            columns={3}
            cardSize="md"
          />
        </div>
      </section>

      {/* Dinner Favorites Section */}
      <section className="mb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Dinner Favorites You'll Crave<br />
            <span className="text-primary">Again and Again</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Discover all delicious dinner recipes that are sure to make
            full of flavor and loved guaranteed.
          </p>
          <Button variant="recipe-primary" size="xl" className="font-heading mb-12">
            Discover More Recipes
          </Button>

          {/* Appetizer Strip */}
          <div className="rounded-2xl overflow-hidden shadow-card">
            <img
              src={appetizerSpread}
              alt="Variety of appetizers and small dishes"
              className="w-full h-40 md:h-60 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-surface py-12 px-4 mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-heading font-bold text-xl mb-4 text-primary">Recipe Masters</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Find the creamy recipes. Flavorful meals for
                delicious dinners and easy dinner.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">All Categories</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Top Rated</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">New Recipes</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Meal Plans</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Get in Touch</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-muted-foreground text-sm mb-4">Get weekly recipe updates</p>
              <Button variant="recipe-outline" size="sm" className="w-full">
                Subscribe
              </Button>
            </div>
          </div>

          <div className="border-t border-border/20 mt-8 pt-8 text-center">
            <p className="text-muted-foreground text-sm">
              © 2024. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;