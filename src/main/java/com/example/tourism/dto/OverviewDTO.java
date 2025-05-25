package com.example.tourism.dto;

import lombok.Data;

@Data
public class OverviewDTO {
    private Integer totalTourists;       // 游客总量(万人)
    private Double totalTouristsTrend;   // 游客增长率(%)

    private Integer totalIncome;         // 旅游总收入(亿元)
    private Double totalIncomeTrend;     // 收入增长率(%)

    private Integer avgConsume;          // 人均消费(元)
    private Double avgConsumeTrend;      // 消费增长率(%)

    public Integer getTotalTourists() {
        return totalTourists;
    }

    public void setTotalTourists(Integer totalTourists) {
        this.totalTourists = totalTourists;
    }

    public Double getTotalTouristsTrend() {
        return totalTouristsTrend;
    }

    public void setTotalTouristsTrend(Double totalTouristsTrend) {
        this.totalTouristsTrend = totalTouristsTrend;
    }

    public Integer getTotalIncome() {
        return totalIncome;
    }

    public void setTotalIncome(Integer totalIncome) {
        this.totalIncome = totalIncome;
    }

    public Double getTotalIncomeTrend() {
        return totalIncomeTrend;
    }

    public void setTotalIncomeTrend(Double totalIncomeTrend) {
        this.totalIncomeTrend = totalIncomeTrend;
    }

    public Integer getAvgConsume() {
        return avgConsume;
    }

    public void setAvgConsume(Integer avgConsume) {
        this.avgConsume = avgConsume;
    }

    public Double getAvgConsumeTrend() {
        return avgConsumeTrend;
    }

    public void setAvgConsumeTrend(Double avgConsumeTrend) {
        this.avgConsumeTrend = avgConsumeTrend;
    }

    public String getHotDestination() {
        return hotDestination;
    }

    public void setHotDestination(String hotDestination) {
        this.hotDestination = hotDestination;
    }

    public String getHotDestinationTrend() {
        return hotDestinationTrend;
    }

    public void setHotDestinationTrend(String hotDestinationTrend) {
        this.hotDestinationTrend = hotDestinationTrend;
    }

    private String hotDestination;       // 热门目的地
    private String hotDestinationTrend;  // 热门目的地趋势
}