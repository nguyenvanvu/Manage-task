var Layout = function() {

    //BEGIN MENU MAIN
    var handleSidebarMain = function(){
        $('#sidebar-main').metisMenu();
    }
    //END MENU MAIN

    var handleGaugeChart = function () {
        var gauge_chart = new JustGage({
            id: "gauge-chart",
            value: getRandomInt(0, 100),
            min: 0,
            max: 100,
            title: "Last Week",
            showInnerShadow: false,
            levelColorsGradient: false
        });
    }

    //BEGIN SLIMSCROLL TOPBAR
    var handleSlimscrollTopbar = function () {
        $('.dropdown-slimscroll').slimScroll({
            "width": '100%',
            "height": '250px',
            "wheelStep": 5
        });
    }
    //END SLIMSCROLL TOPBAR

    //BEGIN SIDEBAR SECOND TO DO'S LIST
    var handleSlimscrollTodo = function(){
        $('.list-todo-scroll').slimScroll({
            "width": '100%',
            "height": '250px',
            "wheelStep": 5
        });
    }
    //END SIDEBAR SECOND TO DO'S LIST

    return{
        init: function () {
            handleSidebarMain();
            handleSlimscrollTopbar();
            handleSlimscrollTodo();
        }
    }

}(jQuery);


