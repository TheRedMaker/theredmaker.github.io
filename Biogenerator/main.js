$(function () {


    $("body").removeClass("hide")
    $(".tp-warnof-numberonly").hide();
    $(".tp-content")
        .css({ "opacity": "0", "position": "fixed", "left": "50%", "width": "100%" })
        .animate({ "opacity": "1", "left": "0" }, 1000, function () {
            $(".tp-content").css({ "position": "static" });
        });

    $(".tp-switch").click(function () {
        $this = $(this);
        $this.parent().parent().parent().fadeTo(100, 0, function () {
            $this.toggleClass("btn-success");
            $this.is(".btn-success") ? $this.html("开") : $this.html("关");
            $this.parent().parent().parent().fadeTo(100, 1);
            if ($(".tp-inexswitch").html() == "开") {
                $(".tp-explosion-countdown").attr("disabled", "");
                $(".tp-explosion-countdown").prev().addClass("text-muted");
            } else {
                $(".tp-explosion-countdown").removeAttr("disabled");
                $(".tp-explosion-countdown").prev().removeClass("text-muted");
            };
            if ($(".tp-colorhexswitch").html() == "开") {
                $(".tp-namecolor").attr("disabled", "");
                $(".tp-namecolor").parent().addClass("text-muted");
                $(".tp-colorhex").removeAttr("disabled");
                $(".tp-colorhex").parent().parent().removeClass("text-muted");
            } else {
                $(".tp-colorhex").attr("disabled", "");
                $(".tp-colorhex").parent().parent().addClass("text-muted");
                $(".tp-namecolor").removeAttr("disabled");
                $(".tp-namecolor").parent().removeClass("text-muted");
            };
        });
    });

    $(".tp-swselect").change(function () {
        if ($(".tp-swselect").val() == "苦力怕") {
            $(".tp-movement-speed").removeAttr("disabled");
            tphide(".tp-eq");
            tphide(".tp-forslime");
            tphide(".tp-forghast");
            tpshow(".tp-forcreeper");
        } else if ($(".tp-swselect").val() == "史莱姆" || $(".tp-swselect").val() == "岩浆史莱姆") {
            $(".tp-movement-speed").removeAttr("disabled");
            tphide(".tp-eq");
            tpshow(".tp-forslime");
            tphide(".tp-forghast");
            tphide(".tp-forcreeper");
        } else if ($(".tp-swselect").val() == "恶魂") {
            $(".tp-movement-speed").attr("disabled", "");
            tphide(".tp-eq");
            tphide(".tp-forslime");
            tpshow(".tp-forghast");
            tphide(".tp-forcreeper");
        } else {
            $(".tp-movement-speed").removeAttr("disabled");
            tpshow(".tp-eq");
            tphide(".tp-forslime");
            tphide(".tp-forghast");
            tphide(".tp-forcreeper");
        };
    });
    $(".tp-swselect").change();

    var pageX = pageY = 0;
    $("body").mousemove(function (event) {
        pageX = event.pageX;
        pageY = event.pageY;
    });

    $(".tp-numberonly").change(function () {
        if ($(this).val()) {
            if (isNaN(parseFloat($(this).val()))) {
                $(".tp-warnof-numberonly").css({
                    "left": pageX - 10,
                    "top": pageY - 10,
                })
                $(".tp-warnof-numberonly").fadeIn(200, function () {
                    setTimeout(function () {
                        $(".tp-warnof-numberonly").fadeOut(100);
                    }, 200)
                });
                $(this).val("");
            } else {
                $(this).val(parseFloat($(this).val()));
            };
        };

    });

    $(".tp-build").click(buildfunc);
});