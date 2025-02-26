interface Search {
	binary: <T>(list: T[], find: T) => T | undefined,
	binary_nsort: <T>(list: T[], find: T, start: number, end: number) => T | undefined;
	linear: <T>(list: T[], find: T) => T | undefined,
}
const search = {} as Search

search.binary = function(list, find) {
	list.sort()
	let start = 0
	let end = list.length-1
	while (start<=end) {
		const median = (start+end)>>1
		if (list[median] === find) {
			return find
		} else if (list[median]<find) { start = median+1 } else { end = median-1 }
	}
	return
}

search.binary_nsort = function(list, find, start = 0, end = list.length-1) {
	if (start>end) { return }
	const median = (start+end)>>1
	if (list[median] === find) { return list[median] }
	if (list[median]>find) {
		return this.binary_nsort(list, find, start, median-1)
	} else {
		return this.binary_nsort(list, find, median+1, end)
	}
}

search.linear = function(list, find) {
	for (const item of list) {
		if (item === find) {
			return item
		}
	}
	return
}

export default search