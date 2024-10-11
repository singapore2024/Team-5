package com.example.restservice.schedule;

import com.example.restservice.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;

    @Autowired
    public ScheduleService(ScheduleRepository scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }

    // Retrieve all schedules
    public List<Schedule> getAllSchedules() {
        return scheduleRepository.findAll();
    }

    // Retrieve schedules for a specific user
    public List<Schedule> getSchedulesByUser(User user) {
        return scheduleRepository.findByUser(user);
    }

    // Retrieve schedules within a date range
    public List<Schedule> getSchedulesByDateRange(LocalDate startDate, LocalDate endDate) {
        return scheduleRepository.findByDateBetween(startDate, endDate);
    }

    // Retrieve schedules by type (WORK or ORDER)
    public List<Schedule> getSchedulesByType(Schedule.ScheduleType type) {
        return scheduleRepository.findByType(type);
    }

    // Retrieve a schedule by ID
    public Optional<Schedule> getScheduleById(Long id) {
        return scheduleRepository.findById(id);
    }

    // Create a new schedule
    public Schedule createSchedule(Schedule schedule) {
        return scheduleRepository.save(schedule);
    }

    // Update an existing schedule
    public Schedule updateSchedule(Long id, Schedule updatedSchedule) {
        Optional<Schedule> existingSchedule = scheduleRepository.findById(id);

        if (existingSchedule.isPresent()) {
            Schedule schedule = existingSchedule.get();
            schedule.setDate(updatedSchedule.getDate());
            schedule.setSlot(updatedSchedule.getSlot());
            schedule.setType(updatedSchedule.getType());
            schedule.setRemarks(updatedSchedule.getRemarks());
            schedule.setUser(updatedSchedule.getUser());
            return scheduleRepository.save(schedule);
        }

        throw new RuntimeException("Schedule not found with id: " + id);
    }

    // Delete a schedule by ID
    public void deleteSchedule(Long id) {
        scheduleRepository.deleteById(id);
    }
}
