package com.example.tourism.dto;

import java.util.List;

public class WordCloudDTO {
    private List<WordData> data;

    public List<WordData> getData() {
        return data;
    }

    public void setData(List<WordData> data) {
        this.data = data;
    }

    public static class WordData {
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