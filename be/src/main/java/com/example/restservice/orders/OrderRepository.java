package com.example.restservice.orders;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByEmail(String email);

    List<Order> findByStatus(String status);

    @Transactional
    void deleteByStatus(String status);

    // Custom query to update the status by order id
    @Modifying
    @Transactional
    @Query("UPDATE Order o SET o.status = :status WHERE o.id = :orderId")
    void updateStatusById(@Param("orderId") Long orderId, @Param("status") String status);
}
