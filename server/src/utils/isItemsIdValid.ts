export default function isItemsIdValid(idInString: string) {
	const regex = /^[1-9]\d*$/gm;
	return regex.test(idInString);
}
