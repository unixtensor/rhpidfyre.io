import { type FsDirectory, type FsEntry } from "./core"

import fstree from "./tree"
import index from "./index"

let cached_dir = fstree[0] //start at root
let working_path = ["/", "home", "user"]

const clone_working_path = () => [...working_path]

function get_working_dir_name() {
	return working_path[working_path.length-1]
}

function get_working_dir_name_full(): string {
	const w_dir_clone = clone_working_path()
	const root = w_dir_clone.shift()
	if (root) {
		return root+w_dir_clone.join("/")
	}
	return "shift-error"
}

const enum SetDirStatus {
	Valid,
	NotFound,
	NotADirectory,
	Invalid
}
interface FsIterEntry {
	readonly entry: FsDirectory | null,
	readonly status: SetDirStatus
}
function find_fs_dir(working_dir_path_clone: string[], find_dir_name: string): FsIterEntry {
	let cached_dir_clone = cached_dir.inner

	for (let path_i = 0; path_i<working_dir_path_clone.length; path_i++) {
		if (cached_dir_clone) {
			let cached_dir_file_names: string[] = []
			cached_dir_clone.forEach((file, file_i) => cached_dir_file_names.push(file.name))

			const search_result = index.binary(cached_dir_clone, fstree[0])

			if (working_dir_path_clone[path_i] === find_dir_name) {
				cached_dir_clone = cached_dir_clone
				if (path_i === working_dir_path_clone.length) {
					const search_result = index.binary(cached_dir_file_names, find_dir_name)
					if (search_result) {

					}
				} else {
					continue
				}
			}
		}
		return { entry: null, status: SetDirStatus.Invalid }
	}
	return { entry: null, status: SetDirStatus.NotFound }
}

function set_working_dir(name: string): SetDirStatus {
	if (name === ".") { return SetDirStatus.Valid }

	const w_dir_clone = clone_working_path()
	if (name === "..") {
		w_dir_clone.pop()

	} else {
		w_dir_clone.push(name)
	}


}

function get_working_dir_entries(): FsEntry[] {

}

export {
	get_working_dir_name,
	get_working_dir_name_full,
	get_working_dir_entries,
	set_working_dir,
	SetDirStatus
}