import rfwfs_search from "./index"

const enum EntryType {
	Directory,
	File
}

const enum Permissions {
	r,
	w,
	rw,
	none
}

type Files<T> = Entry<T>[]
type File = string

interface EntryListManipulate {
	push: <T extends Entry<T>>(entry: Entry<T>) => boolean,
	pop: <T extends Entry<T>>(file_name: string) => Entry<T> | undefined,
	sort: () => void,
}

interface EntryList<T> extends EntryListManipulate {
	readonly tree: Files<T>
}

interface Entry<T = File> {
	readonly inner: EntryList<T>,
	readonly name: string,
	readonly type: EntryType,
	readonly timestamp: number,
	readonly permissions: Permissions,
}

function rfwfs_entry_trait<T extends Entry<T>>(): EntryList<T> {
	const trait = {} as EntryList<T>
	trait.sort = function() {
		this.tree.sort((a,z) => a.name.localeCompare(z.name))
	}
	trait.push = function(entry) {
		const no_duplicates = rfwfs_search.binary_fs_name(this.tree, entry.name)
		if (!no_duplicates) {
			this.tree.push(entry)
			this.sort()
			return true
		}
		return false
	}
	trait.pop = function(file_name) {
		const file_search = rfwfs_search.binary_fs_name(this.tree, file_name)
		if (file_search) {
			this.tree.splice(file_search.binary_index, 1)
			return file_search.item
		}
		return
	}
	return trait
}

function rfwfs_new_entry_tree<T>(files: Files<T>) {

}

function rfwfs_new_entry<T extends EntryList<T>>(
	name: string,
	inner: T,
	permissions: Permissions,
	timestamp: number = Math.floor(Date.now()/1000)
): Entry<T> {
	return {
		type: typeof inner == "object" ? EntryType.Directory : EntryType.File,
		timestamp: timestamp,
		name: name,
		permissions: permissions,
		inner: inner,
	}
}

export {
	rfwfs_entry_trait,
	rfwfs_new_entry,
	EntryType,
	Permissions,
	type EntryList,
	type Entry,
	type Files,
	type File,
}