// src/components/MenuPage.tsx

import React, { useState } from "react";
import { Card, Typography } from "@mui/material";
import "./menuPage.css";

// Define the interface for a food item
interface FoodItem {
  id: string;
  name: string;
  ingredients: string[];
  image: string;
}

const DUMMY_FOOD_ITEMS: FoodItem[] = [
  {
    id: "1",
    name: "Nasi Lemak",
    ingredients: ["Rice", "Coconut Milk", "Anchovies", "Egg", "Peanuts"],
    image: "https://www.google.com/imgres?q=nasi%20lemak%20images&imgurl=http%3A%2F%2Fwww.andy-cooks.com%2Fcdn%2Fshop%2Farticles%2F20231116072724-c2-a9andy_cooks_thumbnails_nasi_lemak_01.jpg%3Fv%3D1700389619&imgrefurl=https%3A%2F%2Fwww.andy-cooks.com%2Fblogs%2Frecipes%2Fnasi-lemak&docid=ACXws9Ta5mHDLM&tbnid=TPHDr6d2CGQhTM&vet=12ahUKEwiPzLy7voWJAxV41jgGHfDsHLgQM3oECD4QAA..i&w=1000&h=667&hcb=2&ved=2ahUKEwiPzLy7voWJAxV41jgGHfDsHLgQM3oECD4QAA",
  },
  {
    id: "2",
    name: "Chicken Rice",
    ingredients: ["Chicken", "Rice", "Garlic", "Ginger", "Soy Sauce"],
    image: "/images/chicken_rice.jpg",
  },
  {
    id: "3",
    name: "Pasta",
    ingredients: ["Pasta", "Tomato Sauce", "Parmesan", "Basil"],
    image: "/images/pasta.jpg",
  },
  {
    id: "4",
    name: "Sushi",
    ingredients: ["Rice", "Seaweed", "Salmon", "Avocado"],
    image: "/images/sushi.jpg",
  },
  {
    id: "5",
    name: "Salad",
    ingredients: ["Lettuce", "Tomato", "Cucumber", "Olives", "Feta Cheese"],
    image: "/images/salad.jpg",
  },
];

const MenuPage: React.FC = () => {
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Toggle the expanded state of the food item
  const handleToggleExpand = (id: string) => {
    setExpandedItemId(expandedItemId === id ? null : id);
  };

  // Filter the items based on the search query
  const filteredItems = DUMMY_FOOD_ITEMS.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="menu-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search food..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="food-grid">
        {filteredItems.map((food) => (
          <Card
            key={food.id}
            className={`food-card ${expandedItemId === food.id ? "expanded" : ""}`}
            onClick={() => handleToggleExpand(food.id)}
          >
            <img src={food.image} alt={food.name} className="food-image" />
            <Typography variant="h6" className="food-name">
              {food.name}
            </Typography>
            {expandedItemId === food.id && (
              <div className="ingredients-list">
                <Typography variant="subtitle1">Ingredients:</Typography>
                <ul>
                  {food.ingredients.map((ingredient, idx) => (
                    <li key={idx}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
