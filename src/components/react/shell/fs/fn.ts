import { fs } from "./fs"

let working_dir = ["/", "home", "user"]

function get_working_dir_name_full(): string {
	const w_dir_clone = [...working_dir]
	const root = w_dir_clone.shift()
	if (root) {
		return root+w_dir_clone.join("/")
	}
	return "shift-error"
}

function get_working_dir_name(): string {
	return working_dir[working_dir.length-1]
}

function set_working_dir(name: string) {
	let new_dir;
	const w_dir_clone = [...working_dir]
	w_dir_clone.push(name)
	w_dir_clone.map(p => p !== "/" ? p+"/" : p).forEach(f => {
		for (let i = 0; i<fs.length; i++) {
			if (fs[i].name === f) {

			}
		}
	})
}

export {
	get_working_dir_name_full,
	get_working_dir_name,
	set_working_dir
}