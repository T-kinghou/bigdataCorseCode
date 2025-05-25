package com.example.tourism.repository;

import com.example.tourism.model.Province;
import com.example.tourism.model.ScenicSpot;
import com.example.tourism.model.ScenicType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScenicSpotRepository extends JpaRepository<ScenicSpot, Integer> {
    // 根据名称查找景点
    ScenicSpot findByName(String name);

    // 根据省份查找景点
    List<ScenicSpot> findByProvince(Province province);

    // 根据景点类型查找景点
    List<ScenicSpot> findByType(ScenicType type);

    // 根据省份和类型查找景点
    List<ScenicSpot> findByProvinceAndType(Province province, ScenicType type);
}