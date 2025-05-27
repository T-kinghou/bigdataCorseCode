package com.hyd.tourism.repository;

import com.hyd.tourism.model.Province;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProvinceRepository extends JpaRepository<Province, Integer> {
    // 根据名称查找省份
    Province findByName(String name);

    // 查找所有省份并按名称排序
    List<Province> findAllByOrderByName();
}