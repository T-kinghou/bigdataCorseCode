package com.hyd.tourism.dto;

import java.util.List;

public class VisitorTrendDTO {
    private List<String> months;
    private List<SeriesData> series;

    // 添加getter和setter方法
    public List<String> getMonths() {
        return months;
    }

    public void setMonths(List<String> months) {
        this.months = months;
    }

    public List<SeriesData> getSeries() {
        return series;
    }

    public void setSeries(List<SeriesData> series) {
        this.series = series;
    }

    public static class SeriesData {
        private String name;
        private String type;
        private Boolean smooth;
        private List<Integer> data;

        // 您已经有了这些getter和setter方法
        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public Boolean getSmooth() {
            return smooth;
        }

        public void setSmooth(Boolean smooth) {
            this.smooth = smooth;
        }

        public List<Integer> getData() {
            return data;
        }

        public void setData(List<Integer> data) {
            this.data = data;
        }
    }
}