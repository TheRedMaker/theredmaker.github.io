$(function(){

    // 倒计时
    var currentTime = (new Date("2022/06/13 16:30:00").getTime() / 1000) - (new Date().getTime() / 1000);
    const normalTime = new Date("2022/05/30 00:00:00").getTime() / 1000;
    const goodTime = new Date("2022/06/06 00:00:00").getTime() / 1000;

    const $body = $("body");
    if (currentTime >= normalTime && currentTime < goodTime) {
        $body.removeClass("bad good");
        $body.addClass("normal");
    }
    else if (currentTime >= goodTime) {
        $body.removeClass("bad normal");
        $body.addClass("good");
    }
    else {
        $body.removeClass("normal good");
        $body.addClass("bad");
    }

    function cd() {

            const $time = $(".time .num");
            // 天
            let days = String(Math.floor(currentTime / 60 / 60 / 24)).padStart(2, "0");
            $($time[0]).text(days);
            // 时
            let hours = String(Math.floor(currentTime / 60 / 60 % 24)).padStart(2, "0");
            $($time[1]).text(hours);
            // 分
            let minutes = String(Math.floor(currentTime / 60 % 60)).padStart(2, "0");
            $($time[2]).text(minutes);
            // 秒
            let seconds = String(Math.floor(currentTime % 60)).padStart(2, "0");
            $($time[3]).text(seconds);

            currentTime--;

    }

    cd();

    setInterval(cd, 1000);









    // 语言
    const languages = {
        "en": [
            "TheRedMaker_'s Summer Holiday Countdown",
            "Days",
            "Hours",
            "Minutes",
            "Seconds",
            "State",
            "Bad",
            "Normal",
            "2333"
        ],
        "cn": [
            "TheRedMaker_的暑假倒计时",
            "天",
            "时",
            "分",
            "秒",
            "状态",
            "糟糕",
            "一般",
            "2333"
        ]
    }
    $(".language h3").click(function(){
        $(".language .options").stop().slideToggle(400);
    });
    $(".language .options span").click(function(){
        let selectedLang = $(this).attr("lang");
        document.title = languages[selectedLang][0];
        for (let textIndex in languages[selectedLang]) {
            $($(".lang")[textIndex]).text(languages[selectedLang][textIndex]);
        }
    });

});
