package com.example.restservice.schedule;

import com.example.restservice.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/schedule")
public class ScheduleController {

    private final ScheduleService scheduleService;

    @Autowired
    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    // Get all schedules
    @GetMapping
    public List<Schedule> getAllSchedules() {
        return scheduleService.getAllSchedules();
    }

    // Get schedules by user (assume user id is passed as a request param)
    @GetMapping("/user/{userId}")
    public List<Schedule> getSchedulesByUser(@PathVariable Long userId) {
        User user = new User(); // Ideally, retrieve the actual User from a UserService
        user.setId(userId);
        return scheduleService.getSchedulesByUser(user);
    }

    // Get schedules by date range
    @GetMapping("/date-range")
    public List<Schedule> getSchedulesByDateRange(@RequestParam LocalDate startDate, @RequestParam LocalDate endDate) {
        return scheduleService.getSchedulesByDateRange(startDate, endDate);
    }

    // Get schedules by type (WORK or ORDER)
    @GetMapping("/type/{type}")
    public List<Schedule> getSchedulesByType(@PathVariable Schedule.ScheduleType type) {
        return scheduleService.getSchedulesByType(type);
    }

    // Get a specific schedule by ID
    @GetMapping("/{id}")
    public Optional<Schedule> getScheduleById(@PathVariable Long id) {
        return scheduleService.getScheduleById(id);
    }

    // Create a new schedule
    @PostMapping
    public Schedule createSchedule(@RequestBody Schedule schedule) {
        return scheduleService.createSchedule(schedule);
    }

    // Update an existing schedule
    @PutMapping("/{id}")
    public Schedule updateSchedule(@PathVariable Long id, @RequestBody Schedule schedule) {
        return scheduleService.updateSchedule(id, schedule);
    }

    // Delete a schedule by ID
    @DeleteMapping("/{id}")
    public void deleteSchedule(@PathVariable Long id) {
        scheduleService.deleteSchedule(id);
    }
}
