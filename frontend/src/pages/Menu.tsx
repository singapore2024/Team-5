// src/components/MenuPage.tsx

import React, { useState } from "react";
import { Card, Typography, Button, Modal, TextField } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import "./menuPage.css";

interface FoodItem {
  id: string;
  name: string;
  ingredients: string[];
  image: null;
  imagePreview: string;
}

const DUMMY_FOOD_ITEMS: FoodItem[] = [
  {
    id: "1",
    name: "Nasi Lemak",
    ingredients: ["Rice", "Coconut Milk", "Anchovies", "Egg", "Peanuts"],
    image: null,
    imagePreview: "nasilemak.jpg"
  },
  {
    id: "2",
    name: "Chicken Rice",
    ingredients: ["Chicken", "Rice", "Garlic", "Ginger", "Soy Sauce"],
    image: null,
    imagePreview: "chickenrice.jpg"
  },
  {
    id: "3",
    name: "Pasta",
    ingredients: ["Pasta", "Tomato Sauce", "Parmesan", "Basil"],
    image: null,
    imagePreview: "pasta.jpg"
  },
  {
    id: "4",
    name: "Sushi",
    ingredients: ["Rice", "Seaweed", "Salmon", "Avocado"],
    image: null,
    imagePreview: "sushi.jpg"
  },
  {
    id: "5",
    name: "Salad",
    ingredients: ["Lettuce", "Tomato", "Cucumber", "Olives", "Feta Cheese"],
    image: null,
    imagePreview: "salad.jpg"
  },
];

const MenuPage: React.FC = () => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>(DUMMY_FOOD_ITEMS);
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newItem, setNewItem] = useState<FoodItem>({
    id: "",
    name: "",
    ingredients: [],
    image: null,
    imagePreview: ""
  });

  const handleToggleExpand = (id: string) => {
    setExpandedItemId(expandedItemId === id ? null : id);
  };

  const filteredItems = foodItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddItem = () => {
    // Add the new item to the list
    setFoodItems([
      ...foodItems,
      {
        ...newItem,
        id: (foodItems.length + 1).toString(), // Generate a simple id
      },
    ]);
    // Close the modal and reset the new item state
    setIsModalOpen(false);
    setNewItem({ id: "", name: "", ingredients: [], image: null, imagePreview:"" });
  };

  const handleChange = (field: keyof FoodItem, value: string | string[]) => {
    setNewItem((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="container-box">
      <div className="breadcrumbs">
        <Typography variant="h5">Menu</Typography>
        <input
          type="text"
          placeholder="Search food..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutline />}
          onClick={() => setIsModalOpen(true)}
        >
          Add New Menu
        </Button>
      </div>
      <div className="card-grid">
        {filteredItems.map((food) => (
          <Card
            key={food.id}
            //img={food.imagePreview}
            className={`food-card ${expandedItemId === food.id ? "expanded" : ""}`}
            onClick={() => handleToggleExpand(food.id)}
          >
            <img src={food.imagePreview} alt={food.name} className="food-image"  />
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

      {/* Modal for Adding a New Menu Item */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="modal-content">
          <Typography variant="h6">Add New Menu Item</Typography>
          <TextField
            label="Name"
            value={newItem.name}
            onChange={(e) => handleChange("name", e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Image URL"
            value={newItem.image}
            onChange={(e) => handleChange("image", e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Ingredients (comma-separated)"
            value={newItem.ingredients.join(", ")}
            onChange={(e) =>
              handleChange("ingredients", e.target.value.split(",").map((ing) => ing.trim()))
            }
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleAddItem}>
            Add Item
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default MenuPage;
