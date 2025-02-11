const enum EntryType {
	Directory,
	File
}
const enum Permissions {
	r,
	w,
	rw
}

type FsEntrySignature = Entry<Entry<{}>[]> //I did this!

const user = [
	Entry("about_me.txt", "about me inside", Permissions.rw),
	Entry("services.txt", "services inside", Permissions.rw),
	Entry("hi", [], Permissions.rw)
]
const home = [
	Entry("user", user, Permissions.rw)
]
const root = [
	Entry("home", home, Permissions.r),
	Entry("bin", {}, Permissions.r),
]
const fs = [
	Entry("/", root, Permissions.r)
]

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
	fs,
	type FsEntrySignature,
	EntryType,
	Permissions,
	Entry
}