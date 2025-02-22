import type { Args, Term } from "../list"

export default function clear(term: Term, args: Args): boolean {
	Array.from(term.children).forEach(node => {
		if (node.tagName === "DIV") {
			if (node.className === "shell-prompt") {
				const input = node.getElementsByClassName("shell-ps1")[0] as HTMLInputElement
				if (input.disabled || input.value === "clear") {
					node.remove()
				}
			} else {
				node.remove()
			}
		} else if (node.tagName === "P") {
			node.remove()
		}
	})
	return true
}