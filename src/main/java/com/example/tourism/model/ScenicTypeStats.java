package com.example.tourism.model;

import lombok.Data;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "scenic_type_stats")
public class ScenicTypeStats {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public ScenicType getType() {
        return type;
    }

    public void setType(ScenicType type) {
        this.type = type;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getSeason() {
        return season;
    }

    public void setSeason(String season) {
        this.season = season;
    }

    public BigDecimal getPercentage() {
        return percentage;
    }

    public void setPercentage(BigDecimal percentage) {
        this.percentage = percentage;
    }

    @ManyToOne
    @JoinColumn(name = "type_id", nullable = false)
    private ScenicType type;

    @Column(nullable = false)
    private Integer year;

    @Column(nullable = false)
    private String season;

    @Column(nullable = false)
    private BigDecimal percentage;
}