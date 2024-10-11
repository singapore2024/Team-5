/**
 * This class represents a User entity that is mapped to the "user" table in the database.
 * Each User object contains information about a user, including a unique username and a password.
 */
package com.example.restservice.user;

import com.example.restservice.schedule.Schedule;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "[jpuser]")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Schedule> schedules;

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Schedule> getSchedules() {
        return schedules;
    }

    public void setSchedules(List<Schedule> schedules) {
        this.schedules = schedules;
    }

    public void setId(long l) {
    }
}
