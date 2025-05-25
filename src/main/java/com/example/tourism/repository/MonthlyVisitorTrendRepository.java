package com.example.tourism.repository;

import com.example.tourism.model.MonthlyVisitorTrend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MonthlyVisitorTrendRepository extends JpaRepository<MonthlyVisitorTrend, Integer> {

    @Query("SELECT mvt FROM MonthlyVisitorTrend mvt WHERE (:year = 'all' OR mvt.year = :year) AND (:season = 'all' OR mvt.season = :season) ORDER BY mvt.month")
    List<MonthlyVisitorTrend> findByYearAndSeason(@Param("year") String year, @Param("season") String season);

    @Query("SELECT mvt FROM MonthlyVisitorTrend mvt WHERE mvt.year = :year ORDER BY mvt.month")
    List<MonthlyVisitorTrend> findByYear(@Param("year") Integer year);
}