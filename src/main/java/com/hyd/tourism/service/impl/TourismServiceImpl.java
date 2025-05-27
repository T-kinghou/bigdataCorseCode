package com.hyd.tourism.service.impl;

import com.hyd.tourism.dto.*;
import com.hyd.tourism.model.*;
import com.hyd.tourism.repository.*;
import com.hyd.tourism.service.TourismService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TourismServiceImpl implements TourismService {

    private final TourismDataRepository tourismDataRepository;
    private final ScenicTypeStatsRepository scenicTypeStatsRepository;
    private final MonthlyVisitorTrendRepository monthlyVisitorTrendRepository;
    private final TravelTypeStatsRepository travelTypeStatsRepository;
    private final ScenicSpotPopularityRepository scenicSpotPopularityRepository;
    private final OverallStatsRepository overallStatsRepository;

    @Autowired
    public TourismServiceImpl(
            TourismDataRepository tourismDataRepository,
            ScenicTypeStatsRepository scenicTypeStatsRepository,
            MonthlyVisitorTrendRepository monthlyVisitorTrendRepository,
            TravelTypeStatsRepository travelTypeStatsRepository,
            ScenicSpotPopularityRepository scenicSpotPopularityRepository,
            OverallStatsRepository overallStatsRepository) {
        this.tourismDataRepository = tourismDataRepository;
        this.scenicTypeStatsRepository = scenicTypeStatsRepository;
        this.monthlyVisitorTrendRepository = monthlyVisitorTrendRepository;
        this.travelTypeStatsRepository = travelTypeStatsRepository;
        this.scenicSpotPopularityRepository = scenicSpotPopularityRepository;
        this.overallStatsRepository = overallStatsRepository;
    }

    @Override
    public MapDataDTO getMapData(String year, String season) {
        MapDataDTO mapData = new MapDataDTO();
        List<MapDataDTO.ProvinceData> provinces = new ArrayList<>();

        // 从数据库获取旅游数据
        List<TourismData> tourismDataList = tourismDataRepository.findByYearAndSeason(year, season);

        // 获取最大游客量
        Integer maxTouristCount = tourismDataRepository.findMaxTouristCount(year, season);

        // 转换为DTO
        for (TourismData data : tourismDataList) {
            MapDataDTO.ProvinceData provinceData = new MapDataDTO.ProvinceData();
            provinceData.setName(data.getProvince().getName());
            provinceData.setValue(data.getTouristCount());
            provinces.add(provinceData);
        }

        mapData.setData(provinces);
        mapData.setMax(maxTouristCount != null ? maxTouristCount : 5000);

        return mapData;
    }

    @Override
    public ScenicTypeDTO getScenicTypes(String year, String season) {
        ScenicTypeDTO scenicTypes = new ScenicTypeDTO();
        List<ScenicTypeDTO.TypeData> types = new ArrayList<>();

        // 从数据库获取景区类型统计数据
        List<ScenicTypeStats> statsData = scenicTypeStatsRepository.findByYearAndSeason(year, season);

        // 转换为DTO
        for (ScenicTypeStats stats : statsData) {
            ScenicTypeDTO.TypeData typeData = new ScenicTypeDTO.TypeData();
            typeData.setName(stats.getType().getName());
            typeData.setValue(stats.getPercentage().intValue());
            types.add(typeData);
        }

        scenicTypes.setData(types);
        return scenicTypes;
    }

    @Override
    public VisitorTrendDTO getVisitorTrend(String year, String season) {
        VisitorTrendDTO trend = new VisitorTrendDTO();

        // 获取月份数据
        List<String> months = List.of("1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月");
        trend.setMonths(months);

        // 获取访客趋势数据
        List<MonthlyVisitorTrend> trendData;
        if ("all".equals(year)) {
            // 如果未指定年份，获取最近一年的数据
            trendData = monthlyVisitorTrendRepository.findByYear(2023);
        } else {
            // 获取指定年份和季节的数据
            trendData = monthlyVisitorTrendRepository.findByYearAndSeason(year, season);
        }

        // 准备月度数据
        List<Integer> monthlyData = new ArrayList<>(12);
        for (int i = 0; i < 12; i++) {
            monthlyData.add(0);  // 默认值
        }

        // 填充实际数据
        for (MonthlyVisitorTrend mvt : trendData) {
            if (mvt.getMonth() >= 1 && mvt.getMonth() <= 12) {
                monthlyData.set(mvt.getMonth() - 1, mvt.getVisitorCount());
            }
        }

        // 构建系列数据
        VisitorTrendDTO.SeriesData series = new VisitorTrendDTO.SeriesData();
        series.setName("国内游客量");
        series.setType("line");
        series.setSmooth(true);
        series.setData(monthlyData);

        List<VisitorTrendDTO.SeriesData> seriesList = new ArrayList<>();
        seriesList.add(series);
        trend.setSeries(seriesList);

        return trend;
    }

    @Override
    public TravelTypeDTO getTravelTypes(String year, String season) {
        TravelTypeDTO travelTypes = new TravelTypeDTO();

        // 从数据库获取旅游方式统计数据
        List<TravelTypeStats> statsData = travelTypeStatsRepository.findByYearAndSeason(year, season);

        // 提取类别和值
        List<String> categories = new ArrayList<>();
        List<Integer> values = new ArrayList<>();

        for (TravelTypeStats stats : statsData) {
            categories.add(stats.getType().getName());
            values.add(stats.getTouristCount());
        }

        travelTypes.setCategories(categories);
        travelTypes.setValues(values);

        return travelTypes;
    }

    @Override
    public WordCloudDTO getHotScenicWordcloud(String year, String season) {
        WordCloudDTO wordCloud = new WordCloudDTO();
        List<WordCloudDTO.WordData> words = new ArrayList<>();

        // 从数据库获取景点热度数据
        List<ScenicSpotPopularity> popularityData = scenicSpotPopularityRepository.findByYearAndSeasonOrderByPopularityDesc(year, season);

        // 转换为词云数据
        for (ScenicSpotPopularity popularity : popularityData) {
            WordCloudDTO.WordData word = new WordCloudDTO.WordData();
            word.setName(popularity.getSpot().getName());
            word.setValue(popularity.getPopularityScore());
            words.add(word);
        }

        wordCloud.setData(words);
        return wordCloud;
    }

    @Override
    public OverviewDTO getOverview(String year, String season) {
        OverviewDTO overview = new OverviewDTO();

        // 从数据库获取总体统计数据
        Optional<OverallStats> statsOptional = overallStatsRepository.findLatestByYearAndSeason(year, season);

        if (statsOptional.isPresent()) {
            OverallStats stats = statsOptional.get();

            // 设置DTO数据
            overview.setTotalTourists(stats.getTotalTourists());
            overview.setTotalTouristsTrend(stats.getTouristsTrend().doubleValue());

            overview.setTotalIncome(stats.getTotalIncome());
            overview.setTotalIncomeTrend(stats.getIncomeTrend().doubleValue());

            overview.setAvgConsume(stats.getAvgConsume());
            overview.setAvgConsumeTrend(stats.getConsumeTrend().doubleValue());

            overview.setHotDestination(stats.getHotDestination());
            overview.setHotDestinationTrend(stats.getDestinationTrend());
        } else {
            // 如果找不到数据，提供默认值
            overview.setTotalTourists(0);
            overview.setTotalTouristsTrend(0.0);

            overview.setTotalIncome(0);
            overview.setTotalIncomeTrend(0.0);

            overview.setAvgConsume(0);
            overview.setAvgConsumeTrend(0.0);

            overview.setHotDestination("无数据");
            overview.setHotDestinationTrend("无数据");
        }

        return overview;
    }

    @Override
    public ScenicRankDTO getScenicRank(String year, String season) {
        ScenicRankDTO scenicRank = new ScenicRankDTO();
        List<ScenicRankDTO.RankData> ranks = new ArrayList<>();

        // 从数据库获取景点热度排名数据
        List<ScenicSpotPopularity> popularityData = scenicSpotPopularityRepository.findByYearAndSeasonOrderByPopularityDesc(year, season);

        // 转换为排行榜数据
        for (ScenicSpotPopularity popularity : popularityData) {
            ScenicRankDTO.RankData rank = new ScenicRankDTO.RankData();
            rank.setName(popularity.getSpot().getName());
            rank.setValue(popularity.getVisitorCount());
            ranks.add(rank);
        }

        // 确保只返回前10个
        if (ranks.size() > 10) {
            ranks = ranks.subList(0, 10);
        }

        scenicRank.setData(ranks);
        return scenicRank;
    }

    @Override
    public ExportDataDTO exportData(String year, String season) {
        ExportDataDTO exportData = new ExportDataDTO();

        // 汇总所有数据
        exportData.setOverview(getOverview(year, season));
        exportData.setMap(getMapData(year, season));
        exportData.setScenicTypes(getScenicTypes(year, season));
        exportData.setVisitorTrend(getVisitorTrend(year, season));
        exportData.setTravelTypes(getTravelTypes(year, season));
        exportData.setWordCloud(getHotScenicWordcloud(year, season));
        exportData.setScenicRank(getScenicRank(year, season));

        return exportData;
    }
}