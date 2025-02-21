import type { Args, Term } from "./list";
import { bold } from "../color";

import stdout, { stdout_horizontal } from "../../elements/stdout";
import subcmd, { type SubCommandAction } from "./subcommand";
import history from "../history";
import create from "../../elements/create";

const history_command = subcmd()

history_command.show = {} as SubCommandAction
history_command.show.inner = function(term: Term) {
	history.file.inner.forEach((entry, ind) => term.appendChild(stdout(`${ind} ${entry}`)))
}
history_command.show.description = "Show the history"

export default function history_cmd(term: Term, args: Args) {
	const subc = args[1]
	if (subc) {
		const subc_f = history_command[subc]
		if (subc_f) { subc_f.inner(term) } else { history_command.help.inner(term) }
	}
	return true
}