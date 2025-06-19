// 柱状图模块1 - 不同行业职位需求数量
(function() {
    // 实例化对象
    const myChart = echarts.init(document.querySelector(".bar .chart"));

    // 指定基础配置项
    let option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (params) {
                return '<div>'+ params[0].name +'行业<br>' + '发布' + '<span style="color: #00BFFF;">'+params[0].value + '</span>个招聘需求'+'</div>';
            }
        },
        xAxis: {
            type: 'category',
            data: [],
            axisLabel: {
                color: "rgba(255,255,255,.6)",
                fontSize: "12",
                show: true,
                interval: 0,
                formatter: function (params) {
                    var newParamsName = "";
                    var paramsNameNumber = params.length;
                    var provideNumber = 4;
                    var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                    if (paramsNameNumber > provideNumber){
                        for (var p = 0;p < rowNumber; p++){
                            var tempStr = "";
                            var start = p * provideNumber;
                            var end = start + provideNumber;
                            if (p == rowNumber - 1 ){
                                tempStr = params.substring(start, paramsNameNumber);
                            } else{
                                tempStr = params.substring(start, end) + "\n"
                            }
                            newParamsName += tempStr;
                        }
                    } else {
                        newParamsName = params;
                    }
                    return newParamsName;
                }
            },
            axisLine: {
                show: false
            },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: "rgba(255,255,255,.6)",
                fontSize: 12,
            },
            axisLine: {
                lineStyle: {
                    color: "rgba(255,255,255,.1)",
                    width: 2,
                },
            },
            splitLine: {
                lineStyle: {
                    color: "rgba(255,255,255,.1)",
                }
            }
        },
        series: [{
            type: 'bar',
            barWidth: '35%',
            itemStyle: {
                barBorderRadius: 5,
            },
            data: []
        }],
        color: ["#2f89cf"],
        grid: {
            left: "0%",
            top: "10px",
            right: "0%",
            bottom: "4%",
            containLabel: true
        },
    };

    // 先渲染空配置
    myChart.setOption(option);

    // 调用后端接口获取数据
    $.ajax({
        url: 'http://localhost:8081/api/view/getIndustryData',
        type: 'GET',
        dataType: 'json',
        success: function(res) {
            const data = res.data;
            const xAxisData = data.map(item => item.indName);
            const seriesData = data.map(item => item.value);

            // 更新图表配置
            myChart.setOption({
                xAxis: {
                    data: xAxisData
                },
                series: [{
                    data: seriesData
                }]
            });
        },
        error: function(err) {
            console.error('获取行业数据失败:', err);
        }
    });

    // 窗口大小变化时，图表自适应
    window.addEventListener("resize", function() {
        myChart.resize();
    });
})();

// 条形图【柱状图2】- 热门岗位
(function () {
    // 实例化对象
    const myChart = echarts.init(document.querySelector(".bar2 .chart"));

    // 定义颜色
    var myColor = ["#FF0000", "#FF6347", "#FA8072", "#FF4500", "#FF8C00", "#F4A460"];

    // 指定配置
    let option = {
        grid: {
            top: '10%',
            left: '22%',
            bottom: '10%',
        },
        xAxis: {
            show: false,
        },
        yAxis: [
            {
                type: 'category',
                data: [],
                inverse: true,
                axisLine:{
                    show: false,
                },
                axisTick:{
                    show: false,
                },
                axisLabel: {
                    color: 'rgba(255,255,255,1)'
                }
            },
            {
                show: true,
                inverse: true,
                offset: -25,
                data: [],
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: {
                    color: "#fff",
                    fontSize: 12,
                    formatter: function(value) {
                        return value.toLocaleString();
                    }
                }
            }
        ],
        series: [
            {
                name: '岗位需求百分比',
                type: 'bar',
                data: [],
                itemStyle: {
                    barBorderRadius: 20,
                    color: function (params) {
                        return myColor[params.dataIndex % myColor.length];
                    }
                },
                barCategoryGap: '5%',
                barWidth: 20,
                label: {
                    show: true,
                    position: "insideRight",
                    formatter: "{c}%",
                }
            },
            {
                name: '框',
                type: 'bar',
                barWidth: 20,
                yAxisIndex: 1,
                itemStyle: {
                    color: "none",
                    borderColor: "#00c1de",
                    borderWidth: 0,
                    barBorderRadius: 15,
                }
            }
        ]
    };

    // 先渲染空配置
    myChart.setOption(option);

    // 调用后端接口获取数据
    $.ajax({
        url: 'http://localhost:8081/api/view/getJobItemData',
        type: 'GET',
        dataType: 'json',
        success: function(res) {
            const data = res.data;
            const jobNames = data.map(item => item.jobName);
            const counts = data.map(item => item.count);
            const percentages = data.map(item => Math.round(item.count / item.total * 100));
            const frameData = new Array(data.length).fill(100);

            // 更新图表配置
            myChart.setOption({
                yAxis: [
                    {
                        data: jobNames
                    },
                    {
                        data: counts
                    }
                ],
                series: [
                    {
                        data: percentages
                    },
                    {
                        data: frameData
                    }
                ]
            });
        },
        error: function(err) {
            console.error('获取岗位数据失败:', err);
        }
    });

    // 窗口大小变化时，图表自适应
    window.addEventListener("resize", function() {
        myChart.resize();
    });
})();

