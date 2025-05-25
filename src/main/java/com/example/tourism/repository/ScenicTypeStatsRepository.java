package com.example.tourism.repository;

import com.example.tourism.model.ScenicTypeStats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ScenicTypeStatsRepository extends JpaRepository<ScenicTypeStats, Integer> {

    @Query("SELECT sts FROM ScenicTypeStats sts JOIN FETCH sts.type WHERE (:year = 'all' OR sts.year = :year) AND (:season = 'all' OR sts.season = :season)")
    List<ScenicTypeStats> findByYearAndSeason(@Param("year") String year, @Param("season") String season);
}