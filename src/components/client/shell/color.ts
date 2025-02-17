import create from "../elements/create"

const enum Colors {
	red   = "red",
	green = "green",
	blue  = "blue",
	cyan  = "cyan",
	bold  = "bold"
}
function newcolor(inner: string, color?: Colors) {
	const span = create("span", color)
	span.innerText = inner
	return span
}

const red   = (s: string) => newcolor(s, Colors.red )
const green = (s: string) => newcolor(s, Colors.green)
const blue  = (s: string) => newcolor(s, Colors.blue)
const cyan  = (s: string) => newcolor(s, Colors.cyan)
const bold  = (s: string) => newcolor(s, Colors.bold)

export default function rgb(s: string, Ru8: number, Gu8: number, Bu8: number) {
	const rgb_span = newcolor(s)
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