// 折线图1 - 国内外需求分析
(function() {
    // 实例化对象
    const myChart = echarts.init(document.querySelector(".line .chart"));

    // 存储年度数据
    let yearData = {
        '2024': [[], []],
        '2025': [[], []]
    };

    // 指定配置
    let option = {
        color: ["#00f2f1", "#ed3f35"],
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            textStyle: {
                color: '#4c9bfd'
            },
            right: '25%',
            data: ['国内需求数', '国外需求数']
        },
        grid: {
            top: '15%',
            left: '2%',
            right: '3%',
            bottom: '2%',
            show: true,
            borderColor: '#012f4a',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#4c9bfd'
            },
            axisLine: {
                show: false
            },
        },
        yAxis: {
            type: 'value',
            axisTick: {
                show: false
            },
            splitLine: {
                lineStyle: {
                    color: '#012f4a'
                }
            },
            axisLabel: {
                color: '#4c9bfd'
            },
        },
        series: [
            {
                name: '国内需求数',
                type: 'line',
                data: [],
                smooth: true,
            },
            {
                name: '国外需求数',
                type: 'line',
                data: [],
                smooth: true,
            }
        ]
    };

    // 先渲染空配置
    myChart.setOption(option);

    // 调用后端接口获取数据
    $.ajax({
        url: 'http://localhost:8081/api/view/getJobSupplierDemanderData',
        type: 'GET',
        dataType: 'json',
        success: function(res) {
            const data = res.data;

            // 处理并分类数据
            const domestic2022 = Array(12).fill(0);
            const foreign2022 = Array(12).fill(0);
            const domestic2023 = Array(12).fill(0);
            const foreign2023 = Array(12).fill(0);

            data.forEach(item => {
                const year = item.date.substring(0, 4);
                const month = parseInt(item.date.substring(5, 7)) - 1; // 月份索引从0开始

                if (year === '2022') {
                    if (item.type === 0) {
                        domestic2022[month] = item.count;
                    } else if (item.type === 1) {
                        foreign2022[month] = item.count;
                    }
                } else if (year === '2023') {
                    if (item.type === 0) {
                        domestic2023[month] = item.count;
                    } else if (item.type === 1) {
                        foreign2023[month] = item.count;
                    }
                }
            });

            // 存储数据以便点击切换
            yearData['2024'] = [domestic2022, foreign2022];
            yearData['2025'] = [domestic2023, foreign2023];

            // 默认显示2024年数据
            myChart.setOption({
                series: [
                    {
                        data: domestic2022
                    },
                    {
                        data: foreign2022
                    }
                ]
            });
        },
        error: function(err) {
            console.error('获取需求分析数据失败:', err);
        }
    });

    // 点击切换年份事件
    $(".line h2").on("click", "a", function() {
        const year = $(this).text();
        const yearIndex = year === '2024' ? '2024' : '2025';

        myChart.setOption({
            series: [
                {
                    data: yearData[yearIndex][0]
                },
                {
                    data: yearData[yearIndex][1]
                }
            ]
        });
    });

    // 窗口大小变化时，图表自适应
    window.addEventListener("resize", function() {
        myChart.resize();
    });
})();

