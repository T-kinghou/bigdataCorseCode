package com.example.tourism.repository;

import com.example.tourism.model.TravelType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TravelTypeRepository extends JpaRepository<TravelType, Integer> {
    // 根据名称查找旅游方式
    TravelType findByName(String name);
}