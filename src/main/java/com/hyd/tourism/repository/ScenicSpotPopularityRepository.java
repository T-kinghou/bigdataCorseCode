package com.hyd.tourism.repository;

import com.hyd.tourism.model.ScenicSpotPopularity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ScenicSpotPopularityRepository extends JpaRepository<ScenicSpotPopularity, Integer> {

    @Query("SELECT ssp FROM ScenicSpotPopularity ssp JOIN FETCH ssp.spot WHERE (:year = 'all' OR ssp.year = :year) AND (:season = 'all' OR ssp.season = :season) ORDER BY ssp.popularityScore DESC")
    List<ScenicSpotPopularity> findByYearAndSeasonOrderByPopularityDesc(@Param("year") String year, @Param("season") String season);
}