// 折线图2 - 岗位需求数量（月）
(function() {
    // 实例化对象
    const myChart = echarts.init(document.querySelector(".line2 .chart"));

    // 指定配置
    let option = {
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            top: "0%",
            textStyle: {
                color: "rgba(255,255,255,.5)",
                fontSize: "12"
            },
            data: []
        },
        grid: {
            left: "5",
            top: "30",
            right: "10",
            bottom: "10",
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: [],
                axisLabel: {
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize: 12
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: "rgba(255,255,255,.6)"
                    }
                },
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisTick: { show: false },
                axisLine: {
                    lineStyle: {
                        color: "rgba(255,255,255,.1)"
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize: 12
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: "rgba(255,255,255,.1)"
                    }
                }
            }
        ],
        series: [
            {
                name: '',
                type: 'line',
                emphasis: { focus: 'series' },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            { offset: 0, color: "rgba(1, 132, 213, 0.4)" },
                            { offset: 0.8, color: "rgba(1, 132, 213, 0.1)" }
                        ],
                        false
                    ),
                    shadowColor: "rgba(0, 0, 0, 0.1)"
                },
                data: [],
                smooth: true,
                lineStyle: { color: "#0184d5", width: 2 },
                symbol: "circle",
                symbolSize: 8,
                showSymbol: false,
                itemStyle: {
                    color: "#0184d5",
                    borderColor: "rgba(221, 220, 107, .1)",
                    borderWidth: 12
                },
            },
            {
                name: '',
                type: 'line',
                emphasis: { focus: 'series' },
                data: [],
                smooth: true,
                lineStyle: {
                    normal: { color: "#00d887", width: 2 }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                { offset: 0, color: "rgba(0, 216, 135, 0.4)" },
                                { offset: 0.8, color: "rgba(0, 216, 135, 0.1)" }
                            ],
                            false
                        ),
                        shadowColor: "rgba(0, 0, 0, 0.1)"
                    }
                },
                symbol: "circle",
                symbolSize: 8,
                showSymbol: false,
                itemStyle: {
                    color: "#00d887",
                    borderColor: "rgba(221, 220, 107, .1)",
                    borderWidth: 12
                },
            }
        ]
    };

    // 先渲染空配置
    myChart.setOption(option);

    // 调用后端接口获取数据
    $.ajax({
        url: 'http://localhost:8081/api/view/getJobMChange',
        type: 'GET',
        dataType: 'json',
        success: function(res) {
            const data = res.data;
            let xAxisData = [];
            let type1Data = [];
            let type2Data = [];
            let type1Name = '';
            let type2Name = '';

            // 按类型分组数据
            data.forEach(item => {
                if (item.type === '01') {
                    xAxisData.push(item.date);
                    type1Data.push(item.count);
                    type1Name = '类型01';
                } else if (item.type === '12') {
                    type2Data.push(item.count);
                    type2Name = '类型12';
                }
            });

            // 更新图表配置
            myChart.setOption({
                legend: {
                    data: [type1Name, type2Name]
                },
                xAxis: [{
                    data: xAxisData
                }],
                series: [
                    {
                        name: type1Name,
                        data: type1Data
                    },
                    {
                        name: type2Name,
                        data: type2Data
                    }
                ]
            });
        },
        error: function(err) {
            console.error('获取岗位月度变化数据失败:', err);
        }
    });

    // 窗口大小变化时，图表自适应
    window.addEventListener("resize", function() {
        myChart.resize();
    });
})();

