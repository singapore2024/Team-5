package com.example.restservice.inventory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.annotation.Repeatable;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.ArrayList;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/inventory")
public class InventoryController {
    @Autowired
    private InventoryService inventoryService;

    @GetMapping("/test")
    public String test() {
        return "Responsive";
    }

    @GetMapping("/view")
    public ResponseEntity<List<Inventory>>getInventory(){
        Inventory inventory = new Inventory("Rice", "Non-perishable", 100, LocalDate.of(2024,01,01), LocalDate.of(2024,02,01), 1, "In Stock");
        inventory.setId(Long.valueOf(1));
        Inventory secondinventory = new Inventory("Chicken", "Perishable", 100, LocalDate.of(2024,01,01), LocalDate.of(2024,02,01), 1, "Low Stock");
        secondinventory.setId(Long.valueOf(2));
        Inventory thirdinventory = new Inventory("Vegetables", "Perishable", 100, LocalDate.of(2024,01,01), LocalDate.of(2024,02,01), 1, "Out of Stock");
        thirdinventory.setId(Long.valueOf(2));
        List<Inventory> inventories = new ArrayList<>();
        inventories.add(inventory);
        inventories.add(secondinventory);
        inventories.add(thirdinventory);
        return ResponseEntity.ok(inventories);
    }

    // @GetMapping("/{id}")
    // public Optional<Inventory> getInventoryById(@PathVariable Long id) {
    //     return inventoryService.getInventoryById(id);
    // }

    @PostMapping("/create")
    public ResponseEntity<String> createInventory(@RequestParam String name,
    @RequestParam String type, @RequestParam LocalDate dateReceived, @RequestParam LocalDate expiryDate, @RequestParam Integer quantity, @RequestParam Integer tag, @RequestParam String status
    ){
        try {
            Inventory newInventory = new Inventory(name, type, quantity, dateReceived, expiryDate, tag, status);
            inventoryService.saveInventory(newInventory);
            return ResponseEntity.ok("Inventory item created successfully!");
        } catch(Exception e) {
            return ResponseEntity.status(500).body("Error creating inventory: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public void deleteInventory(@PathVariable Long id) {
        inventoryService.deleteInventory(id);
    }
}