package com.hyd.tourism.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "scenic_spot_popularity")
public class ScenicSpotPopularity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "spot_id", nullable = false)
    private ScenicSpot spot;

    @Column(nullable = false)
    private Integer year;

    @Column(nullable = false)
    private String season;

    @Column(name = "popularity_score", nullable = false)
    private Integer popularityScore;

    @Column(name = "visitor_count", nullable = false)
    private Integer visitorCount;

    // 添加必要的getter方法
    public ScenicSpot getSpot() {
        return spot;
    }

    public Integer getPopularityScore() {
        return popularityScore;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setSpot(ScenicSpot spot) {
        this.spot = spot;
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

    public void setPopularityScore(Integer popularityScore) {
        this.popularityScore = popularityScore;
    }

    public void setVisitorCount(Integer visitorCount) {
        this.visitorCount = visitorCount;
    }

    public Integer getVisitorCount() {
        return visitorCount;
    }
}