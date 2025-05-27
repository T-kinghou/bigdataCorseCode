// 柱状图模块1
(function() {
// 1实例化对象
    const myChartb1 = echarts.init(document.querySelector(".bar .chart"));

// 2.指定配置项和数据
    let optionb1 = {

        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'  // shadow: 阴影指示器， line:直线指示器，cross：十字指示器
            },
            // 定义tooltip鼠标放上去后的提示显示效果
            formatter: function (params) {
                return '<div>'+ params[0].name +'行业<br>' + '发布' + '<span style="color: #00BFFF;">'+params[0].value + '</span>个招聘需求'+'</div>';
            }
        },
        xAxis: {
            type: 'category',
            data: ['大数据', 'Java开发', 'linux', 'MySQL', 'python开发', 'hive', 'Spark'],
            // 修改刻度标签 相关样式
            axisLabel: {
                color: "rgba(255,255,255,.6) ",
                fontSize: "12",
                show: true,
                interval: 0,  // X轴label显示全
                formatter: function (params) {
                    var newParamsName = "";
                    var paramsNameNumber = params.length;
                    var provideNumber = 4 ;
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
            // 不显示x坐標軸
            axisLine: {
                show: false
            },
        },
        yAxis: {
            type: 'value',
            // 修改刻度标签 相关样式
            axisLabel: {
                color: "rgba(255,255,255,.6) ",
                fontSize: 12,
            },
            // y轴的线条改为了 2像素
            axisLine: {
                lineStyle: {
                    color: "rgba(255,255,255,.1)",
                    width: 2,
                },
            },
            // y轴分割线的颜色
            splitLine: {
                lineStyle: {
                    color: "rgba(255,255,255,.1)",
                }
            }
        },
        series: [
            {
                data: [47379, 22248, 22337, 22581, 16967, 5623, 6521],
                type: 'bar',
                name: 'Direct',
                barWidth: '35%',
                itemStyle: {
                    // 修改柱子圆角,可以修改不同大小值，看圆角效果
                    barBorderRadius: 5,
                },
            },
        ],
        color: ["#2f89cf"],
        grid: {
            left: "0%",
            top: "10px",
            right: "0%",
            bottom: "4%",
            containLabel: true
        },
    };
    // 3.将配置项给实例对象
    myChartb1.setOption(optionb1)
    //随着浏览器自适应变化效果；
    window.addEventListener("resize",function () {
        myChartb1.resize();
        console.log("监控窗口变化，实现图形自适应窗口大小");
    })
})();
// 条形图【柱状图2】
(function (){
    // 1. 实例化对象
    const myChartbar2= echarts.init(document.querySelector(".bar2 .chart"));
    // 定义颜色
    var myColor = ["#FF0000", "#FF6347", "#FA8072", "#FF4500", "#FF8C00", "#F4A460"];

    // 2. 指定配置和数据
    let optionbar2 = {

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
                data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World'],
                inverse: true,
                axisLine:{
                    // 不显示Y轴线
                    show: false,
                },
                axisTick:{
                    // 不显示刻度线
                    show: false,
                },
                axisLabel: {
                    // 调整标签颜色
                    color: 'rgba(255,255,255,1)'
                }

            },
            // 右侧数值轴
            {
                show: true,
                inverse: true,
                data: [19325, 23438, 31000, 121594, 134141, 681807],
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: {
                    color: "#fff",
                    fontSize: 12,
                    // 可选：数值格式化（如千位分隔符）
                    formatter: function(value) {
                        return value.toLocaleString(); // 显示为"19,325"格式
                    }
                }
            }
        ],
        series: [
            {
                name: '条',
                type: 'bar',
                data: [94.19, 100.21, 93.65, 86.33, 98.21, 92.44],
                itemStyle: {
                    // 修改条的矩形圆角
                    barBorderRadius: 20,
                    // color: "#c06820",
                    color: function (params) {
                        console.log(myColor[params.dataIndex])
                        return myColor[params.dataIndex];
                    }
                },
                // 柱子之间的距离 50        // barCategoryGap: '5%',        // 柱子的宽度
                barWidth: 20,
                // 柱子标签定制
                label: {
                    show: true,
                    position: "insideRight",
                    // 定制label显示格式
                    formatter: "{c}%",
                }
            },
            {
                name: '框',
                type: 'bar',
                data: [100, 100, 100, 100, 100, 100],
                barWidth: 20,
                // barCategoryGap: 20,
                yAxisIndex: 1,
                itemStyle: {
                    color: "none",
                    borderColor: "#00c1de",
                    borderWidth: 3,
                    barBorderRadius: 15,
                }
            }
        ]
    };

    // 3. 把配置给实例对象
    myChartbar2.setOption(optionbar2);
    //图形跟随浏览器显示自动缩放大小
    window.addEventListener("resize",function () {
        myChartbar2.resize();
        console.log("监控窗口变化，实现图形自适应窗口大小");
    })
})();
// 折线图1模块制作
(function() {
// 1. 实例化对象
    const myChartl1 = echarts.init(document.querySelector(".line .chart"));
    var yearData = [
        {
            year: '2024', // 年份
            data: [ // 两个数组是因为有两条线
                [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
                [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
            ]
        },
        {
            year: '2025', // 年份
            data: [ // 两个数组是因为有两条线
                [123, 175, 112, 197, 121, 67, 98, 21, 43, 64, 76, 38],
                [143, 131, 165, 123, 178, 21, 82, 64, 43, 60, 19, 34]
            ]
        }
    ];

// 2.指定配置
    let optionl1 = {
        // 通过这个color修改两条线的颜色
        color: ["#00f2f1", "#ed3f35"],
        tooltip: {
            trigger: 'axis'
        },

        legend: {
            // data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
            textStyle: {
                color: '#4c9bfd' // 图例文字颜色
            },
            // 这个10% 必须加引号
            right: '25%' // 距离右边25%
        },


        // 设置网格样式
        grid: {
            top: '15%',
            left: '2%',
            right: '3%',
            bottom: '2%',
            show: true,// 显示边框
            borderColor: '#012f4a',// 边框颜色
            containLabel: true // 包含刻度文字在内
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisTick: {
                show: false // 去除刻度线
            },
            axisLabel: {
                color: '#4c9bfd' // 文本颜色
            },
            axisLine: {
                show: false // 去除轴线
            },
        },
        yAxis: {
            type: 'value',
            axisTick: {
                show: false // 去除刻度
            },
            splitLine: {
                lineStyle: {
                    color: '#012f4a' // 分割线颜色
                }
            },
            axisLabel: {
                color: '#4c9bfd' // 文本颜色
            },
        },
        series: [
            {
                name: '国内需求数',
                type: 'line',
                data: yearData[0].data[0],
                smooth: true,
            },
            {
                name: '国外需求数',
                type: 'line',
                data: yearData[0].data[1],
                // true 可以让我们的折线显示带有弧度
                smooth: true,
            }
        ]
    };
    myChartl1.setOption(optionl1);
// 监听窗口大小变化
    window.addEventListener('resize', function () {
        myChartl1.resize();
        console.log("监控窗口变化，实现图形自适应窗口大小");
    });
    // 5.点击切换效果
    $(".line h2").on("click", "a", function() {
        //alert(1);
        console.log($(this).index());
        var obj = yearData[$(this).index()];
        optionl1.series[0].data = obj.data[0];
        optionl1.series[1].data = obj.data[1];
// 需要重新渲染
        myChartl1.setOption(optionl1);
    });

})();
// 折线图2 模块制作
(function() {
// 1. 实例化对象
    const myChart2 = echarts.init(document.querySelector(".line2 .chart"));
// 2.指定配置
    let option2 = {
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            top:"0%",
            data: ['Email', 'Union Ads'],
            textStyle: {
                color: "rgba(255,255,255,.5)",
                fontSize: "12"
            },
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
                // x轴更换数据
                data: [ "01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","26","28","29","30"],
                // 文本颜色为rgba(255,255,255,.6) 文字大小为 12
                axisLabel: {
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize: 12
                    }
                },
                // x轴线的颜色为 rgba(255,255,255,.2)
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
                //不显示刻度标签
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
                // 修改分割线的颜色
                splitLine: {
                    lineStyle: {
                        color: "rgba(255,255,255,.1)"
                    }
                }
            }
        ],
        series: [
            {
                name: 'Email',
                type: 'line',
                emphasis: {
                    focus: 'series'
                },
                // 填充区为渐变色
                areaStyle: {
                    // color: 'pink',
                    // 渐变色，只需要复制即可
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {
                                offset: 0,
                                color: "rgba(1, 132, 213, 0.4)" // 渐变色的起始颜色
                            },
                            {
                                offset: 0.8,
                                color: "rgba(1, 132, 213, 0.1)" // 渐变线的结束颜色
                            }
                        ],
                        false),
                    //影子颜色
                    shadowColor: "rgba(0, 0, 0, 0.1)"
                },
                data: [ "16","17","18","19","20","06","07","08","09","10","16","17","18","19","20","16","17","18","19","20","21","22","23","24","25","26","26","28","29","30"],
                smooth: true,
                // 单独修改线的样式
                lineStyle: {
                    color: "#0184d5",
                    width: 2
                },
                // 设置拐点 小圆点
                symbol: "circle",
                // 拐点大小
                symbolSize:8,
                // 开始不显示拐点， 鼠标经过显示
                showSymbol: false,
                // 设置拐点颜色以及边框
                itemStyle: {
                    color: "#0184d5",
                    borderColor: "rgba(221, 220, 107, .1)",
                    borderWidth: 12
                },
            },
            {
                name: 'Union Ads',
                type: 'line',
                emphasis: {
                    focus: 'series'
                },
                data: [ 130, 10, 20, 40,30, 40, 80,60,20, 40, 90, 40,20, 140,30, 40, 130,20,20, 40, 80, 70, 30, 40,30, 120, 20,99,50, 20],
                //第二条 线是圆滑
                smooth: true,
                lineStyle: {
                    normal: {
                        color: "#00d887",
                        width: 2
                    }
                },
                //填充区域
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {
                                    offset: 0,
                                    color: "rgba(0, 216, 135, 0.4)"
                                },
                                {
                                    offset: 0.8,
                                    color: "rgba(0, 216, 135, 0.1)"
                                }
                            ],
                            false            ),
                        shadowColor: "rgba(0, 0, 0, 0.1)"
                    }
                },
                // 设置拐点 小圆点
                symbol: "circle",
                // 设置拐点大小为8
                symbolSize: 8,
                // 设置拐点颜色以及边框
                itemStyle: {
                    color: "#00d887",
                    borderColor: "rgba(221, 220, 107, .1)",
                    borderWidth: 12
                },
                // 开始不显示拐点， 鼠标经过显示
                showSymbol: false,
            },
        ]
    };
