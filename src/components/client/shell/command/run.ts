import { bold } from "../color";
import { to_args, trim } from "./parse";

import commands, { type Command } from "./list";
import create from "../../elements/create";
import history from "../history";

type Term = HTMLElement

function valid_command(term: Term, args: string[]) {
	for (const command_in_list in commands) {
		const command = args[0]
		if (command === command_in_list) {
			return (commands[command_in_list] as Command)(term, args)
		}
	}
	return
}

function unknown_command(cmd_name: string) {
	const unknown_element = create("p")
	unknown_element.innerText = "shell: Unknown command: "
	unknown_element.appendChild(bold(cmd_name))
	return unknown_element
}

export default function run(term: Term, stdin: string) {
	const args = to_args(trim(stdin))
	const valid = valid_command(term, args)
	const command = args[0] as string

	if (command !== "" && !valid) {
		return unknown_command(command)
	}
	history.add(args.join(" "))
	return false
}