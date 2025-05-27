package com.hyd.tourism.model;

import lombok.Data;
import jakarta.persistence.*;

@Data
@Entity
@Table(name = "travel_type_stats")
public class TravelTypeStats {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "type_id", nullable = false)
    private TravelType type;

    @Column(nullable = false)
    private Integer year;

    @Column(nullable = false)
    private String season;

    @Column(name = "tourist_count", nullable = false)
    private Integer touristCount;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public TravelType getType() {
        return type;
    }

    public void setType(TravelType type) {
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

    public Integer getTouristCount() {
        return touristCount;
    }

    public void setTouristCount(Integer touristCount) {
        this.touristCount = touristCount;
    }
}