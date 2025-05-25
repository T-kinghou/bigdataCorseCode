package com.example.tourism.dto;

import lombok.Data;
import java.util.List;

@Data
public class TravelTypeDTO {
    private List<String> categories;
    private List<Integer> values;

    public List<String> getCategories() {
        return categories;
    }

    public void setCategories(List<String> categories) {
        this.categories = categories;
    }

    public List<Integer> getValues() {
        return values;
    }

    public void setValues(List<Integer> values) {
        this.values = values;
    }
}