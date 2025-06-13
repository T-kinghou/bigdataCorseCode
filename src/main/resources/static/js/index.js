$(function() {

    if (!localStorage.getItem('token')) {
        window.location.href = 'login.html';
    }

    $.ajaxSetup({
        beforeSend: function(xhr) {
            const token = localStorage.getItem('token');
            if (token) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            }
        },
        timeout: 30000,
        error: handleAjaxError
    });

    function handleAjaxError(xhr, status, error) {
        if (xhr.status === 401) {
            alert('登录已过期，请重新登录');
            localStorage.removeItem('token');
            window.location.href = 'login.html';
            return;
        }
        // 其他错误处理...
    }

    // API基础URL，根据您的SpringBoot应用设置
    const API_BASE_URL = 'http://localhost:8081/api';

    // 图表实例对象
    let charts = {
        mapChart: null,
        pieChart: null,
        lineChart: null,
        barChart: null,
        wordcloudChart: null
    };

    // 显示加载动画
    function showLoading() {
        $('.loading-container').fadeIn(300);
    }

    // 隐藏加载动画
    function hideLoading() {
        $('.loading-container').fadeOut(300);
    }

    // 显示toast提示
    function showToast(message) {
        const toast = $('<div class="toast">' + message + '</div>');
        $('body').append(toast);
        setTimeout(function() {
            toast.fadeOut(300, function() {
                $(this).remove();
            });
        }, 2000);
    }

    // 格式化日期时间
    function formatDateTime(timestamp) {
        const date = new Date(timestamp);
        return date.getFullYear() + '-' +
            padZero(date.getMonth() + 1) + '-' +
            padZero(date.getDate()) + ' ' +
            padZero(date.getHours()) + ':' +
            padZero(date.getMinutes());
    }

    function padZero(num) {
        return num < 10 ? '0' + num : num;
    }

    // 更新时间显示
    function updateTime(selector, timestamp) {
        $(selector).text('更新时间：' + formatDateTime(timestamp || new Date().getTime()));
    }

    // 时间显示功能
    function startTimeUpdate() {
        const updateTime = function() {
            const dt = new Date();
            const y = dt.getFullYear();
            const mt = dt.getMonth() + 1;
            const day = dt.getDate();
            const h = dt.getHours();
            const m = dt.getMinutes();
            const s = dt.getSeconds();
            document.querySelector(".showTime").innerHTML = "当前时间：" + y + '年' + mt + '月' + day + '日 ' + padZero(h) + ':' + padZero(m) + ':' + padZero(s);
        };

        updateTime();
        setInterval(updateTime, 1000);
    }

    // 初始化地图
    function initMapChart() {
        const chartDom = document.getElementById('mapChart');
        if (!chartDom) {
            console.error('未找到mapChart元素');
            return;
        }

        charts.mapChart = echarts.init(chartDom);

        const option = {
            tooltip: {
                trigger: 'item',
                formatter: '{b}<br/>游客量: {c}万人次'
            },
            visualMap: {
                min: 0,
                max: 5000,
                left: 'left',
                bottom: '5%',
                text: ['高', '低'],
                calculable: true,
                inRange: {
                    color: ['#e0f7ff', '#006edd']
                },
                textStyle: {
                    color: 'rgba(255,255,255,.8)'
                }
            },
            series: [
                {
                    name: '游客量',
                    type: 'map',
                    map: 'china',
                    roam: true,
                    emphasis: {
                        label: {
                            show: true
                        }
                    },
                    itemStyle: {
                        areaColor: '#0c3b6d',
                        borderColor: '#1990ff',
                        borderWidth: 1
                    },
                    data: []
                }
            ]
        };

        charts.mapChart.setOption(option);
        window.addEventListener("resize", function() {
            charts.mapChart.resize();
        });
    }

    // 初始化饼图
    function initPieChart() {
        const chartDom = document.getElementById('pieChart');
        if (!chartDom) {
            console.error('未找到pieChart元素');
            return;
        }

        charts.pieChart = echarts.init(chartDom);

        const option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c}% ({d}%)'
            },
            legend: {
                orient: 'vertical',
                right: 10,
                top: 'center',
                textStyle: {
                    color: "rgba(255,255,255,.8)",
                    fontSize: 12
                }
            },
            series: [
                {
                    name: '景区类型',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 4,
                        borderColor: '#051d3a',
                        borderWidth: 2
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '16',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: []
                }
            ]
        };

        charts.pieChart.setOption(option);
        window.addEventListener("resize", function() {
            charts.pieChart.resize();
        });
    }

    // 初始化折线图
    function initLineChart() {
        const chartDom = document.getElementById('lineChart');
        if (!chartDom) {
            console.error('未找到lineChart元素');
            return;
        }

        charts.lineChart = echarts.init(chartDom);

        const option = {
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                top: '10%',
                left: '3%',
                right: '4%',
                bottom: '8%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: [],
                axisLabel: {
                    color: 'rgba(255,255,255,.6)'
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,.2)'
                    }
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    color: 'rgba(255,255,255,.6)',
                    formatter: '{value}万人次'
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,.1)'
                    }
                }
            },
            series: []
        };

        charts.lineChart.setOption(option);
        window.addEventListener("resize", function() {
            charts.lineChart.resize();
        });
    }

    // 初始化柱状图
    function initBarChart() {
        const chartDom = document.getElementById('barChart');
        if (!chartDom) {
            console.error('未找到barChart元素');
            return;
        }

        charts.barChart = echarts.init(chartDom);

        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                top: '10%',
                left: '3%',
                right: '4%',
                bottom: '8%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: [],
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLabel: {
                        color: 'rgba(255,255,255,.6)',
                        interval: 0,
                        rotate: 40
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,.2)'
                        }
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        color: 'rgba(255,255,255,.6)'
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,.1)'
                        }
                    }
                }
            ],
            series: [
                {
                    name: '游客数量',
                    type: 'bar',
                    barWidth: '60%',
                    data: [],
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#1890ff' },
                            { offset: 1, color: '#36cfc9' }
                        ]),
                        borderRadius: [4, 4, 0, 0]
                    }
                }
            ]
        };

        charts.barChart.setOption(option);
        window.addEventListener("resize", function() {
            charts.barChart.resize();
        });
    }

    // 初始化词云图
    function initWordCloudChart() {
        const chartDom = document.getElementById('wordcloudChart');
        if (!chartDom) {
            console.error('未找到wordcloudChart元素');
            return;
        }

        try {
            charts.wordcloudChart = echarts.init(chartDom);

            // 使用与 echarts-wordcloud 1.1.3 兼容的配置
            const option = {
                series: [{
                    type: 'wordCloud',
                    shape: 'circle',
                    left: 'center',
                    top: 'center',
                    width: '90%',
                    height: '90%',
                    right: null,
                    bottom: null,
                    sizeRange: [12, 50],
                    rotationRange: [-90, 90],
                    rotationStep: 45,
                    gridSize: 8,
                    drawOutOfBound: false,
                    textStyle: {
                        normal: {
                            fontWeight: 'normal',
                            color: function () {
                                return 'rgb(' + [
                                    Math.round(Math.random() * 200 + 55),
                                    Math.round(Math.random() * 150 + 105),
                                    Math.round(Math.random() * 150 + 105)
                                ].join(',') + ')';
                            }
                        },
                        emphasis: {
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    data: [
                        {
                            name: '加载中',
                            value: 100
                        }
                    ]
                }]
            };

            charts.wordcloudChart.setOption(option);
            window.addEventListener("resize", function() {
                if (charts.wordcloudChart) {
                    charts.wordcloudChart.resize();
                }
            });

            console.log('词云图初始化成功');
        } catch(e) {
            console.error('初始化词云图失败:', e);
            showToast('词云图组件加载失败');
        }
    }

    // 加载地图数据
    function loadMapChartData(year = 'all', season = 'all') {
        return $.ajax({
            url: API_BASE_URL + '/tourism/map',
            type: 'GET',
            data: { year: year, season: season },
            success: function(res) {
                console.log('地图数据原始响应:', JSON.stringify(res));

                if (!res || !res.data) {
                    console.error("地图数据格式错误");
                    return;
                }

                // 处理嵌套数据结构
                let mapData = [];
                if (res.data.data && Array.isArray(res.data.data)) {
                    mapData = res.data.data;
                } else if (Array.isArray(res.data)) {
                    mapData = res.data;
                }

                // 省份列表
                const allProvinces = [
                    "北京", "天津", "上海", "重庆", "河北", "山西", "辽宁", "吉林", "黑龙江",
                    "江苏", "浙江", "安徽", "福建", "江西", "山东", "河南", "湖北", "湖南",
                    "广东", "海南", "四川", "贵州", "云南", "陕西", "甘肃", "青海", "台湾",
                    "内蒙古", "广西", "西藏", "宁夏", "新疆", "香港", "澳门"
                ];


                console.log('地图数据原始响应:', JSON.stringify(res));

                console.log('mapData:', mapData)
                // 处理重复省份数据
                const provinceMap = new Map();
                mapData.forEach(item => {
                    if (provinceMap.has(item.name)) {
                        if (item.value > provinceMap.get(item.name)) {
                            provinceMap.set(item.name, item.value);
                        }
                    } else {
                        provinceMap.set(item.name, item.value);
                    }
                });

                // 补全所有省份
                const uniqueData = allProvinces.map(name => ({
                    name,
                    value: provinceMap.get(name) || 0
                }));
                console.log('最终用于渲染的数据:', uniqueData);
                // 找出最大值用于可视化范围设置
                const maxValue = Math.max(...uniqueData.map(item => item.value));

                const option = charts.mapChart.getOption();
                option.series[0].data = uniqueData;
                option.visualMap.max = res.max || maxValue || 5000;
                charts.mapChart.setOption(option);
                updateTime('#mapUpdateTime', res.timestamp || new Date().getTime());
            },
            error: function(err) {
                console.error("获取地图数据失败:", err);
                showToast('获取地图数据失败');
            }
        });
    }

    // 加载饼图数据
    function loadPieChartData(year = 'all', season = 'all') {
        return $.ajax({
            url: API_BASE_URL + '/tourism/scenic-types',
            type: 'GET',
            data: { year: year, season: season },
            success: function(res) {
                console.log('景区类型数据原始响应:', JSON.stringify(res));

                if (!res || !res.data) {
                    console.error("饼图数据格式错误");
                    return;
                }

                // 处理数据格式 - 检查是否有嵌套的data属性
                let typeData = res.data;
                if (res.data.data && Array.isArray(res.data.data)) {
                    typeData = res.data.data;
                }

                // 验证饼图数据格式
                if (!Array.isArray(typeData)) {
                    console.error('景区类型数据不是数组:', typeData);
                    return;
                }

                // 去重处理 - 按类型名称分组
                const typeMap = new Map();
                typeData.forEach(item => {
                    if (typeMap.has(item.name)) {
                        typeMap.set(item.name, typeMap.get(item.name) + item.value);
                    } else {
                        typeMap.set(item.name, item.value);
                    }
                });

                // 转换回数组
                const uniqueData = Array.from(typeMap.entries()).map(([name, value]) => ({
                    name: name,
                    value: value
                }));

                console.log('处理后的景区类型数据:', uniqueData);

                const option = charts.pieChart.getOption();
                option.series[0].data = uniqueData;
                charts.pieChart.setOption(option);
                updateTime('#pieChartUpdateTime', res.timestamp || new Date().getTime());
            },
            error: function(err) {
                console.error("获取景区类型数据失败:", err);
                showToast('获取景区类型数据失败');
            }
        });
    }

    // 加载折线图数据
    function loadLineChartData(year = 'all', season = 'all') {
        return $.ajax({
            url: API_BASE_URL + '/tourism/visitor-trend',
            type: 'GET',
            data: { year: year, season: season },
            success: function(res) {
                console.log('游客趋势数据原始响应:', JSON.stringify(res));

                if (!res || !res.data) {
                    console.error("折线图数据格式错误");
                    return;
                }

                // 处理嵌套数据结构
                let trendData = res.data;
                if (res.data.data) {
                    trendData = res.data.data;
                }

                const option = charts.lineChart.getOption();
                option.xAxis.data = trendData.months || [];
                option.series = (trendData.series || []).map(ser => ({

                    ...ser,

                    label: { show: true, position: 'top', color: '#fff' }

                }));
                charts.lineChart.setOption(option);
                updateTime('#lineChartUpdateTime', res.timestamp || new Date().getTime());
            },
            error: function(err) {
                console.error("获取客流量趋势数据失败:", err);
                showToast('获取客流量趋势数据失败');
            }
        });
    }

    // 加载柱状图数据
    function loadBarChartData(year = 'all', season = 'all') {
        return $.ajax({
            url: API_BASE_URL + '/tourism/travel-types',
            type: 'GET',
            data: { year: year, season: season },
            success: function(res) {
                console.log('旅游方式数据原始响应:', JSON.stringify(res));

                if (!res || !res.data) {
                    console.error("柱状图数据格式错误");
                    return;
                }

                // 处理嵌套数据结构
                let chartData = res.data;
                if (res.data.data) {
                    chartData = res.data.data;
                }

                // 处理重复类别问题
                const categories = chartData.categories || [];
                const values = chartData.values || [];

                // 创建一个Map来去重
                const typeMap = new Map();
                for (let i = 0; i < categories.length; i++) {
                    // 如果已经存在，取最大值
                    if (typeMap.has(categories[i])) {
                        typeMap.set(categories[i], Math.max(typeMap.get(categories[i]), values[i]));
                    } else {
                        typeMap.set(categories[i], values[i]);
                    }
                }

                // 转换回数组
                const uniqueCategories = [...typeMap.keys()];
                const uniqueValues = uniqueCategories.map(cat => typeMap.get(cat));

                console.log('处理后的类别:', uniqueCategories);
                console.log('处理后的数值:', uniqueValues);

                const option = charts.barChart.getOption();
                option.xAxis[0].data = uniqueCategories;
                option.series[0].data = uniqueValues;
                charts.barChart.setOption(option);
                updateTime('#barChartUpdateTime', res.timestamp || new Date().getTime());
            },
            error: function(err) {
                console.error("获取旅游方式数据失败:", err);
                showToast('获取旅游方式数据失败');
            }
        });
    }

    // 加载词云图数据
    function loadWordCloudData(year = 'all', season = 'all') {
        return $.ajax({
            url: API_BASE_URL + '/tourism/hot-scenic-wordcloud',
            type: 'GET',
            data: { year: year, season: season },
            success: function(res) {
                console.log('词云数据原始响应:', JSON.stringify(res));

                if (!res) {
                    console.error("词云数据响应为空");
                    return;
                }

                // 确保data是数组，处理嵌套数据结构
                let wordData = [];
                if (res.data) {
                    if (res.data.data && Array.isArray(res.data.data)) {
                        wordData = res.data.data;
                    } else if (Array.isArray(res.data)) {
                        wordData = res.data;
                    } else if (typeof res.data === 'object') {
                        console.warn("词云数据不是数组格式，尝试转换");
                        wordData = [{ name: res.data.name || "", value: res.data.value || 0 }];
                    }
                }

                // 处理重复项
                const wordMap = new Map();
                wordData.forEach(item => {
                    if (wordMap.has(item.name)) {
                        if (item.value > wordMap.get(item.name)) {
                            wordMap.set(item.name, item.value);
                        }
                    } else {
                        wordMap.set(item.name, item.value);
                    }
                });

                // 转换回数组
                const uniqueWordData = Array.from(wordMap.entries()).map(([name, value]) => ({
                    name: name,
                    value: value
                }));

                try {
                    if (charts.wordcloudChart) {
                        // 与 echarts-wordcloud 1.1.3 兼容的方式更新数据
                        charts.wordcloudChart.setOption({
                            series: [{
                                data: uniqueWordData
                            }]
                        });
                        console.log('词云图数据更新成功，数据项数量:', uniqueWordData.length);
                    } else {
                        console.error("词云图实例不存在");
                    }
                } catch (e) {
                    console.error("设置词云图数据失败:", e);
                }

                updateTime('#wordcloudUpdateTime', res.timestamp || new Date().getTime());
            },
            error: function(err) {
                console.error("获取词云数据失败:", err);
                showToast('获取词云数据失败');
            }
        });
    }

    // 加载核心指标数据
    function loadOverviewData(year = 'all', season = 'all') {
        return $.ajax({
            url: API_BASE_URL + '/tourism/overview',
            type: 'GET',
            data: { year: year, season: season },
            success: function(res) {
                console.log('核心指标数据原始响应:', JSON.stringify(res));

                if (!res || !res.data) {
                    console.error("核心指标数据格式错误");
                    return;
                }

                // 处理嵌套数据结构
                let data = res.data;
                if (res.data.data) {
                    data = res.data.data;
                }

                // 确保数据存在，避免空值错误
                const totalTourists = data.totalTourists || 0;
                const totalTouristsTrend = data.totalTouristsTrend || 0;
                $('#totalTourists .counter').text(totalTourists.toLocaleString() + '万');
                $('#totalTourists .trend').text(totalTouristsTrend > 0 ? '↑ ' + totalTouristsTrend + '%' : '↓ ' + Math.abs(totalTouristsTrend) + '%');
                $('#totalTourists .trend').removeClass('up down').addClass(totalTouristsTrend >= 0 ? 'up' : 'down');

                const totalIncome = data.totalIncome || 0;
                const totalIncomeTrend = data.totalIncomeTrend || 0;
                $('#totalIncome .counter').text(totalIncome.toLocaleString() + '亿');
                $('#totalIncome .trend').text(totalIncomeTrend > 0 ? '↑ ' + totalIncomeTrend + '%' : '↓ ' + Math.abs(totalIncomeTrend) + '%');
                $('#totalIncome .trend').removeClass('up down').addClass(totalIncomeTrend >= 0 ? 'up' : 'down');

                const avgConsume = data.avgConsume || 0;
                const avgConsumeTrend = data.avgConsumeTrend || 0;
                $('#avgConsume .counter').text(avgConsume.toLocaleString() + '元');
                $('#avgConsume .trend').text(avgConsumeTrend > 0 ? '↑ ' + avgConsumeTrend + '%' : '↓ ' + Math.abs(avgConsumeTrend) + '%');
                $('#avgConsume .trend').removeClass('up down').addClass(avgConsumeTrend >= 0 ? 'up' : 'down');

                $('#hotDestination .counter').text(data.hotDestination || '-');
                $('#hotDestination .trend').text(data.hotDestinationTrend || '持平');

                updateTime('#overviewUpdateTime', res.timestamp || new Date().getTime());

                // 数字动画效果
                animateCounter();
            },
            error: function(err) {
                console.error("获取核心指标数据失败:", err);
                showToast('获取核心指标数据失败');
            }
        });
    }

    // 加载排行榜数据
    function loadRankListData(year = 'all', season = 'all') {
        return $.ajax({
            url: API_BASE_URL + '/tourism/scenic-rank',
            type: 'GET',
            data: { year: year, season: season },
            success: function(res) {
                console.log('景点排行数据原始响应:', JSON.stringify(res));

                if (!res || !res.data) {
                    console.error("排行榜数据格式错误");
                    return;
                }

                // 确保data是数组，处理嵌套结构
                let rankData = [];
                if (res.data.data && Array.isArray(res.data.data)) {
                    rankData = res.data.data;
                } else if (Array.isArray(res.data)) {
                    rankData = res.data;
                }

                // 检查数据为空
                if (rankData.length === 0) {
                    console.warn('景点排行数据为空数组');
                    return;
                }

                // 去重处理 - 按景点名称分组，取最大值
                const rankMap = new Map();
                rankData.forEach(item => {
                    if (rankMap.has(item.name)) {
                        if (item.value > rankMap.get(item.name)) {
                            rankMap.set(item.name, item.value);
                        }
                    } else {
                        rankMap.set(item.name, item.value);
                    }
                });

                // 转换回数组并排序
                const uniqueRankData = Array.from(rankMap.entries())
                    .map(([name, value]) => ({ name, value }))
                    .sort((a, b) => b.value - a.value);

                // 清空排行榜内容
                const rankList = $('#rankList');
                if (!rankList.length) {
                    console.error('未找到rankList元素');
                    return;
                }

                rankList.empty();

                // 添加新的排行数据
                uniqueRankData.forEach(function(item, index) {
                    const rankItem = $(`
                        <div class="rank-item">
                            <span class="rank-num">${index + 1}</span>
                            <span class="rank-name">${item.name || '-'}</span>
                            <span class="rank-value">${(item.value || 0).toLocaleString()}万</span>
                        </div>
                    `);
                    rankList.append(rankItem);
                });

                updateTime('#rankUpdateTime', res.timestamp || new Date().getTime());

                // 启动排行榜滚动效果
                startRankRolling();
            },
            error: function(err) {
                console.error("获取排行榜数据失败:", err);
                showToast('获取排行榜数据失败');
            }
        });
    }

    // 导出当前数据
    function exportCurrentData() {
        $.ajax({
            url: API_BASE_URL + '/tourism/export',
            type: 'GET',
            data: {
                year: $('#yearFilter').val(),
                season: $('#seasonFilter').val()
            },
            success: function(res) {
                console.log('导出数据原始响应:', JSON.stringify(res));

                if (!res || !res.data) {
                    showToast('导出数据为空');
                    return;
                }

                // 创建下载链接
                const dataStr = JSON.stringify(res.data, null, 2);
                const blob = new Blob([dataStr], {type: 'application/json'});
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = '中国旅游数据_' + new Date().toISOString().slice(0, 10) + '.json';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);

                showToast('数据导出成功');
            },
            error: function(err) {
                console.error("数据导出失败:", err);
                showToast('数据导出失败');
            }
        });
    }

    // 数字滚动效果
    function animateCounter() {
        $('.counter').each(function() {
            const $this = $(this);
            const countStr = $this.text();

            // 如果是非数字内容(如城市名称)，跳过动画
            if (isNaN(parseFloat(countStr))) {
                return;
            }

            const unit = countStr.replace(/[\d,\.]/g, ''); // 提取单位（万或亿或元）
            const countTo = parseFloat(countStr.replace(/[^\d\.]/g, '')); // 提取数字部分

            $({ countNum: 0 }).animate({
                countNum: countTo
            }, {
                duration: 1000,
                easing: 'swing',
                step: function() {
                    $this.text(this.countNum.toFixed(1).replace(/\.0$/, '') + unit);
                },
                complete: function() {
                    $this.text(countTo.toLocaleString() + unit);
                }
            });
        });
    }

    // 排行榜滚动效果
    function startRankRolling() {
        const rankList = $('#rankList');
        if (!rankList.length) return;

        const rankItems = rankList.find('.rank-item');

        if (rankItems.length > 5) {
            setInterval(function() {
                rankList.animate({marginTop: '-=35px'}, 500, function() {
                    rankList.css('margin-top', 0);
                    rankList.append(rankList.find('.rank-item:first'));
                });
            }, 3000);
        }
    }

    // 初始化所有图表
    function initAllCharts() {
        console.log("开始初始化图表...");
        initMapChart();
        initPieChart();
        initLineChart();
        initBarChart();
        initWordCloudChart();
        console.log("图表初始化完成");
    }

    // 加载所有图表数据
    function loadAllChartData(year = '2021', season = 'all') {
        console.log('加载数据，参数: year=' + year + ', season=' + season);
        showLoading();

        // 并行加载所有数据
        $.when(
            loadMapChartData(year, season),
            loadPieChartData(year, season),
            loadLineChartData(year, season),
            loadBarChartData(year, season),
            loadWordCloudData(year, season),
            loadOverviewData(year, season),
            loadRankListData(year, season)
        ).done(function() {
            // 所有数据加载完成后隐藏加载动画
            hideLoading();
            console.log('所有数据加载完成');
        }).fail(function(error) {
            console.error("加载数据失败:", error);
            hideLoading();
            showToast('部分数据加载失败');
        });
    }

    // 页面事件绑定
    function bindEvents() {
        // 筛选按钮点击事件
        $('#filterBtn').on('click', function() {
            const year = $('#yearFilter').val();
            const season = $('#seasonFilter').val();
            console.log('筛选按钮点击: year=' + year + ', season=' + season);
            loadAllChartData(year, season);
        });

        // 刷新数据按钮
        $('#refreshBtn').on('click', function() {
            const year = $('#yearFilter').val();
            const season = $('#seasonFilter').val();
            console.log('刷新按钮点击: year=' + year + ', season=' + season);
            refreshData(year, season);
        });

        // 导出数据按钮
        $('#exportBtn').on('click', function() {
            console.log('导出按钮点击');
            exportCurrentData();
        });

        // 全屏按钮点击事件
        $('#fullscreenBtn').on('click', function() {
            toggleFullScreen();
        });
    }

    // 全屏切换功能
    function toggleFullScreen() {
        if (!document.fullscreenElement &&    // 标准方法
            !document.mozFullScreenElement && // Firefox
            !document.webkitFullscreenElement && // Chrome, Safari, Opera
            !document.msFullscreenElement) {  // IE/Edge
            // 进入全屏
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            }
            $('.icon-fullscreen').removeClass('fa-expand').addClass('fa-compress');
        } else {
            // 退出全屏
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            $('.icon-fullscreen').removeClass('fa-compress').addClass('fa-expand');
        }
    }

    // 页面初始化函数
    function initPage() {
        console.log('开始初始化页面');
        // 默认选择2021年
        $('#yearFilter').val('2021');
        // 默认选择全部季节
        $('#seasonFilter').val('all');

        // 启动时间显示
        startTimeUpdate();

        // 初始化所有图表
        initAllCharts();

        // 绑定事件
        bindEvents();

        // 加载初始数据
        loadAllChartData('2021', 'all');

        console.log('页面初始化完成');
    }

    // 刷新所有数据
    function refreshData(year, season) {
        console.log('开始刷新数据: year=' + year + ', season=' + season);
        showLoading();

        // 加载各个模块数据
        $.when(
            loadMapChartData(year, season),
            loadPieChartData(year, season),
            loadLineChartData(year, season),
            loadBarChartData(year, season),
            loadWordCloudData(year, season),
            loadOverviewData(year, season),
            loadRankListData(year, season)
        ).done(function() {
            hideLoading();
            showToast('数据刷新成功');
            console.log('数据刷新完成');
        }).fail(function(error) {
            console.error("刷新数据失败:", error);
            hideLoading();
            showToast('部分数据刷新失败');
        });
    }

    // 错误处理函数
    function handleAjaxError(xhr, status, error) {
        console.error('AJAX请求失败: ' + status + ', ' + error);
        if (xhr.status === 0) {
            showToast('网络连接失败，请检查网络');
        } else if (xhr.status === 404) {
            showToast('请求的资源不存在 (404)');
        } else if (xhr.status === 500) {
            showToast('服务器内部错误 (500)');
        } else if (status === 'parsererror') {
            showToast('返回数据格式错误');
        } else if (status === 'timeout') {
            showToast('请求超时');
        } else {
            showToast('未知错误: ' + error);
        }
    }

    // 设置全局AJAX默认值
    $.ajaxSetup({
        timeout: 30000, // 30秒超时
        error: handleAjaxError
    });

    // 检测窗口大小变化，重绘图表
    $(window).resize(function() {
        for (let key in charts) {
            if (charts[key]) {
                charts[key].resize();
            }
        }
    });

    // 初始化页面
    initPage();
});