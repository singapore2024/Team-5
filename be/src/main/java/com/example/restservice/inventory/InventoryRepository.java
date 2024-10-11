package com.example.restservice.inventory;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;  

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    List<Inventory> findAll();
    Optional<Inventory> findById(Long id);
    Inventory save(Inventory inventory);
    void deleteById(Long id);
}