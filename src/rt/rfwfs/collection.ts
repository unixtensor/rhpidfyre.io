import { type Entry } from "./main"

import entry_search from "./index"

type Files<T> = Entry<T>[]

interface EntryCollectionManipulate {
	pop: <T extends Entry<T>>(file_name: string) => Entry<T> | undefined,
	get: <T extends Entry<T>>(file_name: string) => Entry<T> | undefined
	push: <T extends Entry<T>>(entry: Entry<T>) => boolean,
	sort: () => void,
}
interface EntryCollection<T> extends EntryCollectionManipulate {
	readonly inner: Files<T>
}

function entry_trait<T extends Entry<T>>() {
	const trait = {} as EntryCollection<T>
	trait.sort = function() {
		this.inner.sort((a,z) => a.name.localeCompare(z.name))
	}
	trait.push = function(entry) {
		const no_duplicates = entry_search(this.inner, entry.name)
		if (!no_duplicates) {
			this.push(entry)
			this.sort()
			return true
		}
		return false
	}
	trait.pop = function(file_name) {
		const file_search = entry_search(this.inner, file_name)
		if (file_search) {
			this.inner.splice(file_search.index, 1)
			return file_search.result
		}
		return
	}
	return trait
}

export {
	entry_trait,
	type EntryCollection,
	type Files,
}