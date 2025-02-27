import { type Entry, type Files } from "./entry"

interface SearchResult<T> {
	item: T,
	binary_index: number
}
interface Search {
	binary_fs_name: <T extends Entry<T>>(cloned_list: Files<T>, file_name: string) => SearchResult<Entry<T>> | undefined,
	binary_nsort: <T>(list: T[], find: T, start?: number, end?: number) => SearchResult<T> | undefined,
	binary: <T>(list: T[], find: T) => SearchResult<T> | undefined,
	linear: <T>(list: T[], find: T) => SearchResult<T> | undefined,
}

function wrap_result<T>(item: T, binary_index: number): SearchResult<T> {
	return { item: item, binary_index: binary_index }
}

const rfwfs_search = {} as Search

rfwfs_search.binary = function(list, find) {
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

rfwfs_search.binary_nsort = function(list, find, start = 0, end = list.length-1) {
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

rfwfs_search.binary_fs_name = function(cloned_entry_list, file_name) {
	let start = 0
	let end = cloned_entry_list.length-1
	while (start<=end) {
		const median = (start+end)>>1
		const median_name = cloned_entry_list[median].name

		if (median_name === file_name) {
			return wrap_result(cloned_entry_list[median], median)
		} else if (median_name<file_name) {
			start = median+1
		} else {
			end = median-1
		}
	}
	return
}

rfwfs_search.linear = function(list, find) {
	for (let ind = 0; ind<list.length; ind++) {
		if (list[ind] === find) {
			return wrap_result(list[ind], ind)
		}
	}
	return
}

export default rfwfs_search