class Time {

	constructor(){}

	static getMonthTotalDays(year, month) {
		return new Date(year, month, 0).getDate();
	}

	static getDayStart(year, month) {
		let dayStart = new Date(year, month-1, 1).getDay();
		if (dayStart == 0) {
			return 7;
		}
		return dayStart;
	}

}
