const enum EntryType {
	Directory,
	File
}
const enum Permissions {
	r,
	w,
	rw
}

type FsList = FsEntry[]
type FsEntry = Entry<{}>
type FsDirectory = Entry<FsList>

type File = string
interface Entry<T = File> {
	readonly inner?: T,
	readonly name: string,
	readonly type: EntryType,
	readonly permissions: Permissions
}
function Entry<T = File>(name: string, inner: T, permissions: Permissions): Entry<T> {
	return {
		type: typeof inner == "object" ? EntryType.Directory : EntryType.File,
		inner: inner,
		name: name,
		permissions: permissions
	}
}

export {
	type FsDirectory,
	type FsEntry,
	type FsList,
	EntryType,
	Permissions,
	Entry
}