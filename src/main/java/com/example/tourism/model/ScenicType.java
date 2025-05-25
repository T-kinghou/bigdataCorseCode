package com.example.tourism.model;

import lombok.Data;
import jakarta.persistence.*;

@Data
@Entity
@Table(name = "scenic_type")
public class ScenicType {
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;
}