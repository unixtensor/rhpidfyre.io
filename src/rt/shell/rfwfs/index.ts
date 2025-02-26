import { type FsList, type FsEntry } from "./core"

interface SearchResult<T> {
	item: T,
	binary_index: number
}
interface Search {
	binary_fs: (cloned_list: FsList, file_name: string) => SearchResult<FsEntry> | undefined,
	binary_nsort: <T>(list: T[], find: T, start: number, end: number) => SearchResult<T> | undefined,
	binary: <T>(list: T[], find: T) => SearchResult<T> | undefined,
	linear: <T>(list: T[], find: T) => SearchResult<T> | undefined,
}

function wrap_result<T>(item: T, binary_index: number): SearchResult<T> {
	return { item: item, binary_index: binary_index }
}

const search = {} as Search

search.binary = function(list, find) {
	list.sort()
	let start = 0
	let end = list.length-1
	while (start<=end) {
		const median = (start+end)>>1
		if (list[median] === find) {
			return wrap_result(list[median], median)
		} else if (list[median]<find) {
			start = median+1
		} else {
			end = median-1
		}
	}
	return
}

search.binary_nsort = function(list, find, start = 0, end = list.length-1) {
	if (start>end) { return }
	const median = (start+end)>>1
	if (list[median] === find) {
		return wrap_result(list[median], median)
	}
	if (list[median]>find) {
		return this.binary_nsort(list, find, start, median-1)
	} else {
		return this.binary_nsort(list, find, median+1, end)
	}
}

search.binary_fs = function(cloned_list, file_name) {
	cloned_list.sort((a,z) => a.name.localeCompare(z.name))
	let start = 0
	let end = cloned_list.length-1
	while (start<=end) {
		const median = (start+end)>>1
		const median_name = cloned_list[median].name

		if (median_name === file_name) {
			return wrap_result(cloned_list[median], median)
		} else if (median_name<file_name) {
			start = median+1
		} else {
			end = median-1
		}
	}
	return
}

search.linear = function(list, find) {
	for (let ind = 0; ind<list.length; ind++) {
		if (list[ind] === find) {
			return wrap_result(list[ind], ind)
		}
	}
	return
}

export default search