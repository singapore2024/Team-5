package com.example.restservice.orders;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.time.LocalDateTime;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    /**
     * A test endpoint to check if the service is responsive.
     *
     * @return A simple string message "Responsive".
     */
    @GetMapping("/test")
    public String test() {
        return "Responsive";
    }

    /**
     * Creates a new order with the provided customerEmail, description, price, and status.
     *
     * @param customerEmail The email of the customer placing the order.
     * @param description   The description of the order.
     * @param price         The price of the order.
     * @param status        The status of the order (e.g., "pending", "completed").
     * @return A message indicating whether the order was created successfully or an error occurred.
     */
//    @PostMapping("/create")
//    public ResponseEntity<String> createOrder(@RequestBody String email,
//                                              @RequestBody String name,
//                                              @RequestBody Double price,
//                                              @RequestBody int qty) {
    @PostMapping("/create")
    public ResponseEntity<String> createOrder(@RequestBody Order order) {
        System.out.println("PARAM VALUES");
        System.out.println(order.getEmail());
        try {
            order.setStatus("Pending");
            order.setDate(LocalDateTime.now());
            order.setDeliveryDate(LocalDateTime.of(2024, 10, 11, 17, 0, 0));
            orderRepository.save(order);
            return ResponseEntity.ok("Order created successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating order: " + e.getMessage());
        }
    }

    /**
     * Retrieves all orders.
     *
     * @return A list of all orders.
     */
    @GetMapping("/testGet")
    public ResponseEntity<List<Order>> getAllOrders() {
        try {
            List<Order> orders = orderRepository.findAll();
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    /**
     * Retrieves an order by its ID.
     *
     * @param id The ID of the order to retrieve.
     * @return The order details or an error message if the order is not found.
     */

    /**
     * Deletes orders by their status.
     *
     * @param status The status of the orders to be deleted (e.g., "canceled").
     * @return A message indicating the result of the delete operation.
     */
    @DeleteMapping("/status/{status}")
    public ResponseEntity<String> deleteOrdersByStatus(@PathVariable String status) {
        try {
            orderRepository.deleteByStatus(status);
            return ResponseEntity.ok("Orders with status '" + status + "' deleted successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting orders: " + e.getMessage());
        }
    }
    /**
     * Deletes orders by their status.
     *
     * @param status The status of the orders to be deleted (e.g., "canceled").
     * @return A message indicating the result of the delete operation.
     */
    @PostMapping("/edit")
    public ResponseEntity<String> deleteOrdersByStatus(@RequestBody Order order) {
        try {
            orderRepository.updateStatusById(order.getId(), order.getStatus());
            return ResponseEntity.ok("Orders with status '" + order.getStatus() + "' edited successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error editing orders: " + e.getMessage());
        }
    }
}
