package com.example.tourism.dto;

import java.util.List;

public class ScenicRankDTO {
    private List<RankData> data;

    public List<RankData> getData() {
        return data;
    }

    public void setData(List<RankData> data) {
        this.data = data;
    }

    public static class RankData {
        private Integer rank;
        private String name;
        private Integer value;

        public Integer getRank() {
            return rank;
        }

        public void setRank(Integer rank) {
            this.rank = rank;
        }

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