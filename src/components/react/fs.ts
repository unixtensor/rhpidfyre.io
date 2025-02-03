let working_dir = "user"

const enum EntryType {
	Directory,
	File
}
type File = string
type Entry<T> = {
	readonly inner: T,
	readonly type: EntryType
}
function Entry<T = File>(inner: T): Entry<T> {
	const type = typeof inner == "object" ? EntryType.Directory : EntryType.File
	return { inner: inner, type: type }
}

const user = {
	["about_me.txt"]: Entry(""),
	["services.txt"]: Entry("")
}
const home = {
	["user"]: Entry(user)
}
const root = {
	["bin"]: Entry({}),
	["home"]: Entry(home)
}
const fs = {
	["/"]: Entry(root)
}

export { fs, working_dir }