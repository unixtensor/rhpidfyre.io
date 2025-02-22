import type { Args, Term } from "../list";
import { bold } from "../../color";

import stdout, { stdout_horizontal } from "../../../elements/stdout";
import SubCommand, { type SubCommandAction } from "../subcommand";
import history from "../../history";
import create from "../../../elements/create";

const history_command = new SubCommand("show and manipulate command history")

history_command.add("show", [], "Show the history", function(term: Term) {
	history.file.inner.forEach((entry, ind) => term.appendChild(stdout(`${ind} ${entry}`)))
})

history_command.add("clear", ["delete"], "Delete the command history", function(term: Term) {
	const entries = history.file.inner.length
	history.file.inner = []
	term.appendChild(stdout(`Cleared ${entries} entries from the history.`))
})

export default function history_cmd(term: Term, args: Args) {
	const subc = args[1]
	if (subc) {
		const subc_f = history_command.data[subc]
		if (subc_f) { subc_f.inner(term) } else {
			term.appendChild(SubCommand.unknown("history", subc))
			history_command.data.help.inner(term)
		}
	}
	return true
}