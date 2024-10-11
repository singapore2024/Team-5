package com.example.restservice.inventory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
    public List<Inventory> getInventory(){
        System.out.println("Retrieving inventory");
        return inventoryService.getAllInventories();
    }

    @GetMapping("/{id}")
    public Optional<Inventory> getInventoryById(@PathVariable Long id) {
        return inventoryService.getInventoryById(id);
    }

    @PostMapping("/create")
    public Inventory createInventory(@RequestBody Inventory inventory) {
        return inventoryService.saveInventory(inventory);
    }

    @DeleteMapping("/{id}")
    public void deleteInventory(@PathVariable Long id) {
        inventoryService.deleteInventory(id);
    }
}