import { get_working_dir_name_full } from "../../../rfwfs/library";
import type { Args, Term } from "../list";

import stdout from "../../../elements/stdout";

export default function pwd(term: Term, args: Args): boolean {
	term.appendChild(stdout(get_working_dir_name_full()))
	return true
}