// 3. 把配置给实例对象
    myChart2.setOption(option2);
    //4. 让图标跟随屏幕去自动适应
    window.addEventListener("resize",function(){
        myChart2.resize();
    });
})();


// 饼形图1
(function() {
// 1. 实例化对象
    const myChartpie1 = echarts.init(document.querySelector(".pie .chart"));

// 2.指定配置
    let optionpie1 = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            // 距离底部为0
            bottom: '0%',
            left: 'center',
            // 小图标的宽度和高度
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                color: "rgba(255,255,255,.5)",
                fontSize: "12"
            },
        },

        series: [
            {
                name: '工龄分布',
                type: 'pie',

                // 修改内圆半径和外圆半径为 百分比是相对于容器宽度来说的
                radius: ["40%", "60%"],

                avoidLabelOverlap: false,
                label: {
                    // 不显示标签文字
                    show: false,
                    position: 'center'
                },

                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    //不显示连接线
                    show: false,
                },
                data: [
                    { value: 1, name: "0年以下" },
                    { value: 4, name: "1-3年" },
                    { value: 2, name: "3-5年" },
                    { value: 2, name: "5-10年" },
                    { value: 1, name: "10年以上" }
                ],
                // 设置饼形图在容器中的位置
                center: ["50%", "50%"],
                // 更换颜色
                color: ["#065aab", "#066eab", "#0682ab", "#0696ab", "#06a0ab"],
            }

        ]

    };

