import { bold } from "../shell/color";
import { horizontal, vertical } from "./layout";

import create from "./create";
import wrapindicator from "./wrapindicator";

function stdout_grid<T extends HTMLElement>(left: string[], right: string[], header?: T) {
	const wrap_indicator = wrapindicator()
	const container_left = vertical()
	const container_right = vertical()

	container_left.append(...left.map(str => stdout_bold(str)))
	container_right.append(...right.map(str => stdout(str)))

	if (header) {
		const container_right_header = vertical()
		const help_container = horizontal()
		help_container.append(container_left, container_right)
		container_right_header.append(header, help_container)
		wrap_indicator.appendChild(container_right_header)
	} else {
		const container = horizontal()
		container.append(container_left, container_right)
		wrap_indicator.appendChild(container)
	}
	return wrap_indicator
}

function stdout_horizontal_elements<T extends HTMLElement>(elements: T[]) {
	const h_elements_out = horizontal()
	h_elements_out.append(...elements)
	return h_elements_out
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
	stdout_horizontal_elements,
	stdout_horizontal,
	stdout_grid,
	stdout_bold
}