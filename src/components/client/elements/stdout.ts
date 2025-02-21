import { bold } from "../shell/color";

import create from "./create";

function stdout_grid(left: string[], right: string[]) {
	const root = create("div", "stdout-horizontal")
	const container_left = create("div", "stdout-vertical")
	const container_right = create("div", "stdout-vertical")

	left.forEach(str => container_left.appendChild(stdout_bold(str)))
	right.forEach(str => container_right.appendChild(stdout(str)))

	root.appendChild(container_left)
	root.appendChild(container_right)
	return root
}

function stdout_horizontal(strs: string[]) {
	const p = create("p")
	strs.forEach((str, i) => {
		const tab = i !== strs.length-1 ? "\t" : ""
		p.innerText+=str+tab
	})
	return p
}

function stdout_bold(str: string) {
	const p = stdout("")
	p.appendChild(bold(str))
	return p
}

export default function stdout(str: string) {
	const p = create("p")
	p.innerText = str
	return p
}

export {
	stdout_grid,
	stdout_horizontal,
	stdout_bold
}