// 3. 把配置给实例对象
    myChartpie1.setOption(optionpie1);

// 4. 让图表跟随屏幕自动的去适应
    window.addEventListener("resize", function() {
        myChartpie1.resize();
    });

})();

// 饼形图2-南丁格尔玫瑰图
(function() {
// 1. 实例化对象
    const myChartpie2 = echarts.init(document.querySelector(".pie2 .chart"));

// 2.指定配置

    let optionpie2 = {

        series: [
            {
                name: 'Nightingale Chart',
                type: 'pie',
                itemStyle: {
                    borderRadius: 8
                },
                data: [
                    { value: 20, name: '云南' },
                    { value: 26, name: '北京' },
                    { value: 24, name: '山东' },
                    { value: 25, name: '河北' },
                    { value: 20, name: '江苏' },
                    { value: 25, name: '浙江' },
                    { value: 30, name: '四川' },
                    { value: 42, name: '湖北' }
                ],

                // 自定义颜色
                color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9','#1d9dff'],
                // 修改饼图大小
                // 饼图显示模式：半径模式
                roseType: "radius",

                center: ['50%', '50%'],
                // 文本标签控制饼形图文字的相关样式， 注意它是一个对象
                // 文本标签控制饼形图文字的相关样式， 注意它是一个对象
                label: {
                    fontSize: 15,
                },
                // 链接图形和文字的线条
                labelLine: {
                    // length 链接图形的线条
                    length: 12,
                    // length2 链接文字的线条
                    length2: 8
                },





            }
        ]
    };


    // 3. 把配置给实例对象
    myChartpie2.setOption(optionpie2)

})();

// 4. 让图表跟随屏幕自动的去适应
window.addEventListener("resize", function() {
    myChart.resize();
});



