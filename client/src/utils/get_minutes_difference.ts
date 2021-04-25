export default function getMinutesDifference(dt2: string, dt1: string) {
	let diff = (new Date(dt2).getTime() - new Date(dt1).getTime()) / 1000;
	diff /= 60;
	return Math.abs(Math.round(diff));
}
