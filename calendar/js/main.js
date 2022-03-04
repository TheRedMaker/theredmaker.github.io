$(()=>{


	var monthName = [
		"JANUARY",
		"FEBRUARY",
		"MARCH",
		"APRIL",
		"MAY",
		"JUNE",
		"JULY",
		"AUGUST",
		"SEPTEMBER",
		"OCTOBER",
		"NOVEMBER",
		"DECEMBER"
	];


	// 生成日历

	// 获取当前日期和时间
	var curDate = new Date();
	var curYear = curDate.getFullYear();
	var curMonth = curDate.getMonth()+1;
	var totalDays = Time.getMonthTotalDays(curYear, curMonth);
	var dayStart = Time.getDayStart(curYear, curMonth);
	var curDay = 1;
	var theMonth = curMonth;

	// 设置年和月
	$(".calendar .top p").text(curYear);
	$(".calendar .top h1").text(monthName[curMonth-1]);

	// 生成格子
	for (let i=1; i<=42; i++) {
		$(".calendar .bottom ul").append("<li></li>");
	}

	// 设置天数
	var gridRange = $(".calendar .bottom ul li:nth-child(n+8)").slice(dayStart-1, dayStart-1+totalDays);
	for (let grid of gridRange) {
		$(grid).text(curDay++);
	}

	// 标记当前是几号
	$(gridRange[curDate.getDate()-1]).addClass("currentDay");

	// 设置月份选择的默认月份
	$($(".chooseMonth select option")[curMonth-1]).attr("selected", true);




	// 加载动画
	$(".loadAnimation").animate({
		"left": "-100%"
	}, 1000, ()=>{
		$(".loadAnimation").css("display", "none");
	});




	// 日历换页
	var running = false;

	function changePage(direction) {
		// 设置月份
		if (direction == "prev") {
			curMonth--;
		}
		else {
			curMonth++;
		}

		$(".calendar .top h1").text(monthName[curMonth-1]);

		// 重置格子
		$(".calendar .bottom ul li:nth-child(n+8)").removeClass("currentDay");
		$(".calendar .bottom ul li:nth-child(n+8)").text("");

		// 设置天数
		totalDays = Time.getMonthTotalDays(curYear, curMonth);
		dayStart = Time.getDayStart(curYear, curMonth);
		curDay = 1;
		for (let grid of $(".calendar .bottom ul li:nth-child(n+8)").slice(dayStart-1, dayStart-1 + totalDays)) {
			$(grid).text(curDay++);
		}

		setTimeout(()=>{
			if (direction == "prev") {
				changeAnimation("0%", "100%", ()=>{
					running = false;
					$(".calendar .change").css("display", "none");
					$(".chooseMonth select").attr("disabled", false);
					$(".chooseMonth select option").attr("selected", false);
					$($(".chooseMonth select option")[curMonth-1]).attr("selected", true);
				}, "");
			}
			else {
				changeAnimation("0%", "-100%", ()=>{
					running = false;
					$(".calendar .change").css("display", "none");
					$(".chooseMonth select").attr("disabled", false);
					$(".chooseMonth select option").attr("selected", false);
					$($(".chooseMonth select option")[curMonth-1]).attr("selected", true);
				}, "");
			}
		}, 500);

		if (curMonth == theMonth) {
			$(gridRange[curDate.getDate()-1]).addClass("currentDay");
		}
	}

	// 日历换页动画
	function changeAnimation(startPos, endPos, callback, callbackArg) {
		$(".calendar .change").css({
			"left": `${startPos}`,
			"display": "block"
		});
		$(".calendar .change").animate({
			"left": `${endPos}`
		}, 600, ()=>{
			callback(callbackArg);
		});
	}

	// 日历换页按钮
	$(".calendar .top .left").click(()=>{
		if (!running) {
			if (curMonth != 1) {
				running = true;
				changeAnimation("-100%", "0%", changePage, "prev");
				$(".chooseMonth select").attr("disabled", true);
			}
			else {
				alert(`只能显示${curYear}年的月份`);
			}
		}
	});

	$(".calendar .top .right").click(()=>{
		if (!running) {
			if (curMonth != 12) {
				running = true;
				changeAnimation("100%", "0%", changePage, "next");
				$(".chooseMonth select").attr("disabled", true);
			}
			else {
				alert(`只能显示${curYear}年的月份`);
			}
		}
	});


	// 月份选择事件
	$(".chooseMonth select").change(()=>{
		if (!running) {
			running = true;
			curMonth = Number($(".chooseMonth select").val()) + 1;
			changeAnimation("-100%", "0%", changePage, "prev");
			$(".chooseMonth select").attr("disabled", true);
		}
	});


});
