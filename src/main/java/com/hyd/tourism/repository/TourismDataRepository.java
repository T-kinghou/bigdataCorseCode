package com.hyd.tourism.repository;

import com.hyd.tourism.model.TourismData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TourismDataRepository extends JpaRepository<TourismData, Integer> {

    @Query("SELECT td FROM TourismData td WHERE (:year = 'all' OR td.year = :year) AND (:season = 'all' OR td.season = :season)")
    List<TourismData> findByYearAndSeason(@Param("year") String year, @Param("season") String season);

    @Query("SELECT MAX(td.touristCount) FROM TourismData td WHERE (:year = 'all' OR td.year = :year) AND (:season = 'all' OR td.season = :season)")
    Integer findMaxTouristCount(@Param("year") String year, @Param("season") String season);
}