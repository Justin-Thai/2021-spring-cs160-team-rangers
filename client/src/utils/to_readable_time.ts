export default function toReadableTime(timestamp: string) {
	const now = new Date().getTime();
	const unixTime = new Date(timestamp).getTime();
	if (unixTime <= 0 || unixTime > now) {
		return '';
	}

	// Calculate difference
	const difference = Math.abs(unixTime / 1000 - now / 1000);

	let unitOfTime = '';
	let time = 0;
	// Calculate time unit
	if (difference / (60 * 60 * 24 * 365) > 1) {
		// Years
		unitOfTime = 'y';
		time = Math.floor(difference / (60 * 60 * 24 * 365));
	} else if (difference / (60 * 60 * 24 * 45) > 1) {
		// Months
		unitOfTime = 'mo';
		time = Math.floor(difference / (60 * 60 * 24 * 45));
	} else if (difference / (60 * 60 * 24) > 1) {
		// Days
		unitOfTime = 'd';
		time = Math.floor(difference / (60 * 60 * 24));
	} else if (difference / (60 * 60) > 1) {
		// Hours
		unitOfTime = 'h';
		time = Math.floor(difference / (60 * 60));
	} else if (difference / 60 > 1) {
		// Minutes
		unitOfTime = 'mi';
		time = Math.floor(difference / 60);
	} else {
		// Seconds
		unitOfTime = 'just now';
	}

	// Return time from now data
	if (time === 0) {
		return unitOfTime;
	}
	return `${time}${unitOfTime}`;
}
