package com.hyd.tourism.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "tourism_data")
public class TourismData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "province_id", nullable = false)
    private Province province;

    @Column(nullable = false)
    private Integer year;

    @Column(nullable = false)
    private String season;

    @Column(name = "tourist_count", nullable = false)
    private Integer touristCount;

    @Column(nullable = false)
    private BigDecimal income;

    // 如果没有使用Lombok或Lombok不起作用，手动添加getter方法
    public Province getProvince() {
        return province;
    }

    public Integer getTouristCount() {
        return touristCount;
    }

    // 其他getter方法
    public Integer getId() {
        return id;
    }

    public Integer getYear() {
        return year;
    }

    public String getSeason() {
        return season;
    }

    public BigDecimal getIncome() {
        return income;
    }

    // setter方法
    public void setId(Integer id) {
        this.id = id;
    }

    public void setProvince(Province province) {
        this.province = province;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public void setSeason(String season) {
        this.season = season;
    }

    public void setTouristCount(Integer touristCount) {
        this.touristCount = touristCount;
    }

    public void setIncome(BigDecimal income) {
        this.income = income;
    }
}