import { type Entry } from "./main"
import { type Files } from "./collection"

interface SearchResult<T> {
	readonly result: T,
	readonly index: number
}
function wrap_result<T>(result: T, index: number): SearchResult<T> {
	return { result: result, index: index }
}

export default function entry_search<T>(cloned_file_collection: Files<T>, file_name: string): SearchResult<Entry<T>> | undefined {
	let start = 0
	let end = cloned_file_collection.length-1
	while (start<=end) {
		const median = (start+end)>>1
		const median_name = cloned_file_collection[median].name

		if (median_name == file_name) { //left == right && (T == U) is not necessary
			return wrap_result(cloned_file_collection[median], median)
		} else if (median_name<file_name) {
			start = median+1
		} else {
			end = median-1
		}
	}
	return undefined
}
