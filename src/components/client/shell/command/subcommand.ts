import { stdout_grid } from "../../elements/stdout";
import type { Term } from "./list";

interface SubCommandAction {
	inner: (term: Term) => void,
	description: string
}
interface SubCommand {
	[index: string]: SubCommandAction
}

export default function subcmd(help_description?: string): SubCommand {
	const subcommand = {} as SubCommand
	subcommand.help = {} as SubCommandAction
	subcommand.help.inner = function(term: Term) {
		const descriptions: string[] = []
		Object.values(subcommand).forEach(v => descriptions.push(v.description))
		term.appendChild(stdout_grid(Object.keys(subcommand), descriptions))
	}
	subcommand.help.description = help_description ? help_description : "Show the help page"

	return subcommand
}

export {
	type SubCommand,
	type SubCommandAction
}