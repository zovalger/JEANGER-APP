export function addZero(n) {
	n = Math.abs(n);

	return (n < 10 ? "0" : "") + n;
}

export function milisecondsToTime(
	s,
	trim,
	op = {
		hrs: true,
		mins: true,
		secs: true,
		ms: true,
		msUnjoin: false,
		inObject: false,
	}
) {
	let ms = s % 1000;
	s = (s - ms) / 1000;
	let secs = s % 60;
	s = (s - secs) / 60;
	let mins = s % 60;
	let hrs = (s - mins) / 60;

	ms = Math.floor(ms / 10);

	return trim
		? {
				time: hrs
					? addZero(hrs) + ":" + addZero(mins) + ":" + addZero(secs)
					: mins
					? addZero(mins) + ":" + addZero(secs)
					: addZero(secs),
				ms: "." + addZero(ms),
		  }
		: addZero(hrs) +
				":" +
				addZero(mins) +
				":" +
				addZero(secs) +
				"." +
				addZero(ms);
}

export function milisecondsToObject(s) {
	let ms = s % 1000;
	s = (s - ms) / 1000;
	let secs = s % 60;
	s = (s - secs) / 60;
	let mins = s % 60;
	let hrs = (s - mins) / 60;

	// ms = Math.floor(ms / 10);

	return { hrs, mins, secs, ms };
}
