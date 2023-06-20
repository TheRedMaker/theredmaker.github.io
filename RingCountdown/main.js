function setGlobalVar() {
    window.lineWidth = 12;
    window.dayRingRadius = 200;
    window.hourRingRadius = dayRingRadius - lineWidth * 2;
    window.minuteRingRadius = hourRingRadius - lineWidth * 2;
    window.secondRingRadius = minuteRingRadius - lineWidth * 2;
}


function countDown() {
    const $day = document.querySelector(".theBox .time .day");
    const $hour = document.querySelector(".theBox .time .hour");
    const $minute = document.querySelector(".theBox .time .minute");
    const $second = document.querySelector(".theBox .time .second");
    const $dayRing = document.querySelector(".theBox .ringBox .day");
    const $hourRing = document.querySelector(".theBox .ringBox .hour");
    const $minuteRing = document.querySelector(".theBox .ringBox .minute");
    const $secondRing = document.querySelector(".theBox .ringBox .second");

    let currentMS = (new Date()).getTime();
    let startMS = (new Date(2023, 3, 16, 00, 00, 00)).getTime();
    let targetMS = (new Date(2023, 6, 4, 16, 30, 00)).getTime();
    let timeDiffS = (targetMS - currentMS)  / 1000;

    let startDayDiff = (targetMS - startMS) / 1000 / 60 / 60 / 24;
    let day = Math.floor(timeDiffS / 60 / 60 / 24);
    let hour = Math.floor(timeDiffS / 60 / 60 % 24);
    let minute = Math.floor(timeDiffS / 60 % 60);
    let second = Math.floor(timeDiffS % 60);
    let dayRingOffset = dayRingRadius * 2 * Math.PI - dayRingRadius * 2 * Math.PI / startDayDiff * day;
    let hourRingOffset = hourRingRadius * 2 * Math.PI - hourRingRadius * 2 * Math.PI / 24 * hour;
    let minuteRingOffset = minuteRingRadius * 2 * Math.PI - minuteRingRadius * 2 * Math.PI / 59 * minute;
    let secondRingOffset = secondRingRadius * 2 * Math.PI - secondRingRadius * 2 * Math.PI / 59 * second;

    if (currentMS <= targetMS) {
        $day.innerText = day;
        $hour.innerText = hour.toString().padStart(2, "0");
        $minute.innerText = minute.toString().padStart(2, "0");
        $second.innerText = second.toString().padStart(2, "0");
        $dayRing.style["stroke-dashoffset"] = dayRingOffset;
        $hourRing.style["stroke-dashoffset"] = hourRingOffset;
        $minuteRing.style["stroke-dashoffset"] = minuteRingOffset;
        $secondRing.style["stroke-dashoffset"] = secondRingOffset;
    }
    else {
        clearInterval(countDownThread);
    }
}


function load() {
    setGlobalVar();
    countDown();
    window.countDownThread = setInterval(countDown, 10);
}


window.onload = load;
