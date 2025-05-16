// 柱状图模块1
(function() {
// 1实例化对象
//     var myChart = echarts.init(document.querySelector(".bar .chart"));
    var myChart = echarts.init(document.querySelector(".line2 .chart"));
    // 2.指定配置项和数据
    var option = {
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            top: "0%",
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
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }

        ],
        offset:-5 ,
        series: [

            {
                name: 'Email',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: 'Union Ads',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [220, 182, 191, 234, 290, 330, 310]
            }
        ],

    };


    // 3.将配置项给实例对象
    myChart.setOption(option)
})();
