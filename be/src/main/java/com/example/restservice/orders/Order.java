/**
 * This class represents an Order entity that is mapped to the "jporder" table in the database.
 * Each Order object contains information about an order, including customer email, email, date, and price.
 */
package com.example.restservice.orders;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "[jporder]")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = true)
    private String email;

    @Column(nullable = true)
    private LocalDateTime date;

    @Column(nullable = true)
    private LocalDateTime deliveryDate;

    @Column(nullable = true)
    private Double price;

    @Column(nullable = true)
    private int quantity;

    @Column(nullable = true)
    private String description;

    @Column(nullable = true)
    private String status;

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public LocalDateTime getDeliveryDate() {
        return date;
    }

    public void setDeliveryDate(LocalDateTime deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
