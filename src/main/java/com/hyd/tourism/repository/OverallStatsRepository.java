package com.hyd.tourism.repository;

import com.hyd.tourism.model.OverallStats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface OverallStatsRepository extends JpaRepository<OverallStats, Integer> {

    @Query("SELECT os FROM OverallStats os WHERE (:year = 'all' OR os.year = :year) AND (:season = 'all' OR os.season = :season) ORDER BY os.year DESC, CASE os.season " +
            "WHEN 'spring' THEN 1 " +
            "WHEN 'summer' THEN 2 " +
            "WHEN 'autumn' THEN 3 " +
            "WHEN 'winter' THEN 4 " +
            "ELSE 5 END DESC LIMIT 1")
    Optional<OverallStats> findLatestByYearAndSeason(@Param("year") String year, @Param("season") String season);
}