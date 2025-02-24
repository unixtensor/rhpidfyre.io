import type { Args, Term } from "../list";
import { blue } from "../../color";
import { get_working_dir_entries } from "../../fs/fn";
import { EntryType, FsEntry } from "../../fs/fs";

import stdout, { stdout_horizontal_elements } from "../../../elements/stdout";
import create from "../../../elements/create";

const element_collection = <T extends HTMLElement>(): T[] => []

function show_directory(entry: FsEntry) {
	const p = create("p")
	p.append(blue(entry.name, true), "/")
	return p
}

export default function ls(term: Term, args: Args): boolean {
	const ls_elements = element_collection()
	if (args[1] === undefined) {
		get_working_dir_entries().forEach(entry => {
			if (entry.type === EntryType.Directory) {
				ls_elements.push(show_directory(entry))
			} else if (entry.type === EntryType.File) {
				ls_elements.push(stdout(entry.name))
			}
		})
	}
	term.appendChild(stdout_horizontal_elements(ls_elements))
	return true
}