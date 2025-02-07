import type { JSX } from "react";
import commands from "./list";
import { bold } from "../color";

function trim(stdin: string): string {
	const trimmed_str: string[] = []
	stdin.split(" ").forEach(s => { if (s !== "") { trimmed_str.push(s) } })
	return trimmed_str.join(" ")
}

function to_args(trimmed_str: string): string[] {
	return trimmed_str.split(" ")
}

function valid_command(args: string[]): JSX.Element | undefined {
	for (const command_in_list in commands) {
		const command = args[0]
		if (command === command_in_list) {
			return commands[command_in_list](args)
		}
	}
	return
}

function unknown_command(cmd_name: string) {
	return <p>{"shell: Unknown command: "}{bold(cmd_name)}</p>
}

export default function run(stdin: string) {
	const args = to_args(trim(stdin))
	const command = valid_command(args)

	if (args[0] !== "" && !command) {
		return unknown_command(args[0])
	}
	return command ? command : <></>
}