package com.example.restservice.menu;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/menu")
public class MenuController {

    @GetMapping("/all")
    public List<Map<String, Object>> getAllRecipes() {
        // Create a list to hold multiple recipes
        List<Map<String, Object>> recipes = new ArrayList<>();

        // Recipe 1
        Map<String, Object> recipe1 = new HashMap<>();
        recipe1.put("id", 1);
        recipe1.put("name", "Spaghetti Bolognese");

        List<Map<String, Object>> ingredients1 = new ArrayList<>();
        ingredients1.add(createIngredient(101, "Spaghetti", "200g"));
        ingredients1.add(createIngredient(102, "Minced Beef", "300g"));
        ingredients1.add(createIngredient(103, "Tomato Sauce", "150ml"));
        recipe1.put("ingredients", ingredients1);

        // Recipe 2
        Map<String, Object> recipe2 = new HashMap<>();
        recipe2.put("id", 2);
        recipe2.put("name", "Chicken Curry");

        List<Map<String, Object>> ingredients2 = new ArrayList<>();
        ingredients2.add(createIngredient(201, "Chicken Breast", "250g"));
        ingredients2.add(createIngredient(202, "Curry Powder", "2 tbsp"));
        ingredients2.add(createIngredient(203, "Coconut Milk", "200ml"));
        recipe2.put("ingredients", ingredients2);

        // Recipe 3
        Map<String, Object> recipe3 = new HashMap<>();
        recipe3.put("id", 3);
        recipe3.put("name", "Vegetable Stir Fry");

        List<Map<String, Object>> ingredients3 = new ArrayList<>();
        ingredients3.add(createIngredient(301, "Broccoli", "100g"));
        ingredients3.add(createIngredient(302, "Carrots", "50g"));
        ingredients3.add(createIngredient(303, "Soy Sauce", "2 tbsp"));
        recipe3.put("ingredients", ingredients3);

        // Recipe 4
        Map<String, Object> recipe4 = new HashMap<>();
        recipe4.put("id", 4);
        recipe4.put("name", "Beef Tacos");

        List<Map<String, Object>> ingredients4 = new ArrayList<>();
        ingredients4.add(createIngredient(401, "Beef", "200g"));
        ingredients4.add(createIngredient(402, "Taco Shells", "4 pieces"));
        ingredients4.add(createIngredient(403, "Salsa", "50g"));
        recipe4.put("ingredients", ingredients4);

        // Recipe 5
        Map<String, Object> recipe5 = new HashMap<>();
        recipe5.put("id", 5);
        recipe5.put("name", "Salmon Teriyaki");

        List<Map<String, Object>> ingredients5 = new ArrayList<>();
        ingredients5.add(createIngredient(501, "Salmon Fillet", "200g"));
        ingredients5.add(createIngredient(502, "Teriyaki Sauce", "3 tbsp"));
        ingredients5.add(createIngredient(503, "Rice", "100g"));
        recipe5.put("ingredients", ingredients5);

        // Add all recipes to the list
        recipes.add(recipe1);
        recipes.add(recipe2);
        recipes.add(recipe3);
        recipes.add(recipe4);
        recipes.add(recipe5);

        return recipes;
    }

    private Map<String, Object> createIngredient(int id, String name, String quantity) {
        Map<String, Object> ingredient = new HashMap<>();
        ingredient.put("id", id);
        ingredient.put("name", name);
        ingredient.put("quantity", quantity);
        return ingredient;
    }
}
