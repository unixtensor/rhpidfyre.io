import { get_working_dir_name_full, set_working_dir, SetDirStatus } from "../fs/fn"

import history_cmd from "./builtin/history"
import stdout from "../../elements/stdout"

type Term = HTMLElement
type Args = string[]

function clear(term: Term, args: Args): boolean {
	Array.from(term.children).forEach(node => {
		if (node.tagName === "DIV") {
			if (node.className === "shell-prompt") {
				const input = node.getElementsByClassName("shell-ps1")[0] as HTMLInputElement
				if (input.disabled || input.value === "clear") {
					node.remove()
				}
			} else {
				node.remove()
			}
		} else if (node.tagName === "P") {
			node.remove()
		}
	})
	return true
}

function cd(term: Term, args: Args): boolean {
	const new_dir_status = set_working_dir(args[1])

	if (new_dir_status === SetDirStatus.NotADirectory) {
		// return <p>{"cd: \""}{bold(args[1])}{"\" is not a directory"}</p>
	} else if (new_dir_status === SetDirStatus.NotFound) {
		// return <p>{"cd: The directory \""}{bold(args[1])}{"\" does not exist"}</p>
	}
	return true
}

function ls(term: Term, args: Args): boolean {
	// if (args[1] === undefined) {
	// 	for (const dir_name in working_dir) {

	// 	}
	// 	return <p>{`${working_dir}`}</p>
	// }
	return true
}

function pwd(term: Term, args: Args): boolean {
	term.appendChild(stdout(get_working_dir_name_full()))
	return true
}

function cat(term: Term, args: Args): boolean {
	return true
}

type Command = (term: Term, args: Args) => boolean
interface CommandsList {
	[index: string]: Command,
}
const commands: CommandsList = {
	["clear"]: clear,
	["cd"]: cd,
	["ls"]: ls,
	["pwd"]: pwd,
	["cat"]: cat,
	["history"]: history_cmd,
}

export default commands
export {
	type Command,
	type Term,
	type Args
}