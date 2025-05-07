// 柱状图模块1
(function() {
// 1实例化对象
    var myChart = echarts.init(document.querySelector(".bar .chart"));

    // 2.指定配置项和数据
    option = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar'
            }
        ],
        color: ["#2f89cf"],
    };


    // 3.将配置项给实例对象
    myChart.setOption(option)
})();
