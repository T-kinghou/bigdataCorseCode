package com.hyd.tourism.service;

import com.hyd.tourism.dto.*;
//service层修改
public interface TourismService {
    MapDataDTO getMapData(String year, String season);
    ScenicTypeDTO getScenicTypes(String year, String season);
    VisitorTrendDTO getVisitorTrend(String year, String season);
    TravelTypeDTO getTravelTypes(String year, String season);
    WordCloudDTO getHotScenicWordcloud(String year, String season);
    OverviewDTO getOverview(String year, String season);
    ScenicRankDTO getScenicRank(String year, String season);
    ExportDataDTO exportData(String year, String season);
}