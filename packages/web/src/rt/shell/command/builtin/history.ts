import type { Args, Term } from "../list";

import stdout from "../../../elements/stdout";
import SubCommand from "../subcommand";
import history from "../../history";

const history_command = new SubCommand("Show and manipulate command history")

history_command.add("show", "Show the history", function(term: Term, _args: Args) {
	history.file.inner.forEach((entry, ind) => term.appendChild(stdout(`${ind+1} ${entry}`)))
})

history_command.add("clear", "Delete the entire command history", function(term: Term, _args: Args) {
	const entries = history.file.inner.length
	history.file.inner = []
	term.appendChild(stdout(`Cleared ${entries} entries from the history.`))
})

export default function history_cmd(term: Term, args: Args) {
	history_command.process(term, args)
	return true
}