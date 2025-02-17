import type { JSX } from "react"
import { bold } from "../color"
import { get_working_dir_name_full, set_working_dir, SetDirStatus } from "../fs/fn"

type args = string[]
type command = JSX.Element | boolean

function parse_ls(entries: JSX.Element[]) {
	return <div className="horizontal-display">

	</div>
}

function cd(args: args): command {
	const new_dir_status = set_working_dir(args[1])

	if (new_dir_status === SetDirStatus.NotADirectory) {
		return <p>{"cd: \""}{bold(args[1])}{"\" is not a directory"}</p>
	} else if (new_dir_status === SetDirStatus.NotFound) {
		return <p>{"cd: The directory \""}{bold(args[1])}{"\" does not exist"}</p>
	}
	return true
}

function ls(args: args): command {
	// if (args[1] === undefined) {
	// 	for (const dir_name in working_dir) {

	// 	}
	// 	return <p>{`${working_dir}`}</p>
	// }
	return true
}

function pwd(args: args): command {
	return <p>{`${get_working_dir_name_full()}`}</p>
}

function cat(args: args): command {
	return true
}

interface commands_list {
	[index: string]: (args: args) => command
}
const commands: commands_list = {
	["cd"]: cd,
	["ls"]: ls,
	["pwd"]: pwd,
	["cat"]: cat,
}

export default commands