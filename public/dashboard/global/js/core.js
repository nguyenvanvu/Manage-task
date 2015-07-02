$(function () {

    //BEGIN TOOTLIP
    $("[data-toggle='tooltip'], [data-hover='tooltip']").tooltip();
    //END TOOLTIP

    //BEGIN POPOVER
    $("[data-toggle='popover'], [data-hover='popover']").popover();
    //END POPOVER

    //BEGIN PANEL TOOLS
    $(".panel").each(function(index, element) {
        var me = $(this);
        $(">.panel-heading>.tools>a>i", me).click(function(e){
            if($(this).hasClass('icon-arrow-up')){
                $(">.panel-body", me).slideUp('fast');
                $(this).removeClass('icon-arrow-up').addClass('icon-arrow-down');
            }
            else if($(this).hasClass('icon-arrow-down')){
                $(">.panel-body", me).slideDown('fast');
                $(this).removeClass('icon-arrow-down').addClass('icon-arrow-up');
            }
            else if($(this).hasClass('fa-cog')){
                //Show modal
            }
            else if($(this).hasClass('fa-refresh')){
                //$(">.portlet-body", me).hide();
                $(">.panel-body", me).addClass('wait');

                setTimeout(function(){
                    //$(">.portlet-body>div", me).show();
                    $(">.panel-body", me).removeClass('wait');
                }, 1000);
            }
            else if($(this).hasClass('icon-close')){
                me.remove();
            }
        });
    });
    //END PANEL TOOLS

});