// 饼形图1 - 薪资分布
(function() {
    // 实例化对象
    const myChart = echarts.init(document.querySelector(".pie .chart"));

    // 指定配置
    let option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            bottom: '0%',
            left: 'center',
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                color: "rgba(255,255,255,.5)",
                fontSize: "12"
            },
        },
        series: [
            {
                name: '薪资分布',
                type: 'pie',
                radius: ['40%', '60%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 20,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false,
                },
                data: [],
                center: ["50%", "40%"],
                color: ["#065aab", "#066eab", "#0682ab", "#0696ab", "#06a0ab"],
            }
        ]
    };

    // 先渲染空配置
    myChart.setOption(option);

    // 调用后端接口获取数据
    $.ajax({
        url: 'http://localhost:8081/api/view/getSalRangeData',
        type: 'GET',
        dataType: 'json',
        success: function(res) {
            const data = res.data;

            myChart.setOption({
                series: [{
                    data: data
                }]
            });
        },
        error: function(err) {
            console.error('获取薪资分布数据失败:', err);
        }
    });

    // 窗口大小变化时，图表自适应
    window.addEventListener("resize", function() {
        myChart.resize();
    });
})();

// 饼形图2 - 南丁格尔玫瑰图(就业城市)
(function() {
    // 实例化对象
    const myChart = echarts.init(document.querySelector(".pie2 .chart"));

    // 指定配置
    let option = {
        series: [
            {
                name: '就业城市分布',
                type: 'pie',
                itemStyle: {
                    borderRadius: 8
                },
                data: [],
                color: [
                    '#006cff', '#60cda0', '#ed8884', '#ff9f7f',
                    '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'
                ],
                radius: ['10%', '70%'],
                roseType: "radius",
                center: ['50%', '50%'],
                label: {
                    fontSize: 14,
                },
                labelLine: {
                    length: 12,
                    length2: 8,
                }
            }
        ]
    };

    // 先渲染空配置
    myChart.setOption(option);

    // 调用后端接口获取数据
    $.ajax({
        url: 'http://localhost:8081/api/view/getAreaData',
        type: 'GET',
        dataType: 'json',
        success: function(res) {
            const data = res.data;

            myChart.setOption({
                series: [{
                    data: data
                }]
            });
        },
        error: function(err) {
            console.error('获取就业城市数据失败:', err);
        }
    });

    // 窗口大小变化时，图表自适应
    window.addEventListener("resize", function() {
        myChart.resize();
    });
})();

