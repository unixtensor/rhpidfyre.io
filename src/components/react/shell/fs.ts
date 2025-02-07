let working_dir = "user"

const enum EntryType {
	Directory,
	File
}
const enum Permissions {
	r,
	w,
	rw
}

type File = string
type Entry<T> = {
	readonly inner: T,
	readonly type: EntryType,
	readonly permissions: Permissions
}
function Entry<T = File>(inner: T, permissions: Permissions): Entry<T> {
	const type = typeof inner == "object" ? EntryType.Directory : EntryType.File
	return {
		inner: inner,
		type: type,
		permissions: permissions
	}
}

const user = {
	["about_me.txt"]: Entry("", Permissions.rw),
	["services.txt"]: Entry("", Permissions.rw)
}
const home = {
	["user"]: Entry(user, Permissions.rw)
}
const root = {
	["bin"]: Entry({}, Permissions.r),
	["home"]: Entry(home, Permissions.r)
}
const fs = {
	["/"]: Entry(root, Permissions.r)
}

export {
	fs,
	working_dir
}