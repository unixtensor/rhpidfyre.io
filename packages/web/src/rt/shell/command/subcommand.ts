import stdout, { stdout_grid } from "../../elements/stdout";
import { bold } from "../color";
import type { Args, Term } from "./list";

type SubCommandClosure = (term: Term, args: Args) => void
interface SubCommandAction {
	inner: SubCommandClosure,
	description: string,
}
interface SubCommands {
	[index: string]: SubCommandAction,
}

function subcommand_help(data: SubCommands, cmd_description: string, term: Term) {
	const subcmd_descriptions: string[] = []
	Object.values(data).forEach(sub_cmd => subcmd_descriptions.push(sub_cmd.description))

	term.appendChild(stdout_grid(Object.keys(data), subcmd_descriptions, stdout(cmd_description)))
}

const SubCommand = class {
	public data: SubCommands //data? less goo!

	constructor(cmd_description: string) {
		this.data = {}
		this.data.help = {} as SubCommandAction
		this.data.help.description = "Display help info"
		this.data.help.inner = (term: Term, _args: Args) => subcommand_help(this.data, cmd_description, term)
	}

	public process(term: Term, args: Args) {
		const subc = args[1]
		if (subc) {
			const subc_f = this.data[subc]
			if (subc_f) {
				subc_f.inner(term, args)
			} else {
				term.appendChild(SubCommand.unknown(subc))
				this.data.help.inner(term, args)
			}
		} else {
			this.data.help.inner(term, args)
		}
	}

	public add(name: string, description: string, f: SubCommandClosure) {
		this.data[name] = {} as SubCommandAction
		this.data[name].description = description
		this.data[name].inner = f
	}

	public static unknown(subcmd_name: string) {
		const subcmd_unknown = stdout("Unknown sub-command: ")
		subcmd_unknown.appendChild(bold(subcmd_name))
		return subcmd_unknown
	}
}

export default SubCommand

export {
	type SubCommand,
	type SubCommandAction
}