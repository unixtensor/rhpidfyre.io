import { Entry, Permissions } from "./core"

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
const fstree = [
	Entry("/", root, Permissions.r)
]

export default fstree