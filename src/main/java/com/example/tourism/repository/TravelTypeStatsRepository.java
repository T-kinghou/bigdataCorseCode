package com.example.tourism.repository;

import com.example.tourism.model.TravelTypeStats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TravelTypeStatsRepository extends JpaRepository<TravelTypeStats, Integer> {

    @Query("SELECT tts FROM TravelTypeStats tts JOIN FETCH tts.type WHERE (:year = 'all' OR tts.year = :year) AND (:season = 'all' OR tts.season = :season)")
    List<TravelTypeStats> findByYearAndSeason(@Param("year") String year, @Param("season") String season);
}