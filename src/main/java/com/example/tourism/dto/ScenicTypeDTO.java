package com.example.tourism.dto;

import java.util.List;

public class ScenicTypeDTO {
    private List<TypeData> data;

    public List<TypeData> getData() {
        return data;
    }

    public void setData(List<TypeData> data) {
        this.data = data;
    }

    public static class TypeData {
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