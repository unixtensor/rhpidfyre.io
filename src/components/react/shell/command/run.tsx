import type { JSX } from "react";
import type { Root } from "react-dom/client";
import { type newElement } from "../../terminal/exec";

import commands from "./list";

type Renderer<T> = React.Dispatch<React.SetStateAction<T>>

function trim(stdin: string): string {
	const trimmed_str: string[] = []
	stdin.split(" ").forEach(s => { if (s != "") { trimmed_str.push(s) } })
	return trimmed_str.join(" ")
}

function to_args(trimmed_str: string): string[] {
	return trimmed_str.split(" ")
}

function valid_command(args: string[]): boolean {
	for (const command_in_list in commands) {
		const command = args[0]
		if (command === command_in_list) {
			commands[command_in_list](args)
			return true
		}
	}
	return false
}

function unknown_command(name: string) {
	return <p>{`sh: Unknown command: ${name}`}</p>
}

export default function run(stdin: string) {
	const args = to_args(trim(stdin))

	if (args[0] !== "" && !valid_command(args)) {
		return unknown_command(args[0])
	}
	return <></>
}