package com.example.restservice.orders;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByEmail(String email);

    List<Order> findByStatus(String status);

    @Transactional
    void deleteByStatus(String status);
}
