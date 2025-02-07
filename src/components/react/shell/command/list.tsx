import type { JSX } from "react"
import { Entry } from "../fs/fs"
import { blue } from "../color"
import { set_working_dir } from "../fs/fn"

type args = string[]
type command = JSX.Element | undefined

function parse_ls(entries: JSX.Element[]) {
	return <div className="horizontal-display">

	</div>
}

function cd(args: args): command {
	set_working_dir(args[1])
}

function ls(args: args): command {
	// if (args[1] === undefined) {
	// 	for (const dir_name in working_dir) {

	// 	}
	// 	return <p>{`${working_dir}`}</p>
	// }
}

function pwd(args: args): command {
	const tree: string[] = []

	return <p>{`${tree.join("/")}`}</p>
}

function cat(args: args): command {
	return
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