package com.example.restservice.schedule;

import com.example.restservice.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    // Find all schedules for a specific user
    List<Schedule> findByUser(User user);

    // Find all schedules within a specific date range
    List<Schedule> findByDateBetween(LocalDate startDate, LocalDate endDate);

    // Find all schedules for a specific user and time slot
    List<Schedule> findByUserAndSlot(User user, Schedule.TimeSlot slot);

    // Find all schedules by type (WORK or ORDER)
    List<Schedule> findByType(Schedule.ScheduleType type);
}