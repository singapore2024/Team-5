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
        Inventory inventory = new Inventory("some food", "type", 100, LocalDate.of(2024,01,01), LocalDate.of(2024,02,01), 1);
        inventory.setId(Long.valueOf(1));
        List<Inventory> inventories = new ArrayList<>();
        inventories.add(inventory);
        return ResponseEntity.ok(inventories);
    }

    // @GetMapping("/{id}")
    // public Optional<Inventory> getInventoryById(@PathVariable Long id) {
    //     return inventoryService.getInventoryById(id);
    // }

    @PostMapping("/create")
    public ResponseEntity<String> createInventory(@RequestParam String name,
    @RequestParam String type, @RequestParam LocalDate dateReceived, @RequestParam LocalDate expiryDate, @RequestParam Integer quantity, @RequestParam Integer tag
    ){
        try {
            Inventory newInventory = new Inventory(name, type, quantity, dateReceived, expiryDate, tag);
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