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

export type Dish = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  price: number;
  image: string;
  category: "Mains" | "Sides" | "Salads" | "Tacos" | "Pasta" | "Wings" | "BBQ";
  prepMinutes: number;
  rating: number;
  calories: number;
  tags: string[];
};

export const dishes: Dish[] = [
  {
    id: "juicy-chicken-dinner",
    title: "Juicy Chicken Dinner",
    description: "Perfectly roasted with herbs and spices",
    longDescription:
      "Slow-roasted free-range chicken finished with rosemary butter, served with roasted root vegetables and pan jus.",
    price: 18.5,
    image: chickenDinner,
    category: "Mains",
    prepMinutes: 30,
    rating: 4.8,
    calories: 720,
    tags: ["high-protein", "comfort"],
  },
  {
    id: "spicy-grilled-salmon",
    title: "Spicy Grilled Salmon",
    description: "Fresh Atlantic salmon with citrus glaze",
    longDescription:
      "Wild-caught salmon brushed with chili-citrus glaze, charred over open flame and finished with micro herbs.",
    price: 24.0,
    image: salmonDish,
    category: "Mains",
    prepMinutes: 25,
    rating: 4.9,
    calories: 540,
    tags: ["pescatarian", "spicy", "high-protein"],
  },
  {
    id: "fresh-garden-salad",
    title: "Fresh Garden Salad",
    description: "Crisp vegetables with house dressing",
    longDescription:
      "Heirloom greens, shaved radish, cucumber ribbons and toasted seeds tossed in our signature lemon vinaigrette.",
    price: 11.0,
    image: freshSalad,
    category: "Salads",
    prepMinutes: 10,
    rating: 4.6,
    calories: 280,
    tags: ["vegan", "light", "gluten-free"],
  },
  {
    id: "classic-mac-cheese",
    title: "Classic Mac & Cheese",
    description: "Traditional comfort food",
    longDescription:
      "Three-cheese blend folded through al dente cavatappi, baked until golden and bubbling.",
    price: 14.0,
    image: macCheese1,
    category: "Pasta",
    prepMinutes: 20,
    rating: 4.7,
    calories: 680,
    tags: ["vegetarian", "comfort"],
  },
  {
    id: "baked-mac-cheese",
    title: "Baked Mac & Cheese",
    description: "With crispy breadcrumb topping",
    longDescription:
      "Our classic mac topped with herbed panko and baked to a golden crust.",
    price: 15.5,
    image: macCheese2,
    category: "Pasta",
    prepMinutes: 25,
    rating: 4.7,
    calories: 720,
    tags: ["vegetarian", "comfort"],
  },
  {
    id: "truffle-mac-cheese",
    title: "Truffle Mac & Cheese",
    description: "Gourmet version with herbs",
    longDescription:
      "Aged gruyère and fontina laced with shaved black truffle and finished with chive oil.",
    price: 19.0,
    image: macCheese3,
    category: "Pasta",
    prepMinutes: 25,
    rating: 4.9,
    calories: 760,
    tags: ["vegetarian", "gourmet"],
  },
  {
    id: "grilled-steak",
    title: "Grilled Steak",
    description: "Perfectly seasoned beef",
    longDescription:
      "28-day dry-aged ribeye seared over hardwood, finished with smoked sea salt and herb butter.",
    price: 32.0,
    image: beefSteak,
    category: "Mains",
    prepMinutes: 25,
    rating: 4.9,
    calories: 820,
    tags: ["high-protein", "premium"],
  },
  {
    id: "fried-chicken",
    title: "Fried Chicken",
    description: "Crispy golden perfection",
    longDescription:
      "Buttermilk-brined chicken hand-breaded and fried to a shatteringly crisp finish.",
    price: 16.0,
    image: friedChicken,
    category: "Mains",
    prepMinutes: 20,
    rating: 4.8,
    calories: 760,
    tags: ["comfort", "crispy"],
  },
  {
    id: "fish-tacos",
    title: "Fish Tacos",
    description: "Fresh and zesty flavors",
    longDescription:
      "Beer-battered cod, lime crema and pickled cabbage on warm corn tortillas.",
    price: 13.5,
    image: fishTacos,
    category: "Tacos",
    prepMinutes: 15,
    rating: 4.6,
    calories: 520,
    tags: ["pescatarian", "light"],
  },
  {
    id: "pasta-carbonara",
    title: "Pasta Carbonara",
    description: "Classic Italian comfort food",
    longDescription:
      "Silky guanciale carbonara with farm egg yolk, pecorino and cracked black pepper.",
    price: 17.0,
    image: pastaCarbonara,
    category: "Pasta",
    prepMinutes: 18,
    rating: 4.8,
    calories: 690,
    tags: ["comfort"],
  },
  {
    id: "bbq-ribs",
    title: "BBQ Ribs",
    description: "Smoky and tender ribs",
    longDescription:
      "Low-and-slow smoked baby back ribs glazed with our house bourbon BBQ sauce.",
    price: 26.0,
    image: bbqRibs,
    category: "BBQ",
    prepMinutes: 30,
    rating: 4.9,
    calories: 880,
    tags: ["smoky", "high-protein"],
  },
  {
    id: "vegetable-stir-fry",
    title: "Vegetable Stir Fry",
    description: "Fresh and healthy option",
    longDescription:
      "Wok-tossed seasonal vegetables in ginger-soy glaze served over jasmine rice.",
    price: 12.5,
    image: vegetableStirFry,
    category: "Mains",
    prepMinutes: 15,
    rating: 4.5,
    calories: 410,
    tags: ["vegan", "light", "healthy"],
  },
  {
    id: "buffalo-wings",
    title: "Buffalo Wings",
    description: "Crispy and spicy wings",
    longDescription:
      "Double-fried jumbo wings tossed in classic buffalo sauce with blue cheese dip.",
    price: 13.0,
    image: chickenWings,
    category: "Wings",
    prepMinutes: 20,
    rating: 4.7,
    calories: 640,
    tags: ["spicy", "shareable"],
  },
  {
    id: "beef-kebabs",
    title: "Beef Kebabs",
    description: "Grilled to perfection",
    longDescription:
      "Marinated beef skewers grilled with peppers and onions, served with garlic yogurt.",
    price: 19.5,
    image: beefKebabs,
    category: "BBQ",
    prepMinutes: 22,
    rating: 4.7,
    calories: 580,
    tags: ["high-protein", "smoky"],
  },
];

export const getDishById = (id: string) => dishes.find((d) => d.id === id);

export const dishCategories = [
  "All",
  "Mains",
  "Pasta",
  "BBQ",
  "Wings",
  "Tacos",
  "Salads",
] as const;