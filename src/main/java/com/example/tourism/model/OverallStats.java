package com.example.tourism.model;

import lombok.Data;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "overall_stats")
public class OverallStats {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private Integer year;

    @Column(nullable = false)
    private String season;

    @Column(name = "total_tourists", nullable = false)
    private Integer totalTourists;

    @Column(name = "tourists_trend", nullable = false)
    private BigDecimal touristsTrend;

    @Column(name = "total_income", nullable = false)
    private Integer totalIncome;

    @Column(name = "income_trend", nullable = false)
    private BigDecimal incomeTrend;

    @Column(name = "avg_consume", nullable = false)
    private Integer avgConsume;

    @Column(name = "consume_trend", nullable = false)
    private BigDecimal consumeTrend;

    @Column(name = "hot_destination", nullable = false)
    private String hotDestination;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public Integer getTotalTourists() {
        return totalTourists;
    }

    public void setTotalTourists(Integer totalTourists) {
        this.totalTourists = totalTourists;
    }

    public BigDecimal getTouristsTrend() {
        return touristsTrend;
    }

    public void setTouristsTrend(BigDecimal touristsTrend) {
        this.touristsTrend = touristsTrend;
    }

    public Integer getTotalIncome() {
        return totalIncome;
    }

    public void setTotalIncome(Integer totalIncome) {
        this.totalIncome = totalIncome;
    }

    public BigDecimal getIncomeTrend() {
        return incomeTrend;
    }

    public void setIncomeTrend(BigDecimal incomeTrend) {
        this.incomeTrend = incomeTrend;
    }

    public Integer getAvgConsume() {
        return avgConsume;
    }

    public void setAvgConsume(Integer avgConsume) {
        this.avgConsume = avgConsume;
    }

    public BigDecimal getConsumeTrend() {
        return consumeTrend;
    }

    public void setConsumeTrend(BigDecimal consumeTrend) {
        this.consumeTrend = consumeTrend;
    }

    public String getHotDestination() {
        return hotDestination;
    }

    public void setHotDestination(String hotDestination) {
        this.hotDestination = hotDestination;
    }

    public String getDestinationTrend() {
        return destinationTrend;
    }

    public void setDestinationTrend(String destinationTrend) {
        this.destinationTrend = destinationTrend;
    }

    @Column(name = "destination_trend", nullable = false)
    private String destinationTrend;
}