// 模拟飞行路线模块地图模块
(function() {
    // 实例化对象
    var myChart = echarts.init(document.querySelector(".map .echart"));

    // 地理坐标数据
    var geoCoordMap = {
        上海: [121.4648, 31.2891],
        东莞: [113.8953, 22.901],
        东营: [118.7073, 37.5513],
        中山: [113.4229, 22.478],
        临汾: [111.4783, 36.1615],
        临沂: [118.3118, 35.2936],
        丹东: [124.541, 40.4242],
        丽水: [119.5642, 28.1854],
        乌鲁木齐: [87.9236, 43.5883],
        佛山: [112.8955, 23.1097],
        保定: [115.0488, 39.0948],
        兰州: [103.5901, 36.3043],
        包头: [110.3467, 41.4899],
        北京: [116.4551, 40.2539],
        北海: [109.314, 21.6211],
        南京: [118.8062, 31.9208],
        南宁: [108.479, 23.1152],
        南昌: [116.0046, 28.6633],
        南通: [121.1023, 32.1625],
        厦门: [118.1689, 24.6478],
        台州: [121.1353, 28.6688],
        合肥: [117.29, 32.0581],
        呼和浩特: [111.4124, 40.4901],
        咸阳: [108.4131, 34.8706],
        哈尔滨: [127.9688, 45.368],
        唐山: [118.4766, 39.6826],
        嘉兴: [120.9155, 30.6354],
        大同: [113.7854, 39.8035],
        大连: [122.2229, 39.4409],
        天津: [117.4219, 39.4189],
        太原: [112.3352, 37.9413],
        威海: [121.9482, 37.1393],
        宁波: [121.5967, 29.6466],
        宝鸡: [107.1826, 34.3433],
        宿迁: [118.5535, 33.7775],
        常州: [119.4543, 31.5582],
        广州: [113.5107, 23.2196],
        廊坊: [116.521, 39.0509],
        延安: [109.1052, 36.4252],
        张家口: [115.1477, 40.8527],
        徐州: [117.5208, 34.3268],
        德州: [116.6858, 37.2107],
        惠州: [114.6204, 23.1647],
        成都: [103.9526, 30.7617],
        扬州: [119.4653, 32.8162],
        承德: [117.5757, 41.4075],
        拉萨: [91.1865, 30.1465],
        无锡: [120.3442, 31.5527],
        日照: [119.2786, 35.5023],
        昆明: [102.9199, 25.4663],
        杭州: [119.5313, 29.8773],
        枣庄: [117.323, 34.8926],
        柳州: [109.3799, 24.9774],
        株洲: [113.5327, 27.0319],
        武汉: [114.3896, 30.6628],
        汕头: [117.1692, 23.3405],
        江门: [112.6318, 22.1484],
        沈阳: [123.1238, 42.1216],
        沧州: [116.8286, 38.2104],
        河源: [114.917, 23.9722],
        泉州: [118.3228, 25.1147],
        泰安: [117.0264, 36.0516],
        泰州: [120.0586, 32.5525],
        济南: [117.1582, 36.8701],
        济宁: [116.8286, 35.3375],
        海口: [110.3893, 19.8516],
        淄博: [118.0371, 36.6064],
        淮安: [118.927, 33.4039],
        深圳: [114.5435, 22.5439],
        清远: [112.9175, 24.3292],
        温州: [120.498, 27.8119],
        渭南: [109.7864, 35.0299],
        湖州: [119.8608, 30.7782],
        湘潭: [112.5439, 27.7075],
        滨州: [117.8174, 37.4963],
        潍坊: [119.0918, 36.524],
        烟台: [120.7397, 37.5128],
        玉溪: [101.9312, 23.8898],
        珠海: [113.7305, 22.1155],
        盐城: [120.2234, 33.5577],
        盘锦: [121.9482, 41.0449],
        石家庄: [114.4995, 38.1006],
        福州: [119.4543, 25.9222],
        秦皇岛: [119.2126, 40.0232],
        绍兴: [120.564, 29.7565],
        聊城: [115.9167, 36.4032],
        肇庆: [112.1265, 23.5822],
        舟山: [122.2559, 30.2234],
        苏州: [120.6519, 31.3989],
        莱芜: [117.6526, 36.2714],
        菏泽: [115.6201, 35.2057],
        营口: [122.4316, 40.4297],
        葫芦岛: [120.1575, 40.578],
        衡水: [115.8838, 37.7161],
        衢州: [118.6853, 28.8666],
        西宁: [101.4038, 36.8207],
        西安: [109.1162, 34.2004],
        贵阳: [106.6992, 26.7682],
        连云港: [119.1248, 34.552],
        邢台: [114.8071, 37.2821],
        邯郸: [114.4775, 36.535],
        郑州: [113.4668, 34.6234],
        鄂尔多斯: [108.9734, 39.2487],
        重庆: [107.7539, 30.1904],
        金华: [120.0037, 29.1028],
        铜川: [109.0393, 35.1947],
        银川: [106.3586, 38.1775],
        镇江: [119.4763, 31.9702],
        长春: [125.8154, 44.2584],
        长沙: [113.0823, 28.2568],
        长治: [112.8625, 36.4746],
        阳泉: [113.4778, 38.0951],
        青岛: [120.4651, 36.3373],
        韶关: [113.7964, 24.7028]
    };

    // 示例迁徙路线数据 (可以通过API替换)
    var XAData = [
        [{ name: "北京" }, { name: "拉萨", value: 100 }],
        [{ name: "北京" }, { name: "上海", value: 100 }],
        [{ name: "北京" }, { name: "广州", value: 100 }],
        [{ name: "北京" }, { name: "西宁", value: 100 }],
        [{ name: "北京" }, { name: "银川", value: 100 }]
    ];

    var XNData = [
        [{ name: "贵阳" }, { name: "北京", value: 100 }],
        [{ name: "贵阳" }, { name: "上海", value: 100 }],
        [{ name: "贵阳" }, { name: "广州", value: 100 }],
        [{ name: "安顺" }, { name: "西安", value: 100 }],
        [{ name: "安顺" }, { name: "银川", value: 100 }]
    ];

    var YCData = [
        [{ name: "杭州" }, { name: "潍坊", value: 100 }],
        [{ name: "上海" }, { name: "哈尔滨", value: 100 }],
        [{ name: "深圳" }, { name: "上海", value: 100 }],
        [{ name: "上海" }, { name: "西安", value: 100 }],
        [{ name: "上海" }, { name: "西宁", value: 100 }]
    ];

    // 飞机图标路径
    var planePath = "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z";

    // 转换数据格式
    var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var fromCoord = geoCoordMap[dataItem[0].name];
            var toCoord = geoCoordMap[dataItem[1].name];
            if (fromCoord && toCoord) {
                res.push({
                    fromName: dataItem[0].name,
                    toName: dataItem[1].name,
                    coords: [fromCoord, toCoord],
                    value: dataItem[1].value
                });
            }
        }
        return res;
    };

    // 线条颜色
    var color = ["#a6c84c", "#ffa022", "#46bee9"];

    // 生成Series数据
    var series = [];
    [
        ["北京", XAData],
        ["贵阳", XNData],
        ["上海", YCData]
    ].forEach(function(item, i) {
        series.push(
            {
                name: item[0] + " Top3",
                type: "lines",
                zlevel: 1,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0.7,
                    color: "red",
                    symbolSize: 3
                },
                lineStyle: {
                    normal: {
                        color: color[i],
                        width: 0,
                        curveness: 0.2
                    }
                },
                data: convertData(item[1])
            },
            {
                name: item[0] + " Top3",
                type: "lines",
                zlevel: 2,
                symbol: ["none", "arrow"],
                symbolSize: 10,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0,
                    symbol: planePath,
                    symbolSize: 15
                },
                lineStyle: {
                    normal: {
                        color: color[i],
                        width: 1,
                        opacity: 0.6,
                        curveness: 0.2
                    }
                },
                data: convertData(item[1])
            },
            {
                name: item[0] + " Top3",
                type: "effectScatter",
                coordinateSystem: "geo",
                zlevel: 2,
                rippleEffect: {
                    brushType: "stroke"
                },
                label: {
                    normal: {
                        show: true,
                        position: "right",
                        formatter: "{b}"
                    }
                },
                symbolSize: function(val) {
                    return val[2] / 8;
                },
                itemStyle: {
                    normal: {
                        color: color[i]
                    },
                    emphasis: {
                        areaColor: "#2B91B7"
                    }
                },
                data: item[1].map(function(dataItem) {
                    return {
                        name: dataItem[1].name,
                        value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                    };
                })
            }
        );
    });

    // 地图配置
    var option = {
        tooltip: {
            trigger: "item",
            formatter: function(params, ticket, callback) {
                if (params.seriesType == "effectScatter") {
                    return "线路：" + params.data.name + "" + params.data.value[2];
                } else if (params.seriesType == "lines") {
                    return (
                        params.data.fromName +
                        ">" +
                        params.data.toName +
                        "<br />" +
                        params.data.value
                    );
                } else {
                    return params.name;
                }
            }
        },
        legend: {
            orient: "vertical",
            top: "bottom",
            left: "right",
            data: ["北京 Top3", "贵阳 Top3", "上海 Top3"],
            textStyle: {
                color: "#fff"
            },
            selectedMode: "multiple"
        },
        geo: {
            map: "china",
            label: {
                emphasis: {
                    show: true,
                    color: "#fff"
                }
            },
            zoom: 1.2,
            roam: false,
            itemStyle: {
                normal: {
                    areaColor: "rgba(20, 41, 87,0.6)",
                    borderColor: "#195BB9",
                    borderWidth: 1
                },
                emphasis: {
                    areaColor: "#2B91B7"
                }
            }
        },
        series: series
    };

    // 使用配置项
    myChart.setOption(option);

    // 窗口大小变化时，图表自适应
    window.addEventListener("resize", function() {
        myChart.resize();
    });
})();