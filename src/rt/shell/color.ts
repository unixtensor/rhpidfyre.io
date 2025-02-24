import create from "../elements/create"

const enum Colors {
	red   = "red",
	green = "green",
	blue  = "blue",
	cyan  = "cyan",
	bold  = "bold"
}
function newcolor(inner: string, color?: Colors, bold?: boolean) {
	const span = create("span", color)
	span.innerText = inner
	if (bold) {
		span.className = color ? color+" bold" : "bold"
	}
	return span
}

const red   = (s: string, bold?: boolean) => newcolor(s, Colors.red,   bold)
const green = (s: string, bold?: boolean) => newcolor(s, Colors.green, bold)
const blue  = (s: string, bold?: boolean) => newcolor(s, Colors.blue,  bold)
const cyan  = (s: string, bold?: boolean) => newcolor(s, Colors.cyan,  bold)
const bold  = (s: string)                 => newcolor(s, Colors.bold)

export default function rgb(s: string, Ru8: number, Gu8: number, Bu8: number, bold?: boolean) {
	const rgb_span = newcolor(s, undefined, bold)
	rgb_span.style.color = `rgb(${Ru8},${Gu8},${Bu8})`
	return rgb_span
}

export {
	red,
	green,
	blue,
	cyan,
	bold
}