package com.hyd.tourism.dto;

import lombok.Data;

@Data
public class ExportDataDTO {
    private OverviewDTO overview;
    private MapDataDTO map;

    public OverviewDTO getOverview() {
        return overview;
    }

    public void setOverview(OverviewDTO overview) {
        this.overview = overview;
    }

    public MapDataDTO getMap() {
        return map;
    }

    public void setMap(MapDataDTO map) {
        this.map = map;
    }

    public ScenicTypeDTO getScenicTypes() {
        return scenicTypes;
    }

    public void setScenicTypes(ScenicTypeDTO scenicTypes) {
        this.scenicTypes = scenicTypes;
    }

    public VisitorTrendDTO getVisitorTrend() {
        return visitorTrend;
    }

    public void setVisitorTrend(VisitorTrendDTO visitorTrend) {
        this.visitorTrend = visitorTrend;
    }

    public TravelTypeDTO getTravelTypes() {
        return travelTypes;
    }

    public void setTravelTypes(TravelTypeDTO travelTypes) {
        this.travelTypes = travelTypes;
    }

    public WordCloudDTO getWordCloud() {
        return wordCloud;
    }

    public void setWordCloud(WordCloudDTO wordCloud) {
        this.wordCloud = wordCloud;
    }

    public ScenicRankDTO getScenicRank() {
        return scenicRank;
    }

    public void setScenicRank(ScenicRankDTO scenicRank) {
        this.scenicRank = scenicRank;
    }

    private ScenicTypeDTO scenicTypes;
    private VisitorTrendDTO visitorTrend;
    private TravelTypeDTO travelTypes;
    private WordCloudDTO wordCloud;
    private ScenicRankDTO scenicRank;
}