package com.example.tourism.repository;

import com.example.tourism.model.ScenicType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScenicTypeRepository extends JpaRepository<ScenicType, Integer> {
    // 根据名称查找景区类型
    ScenicType findByName(String name);
}