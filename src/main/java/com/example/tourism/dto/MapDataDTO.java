package com.example.tourism.dto;

import java.util.List;

public class MapDataDTO {
    private List<ProvinceData> data;
    private Integer max;

    // 添加getter和setter方法
    public List<ProvinceData> getData() {
        return data;
    }

    public void setData(List<ProvinceData> data) {
        this.data = data;
    }

    public Integer getMax() {
        return max;
    }

    public void setMax(Integer max) {
        this.max = max;
    }

    // 内部类ProvinceData
    public static class ProvinceData {
        private String name;
        private Integer value;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public Integer getValue() {
            return value;
        }

        public void setValue(Integer value) {
            this.value = value;
        }
    }
}