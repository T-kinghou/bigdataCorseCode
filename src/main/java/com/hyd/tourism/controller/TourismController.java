package com.hyd.tourism.controller;

import com.hyd.tourism.dto.*;
import com.hyd.tourism.service.TourismService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tourism")
public class TourismController {

    // 添加日志记录器
    private static final Logger logger = LoggerFactory.getLogger(TourismController.class);

    private final TourismService tourismService;

    @Autowired
    public TourismController(TourismService tourismService) {
        this.tourismService = tourismService;
    }

    @GetMapping("/map")
    public ApiResponse<MapDataDTO> getMapData(
            @RequestParam(required = false, defaultValue = "all") String year,
            @RequestParam(required = false, defaultValue = "all") String season) {
        logger.info("获取地图数据: year={}, season={}", year, season);
        MapDataDTO result = tourismService.getMapData(year, season);
        logger.info("地图数据结果: {}", result);
        if (result == null || result.getData() == null || result.getData().isEmpty()) {
            logger.warn("地图数据为空!");
        } else {
            logger.info("地图数据项数: {}, 最大值: {}", result.getData().size(), result.getMax());
        }
        return ApiResponse.success(result);
    }

    @GetMapping("/scenic-types")
    public ApiResponse<ScenicTypeDTO> getScenicTypes(
            @RequestParam(required = false, defaultValue = "all") String year,
            @RequestParam(required = false, defaultValue = "all") String season) {
        logger.info("获取景区类型数据: year={}, season={}", year, season);
        ScenicTypeDTO result = tourismService.getScenicTypes(year, season);

        if (result == null || result.getData() == null || result.getData().isEmpty()) {
            logger.warn("景区类型数据为空!");
        } else {
            logger.info("景区类型数据项数: {}", result.getData().size());
            logger.info("景区类型数据详情: {}", result.getData());
        }

        return ApiResponse.success(result);
    }

    @GetMapping("/visitor-trend")
    public ApiResponse<VisitorTrendDTO> getVisitorTrend(
            @RequestParam(required = false, defaultValue = "all") String year,
            @RequestParam(required = false, defaultValue = "all") String season) {
        logger.info("获取游客趋势数据: year={}, season={}", year, season);
        VisitorTrendDTO result = tourismService.getVisitorTrend(year, season);

        if (result == null || result.getMonths() == null || result.getMonths().isEmpty()) {
            logger.warn("游客趋势数据月份为空!");
        } else {
            logger.info("游客趋势月份数: {}", result.getMonths().size());
            logger.info("游客趋势月份数据: {}", result.getMonths());
        }

        if (result == null || result.getSeries() == null || result.getSeries().isEmpty()) {
            logger.warn("游客趋势系列数据为空!");
        } else {
            logger.info("游客趋势系列数量: {}", result.getSeries().size());
            for (int i = 0; i < result.getSeries().size(); i++) {
                logger.info("系列 {}: 名称={}, 数据大小={}",
                        i,
                        result.getSeries().get(i).getName(),
                        result.getSeries().get(i).getData() != null ? result.getSeries().get(i).getData().size() : 0);
            }
        }

        return ApiResponse.success(result);
    }

    @GetMapping("/travel-types")
    public ApiResponse<TravelTypeDTO> getTravelTypes(
            @RequestParam(required = false, defaultValue = "all") String year,
            @RequestParam(required = false, defaultValue = "all") String season) {
        logger.info("获取旅游方式数据: year={}, season={}", year, season);
        TravelTypeDTO result = tourismService.getTravelTypes(year, season);

        if (result == null) {
            logger.warn("旅游方式数据为空!");
        } else {
            if (result.getCategories() == null || result.getCategories().isEmpty()) {
                logger.warn("旅游方式类别数据为空!");
            } else {
                logger.info("旅游方式类别数量: {}", result.getCategories().size());
                logger.info("旅游方式类别: {}", result.getCategories());
            }

            if (result.getValues() == null || result.getValues().isEmpty()) {
                logger.warn("旅游方式数值数据为空!");
            } else {
                logger.info("旅游方式数值数量: {}", result.getValues().size());
                logger.info("旅游方式数值: {}", result.getValues());
            }
        }

        return ApiResponse.success(result);
    }

    @GetMapping("/hot-scenic-wordcloud")
    public ApiResponse<WordCloudDTO> getHotScenicWordcloud(
            @RequestParam(required = false, defaultValue = "all") String year,
            @RequestParam(required = false, defaultValue = "all") String season) {
        logger.info("获取热门景点词云数据: year={}, season={}", year, season);
        WordCloudDTO result = tourismService.getHotScenicWordcloud(year, season);

        if (result == null || result.getData() == null || result.getData().isEmpty()) {
            logger.warn("热门景点词云数据为空!");
        } else {
            logger.info("热门景点词云数据项数: {}", result.getData().size());
            logger.info("热门景点词云数据前5项: {}",
                    result.getData().size() > 5 ? result.getData().subList(0, 5) : result.getData());
        }

        return ApiResponse.success(result);
    }

    @GetMapping("/overview")
    public ApiResponse<OverviewDTO> getOverview(
            @RequestParam(required = false, defaultValue = "all") String year,
            @RequestParam(required = false, defaultValue = "all") String season) {
        logger.info("获取概览数据: year={}, season={}", year, season);
        OverviewDTO result = tourismService.getOverview(year, season);

        if (result == null) {
            logger.warn("概览数据为空!");
        } else {
            logger.info("概览数据: 总游客={}, 总收入={}, 平均消费={}, 热门目的地={}",
                    result.getTotalTourists(),
                    result.getTotalIncome(),
                    result.getAvgConsume(),
                    result.getHotDestination());
        }

        return ApiResponse.success(result);
    }

    @GetMapping("/scenic-rank")
    public ApiResponse<ScenicRankDTO> getScenicRank(
            @RequestParam(required = false, defaultValue = "all") String year,
            @RequestParam(required = false, defaultValue = "all") String season) {
        logger.info("获取景点排行数据: year={}, season={}", year, season);
        ScenicRankDTO result = tourismService.getScenicRank(year, season);

        if (result == null || result.getData() == null || result.getData().isEmpty()) {
            logger.warn("景点排行数据为空!");
        } else {
            logger.info("景点排行数据项数: {}", result.getData().size());
            logger.info("景点排行数据前5项: {}",
                    result.getData().size() > 5 ? result.getData().subList(0, 5) : result.getData());
        }

        return ApiResponse.success(result);
    }

    @GetMapping("/export")
    public ApiResponse<ExportDataDTO> exportData(
            @RequestParam(required = false, defaultValue = "all") String year,
            @RequestParam(required = false, defaultValue = "all") String season) {
        logger.info("导出数据: year={}, season={}", year, season);
        ExportDataDTO result = tourismService.exportData(year, season);

        if (result == null) {
            logger.warn("导出数据为空!");
        } else {
            logger.info("导出数据已生成");
        }

        return ApiResponse.success(result);
    }
}