var Dashboard = function() {
    var handleGaugeChart = function(){
        var gauge_chart = new JustGage({
            id: "gauge-chart",
            value: getRandomInt(0, 100),
            min: 0,
            max: 100,
            title: false,
            showInnerShadow: false,
            levelColorsGradient: false
        });
    }

    //BEGIN CHART POINT LIST
    var d1 = [
        ["15/09", 48],
        ["16/09", 26],
        ["17/09", 49],
        ["18/09", 46],
        ["19/09", 54],
        ["20/09", 29],
        ["21/09", 42],
        ["22/09", 13],
        ["21/09", 42],
        ["22/09", 13],
        ["23/09", 57],
        ["24/09", 35],
        ["25/09", 48],
        ["26/09", 26],
        ["27/09", 49],
        ["28/09", 46],
        ["29/09", 54],
        ["30/09", 29]
    ];
    $.plot("#chart-point-list", [
        {
            data: d1,
            label: "Point",
            color: "#e0e0e0"
        }
    ], {
        series: {
            bars: {
                align: "center",
                lineWidth: 0,
                show: !0,
                barWidth: .6,
                fill: .9
            }
        },
        grid: {
            borderColor: "#fafafa",
            borderWidth: 1,
            hoverable: !0
        },
        tooltip: !0,
        tooltipOpts: {
            content: "%x : %y",
            defaultTheme: true
        },
        xaxis: {
            tickColor: "#fafafa",
            mode: "categories"
        },
        yaxis: {
            tickColor: "#fafafa"
        },
        shadowSize: 0
    });
    //END CHART POINT LIST

    return{
        init: function () {
            handleGaugeChart();
        }
    }
}(jQuery);



