export function timeTomiliseconds(time = { hrs: 0, mins: 0, secs: 0, ms: 0 }) {
	let { hrs, mins, secs, ms } = time;

	ms = parseFloat(ms);
	secs = parseFloat(secs);
	mins = parseFloat(mins);
	hrs = parseFloat(hrs);

	let s = 0;

	s += ms ? ms : 0;

	s += secs ? secs * 1000 : 0;

	s += mins ? mins * 60 * 1000 : 0;

	s += hrs ? hrs * 60 * 60 * 1000 : 0;

	return s;
}

// addZ(hrs) + ':' + addZ(mins) + ':' + addZ(secs)
