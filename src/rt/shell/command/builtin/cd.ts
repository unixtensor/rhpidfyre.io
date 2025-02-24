import { set_working_dir, SetDirStatus } from "../../fs/library"
import type { Args, Term } from "../list"

import stdout from "../../../elements/stdout"

export default function cd(term: Term, args: Args): boolean {
	const new_dir_status = set_working_dir(args[1])

	if (new_dir_status === SetDirStatus.NotADirectory) {
		term.appendChild(stdout(`cd: "${args[1]}" is not a directory`))
	} else if (new_dir_status === SetDirStatus.NotFound) {
		term.appendChild(stdout(`cd: The directory "${args[1]}" does not exist`))
	}
	return true
}