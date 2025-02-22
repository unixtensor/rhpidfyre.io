import { set_working_dir, SetDirStatus } from "../../fs/fn"
import type { Args, Term } from "../list"

export default function cd(term: Term, args: Args): boolean {
	const new_dir_status = set_working_dir(args[1])

	if (new_dir_status === SetDirStatus.NotADirectory) {
		// return <p>{"cd: \""}{bold(args[1])}{"\" is not a directory"}</p>
	} else if (new_dir_status === SetDirStatus.NotFound) {
		// return <p>{"cd: The directory \""}{bold(args[1])}{"\" does not exist"}</p>
	}
	return true
}