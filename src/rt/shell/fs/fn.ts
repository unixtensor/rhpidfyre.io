import { EntryType, fs, type FsEntrySignature } from "./fs"

let working_dir = ["/", "home", "user"]

function get_working_dir_name() {
	return working_dir[working_dir.length-1]
}

function get_working_dir_name_full(): string {
	const w_dir_clone = [...working_dir]
	const root = w_dir_clone.shift()
	if (root) {
		return root+w_dir_clone.join("/")
	}
	return "shift-error"
}

const enum SetDirStatus {
	Valid,
	NotFound,
	NotADirectory
}
interface FsIterEntry {
	readonly entry: FsEntrySignature | null,
	readonly status: SetDirStatus
}
function iter_fs_to_goal(w_dir_clone: string[]): FsIterEntry {
	let next_iter = fs[0]

	for (const w_dir of w_dir_clone) {
		if (w_dir === "/") { continue }
		if (next_iter && next_iter.inner) {
			const found = next_iter.inner.find(entry => entry.name === w_dir)

			if (!found) {
				return { entry: null, status: SetDirStatus.NotFound }
			}
			if (found.type !== EntryType.Directory) {
				return { entry: null, status: SetDirStatus.NotADirectory }
			}
			if (found.name === w_dir_clone[w_dir_clone.length-1]) {
				return { entry: next_iter, status: SetDirStatus.Valid }
			} else {
				next_iter = found.inner as FsEntrySignature
			}
		}
	}
	return { entry: null, status: SetDirStatus.NotFound }
}

function set_working_dir(name: string): SetDirStatus {
	if (name === ".") { return SetDirStatus.Valid }

	const w_dir_clone = [...working_dir]
	if (name === "..") { w_dir_clone.pop() } else { w_dir_clone.push(name) }

	const iter_status = iter_fs_to_goal(w_dir_clone)
	if (iter_status.status === SetDirStatus.Valid) {
		working_dir = w_dir_clone
	}
	return iter_status.status
}

function working_dir_entries() {
	const w_dir_clone = [...working_dir]
	const iter_status = iter_fs_to_goal(w_dir_clone)

}

export {
	get_working_dir_name,
	get_working_dir_name_full,
	set_working_dir,
	SetDirStatus
}