import create from "./create"

const layout = (type: string) => create("div", type)

function horizontal_wrap() {
	return layout("stdout-horizontal-wrap")
}

function horizontal() {
	return layout("stdout-horizontal")
}

function vertical() {
	return layout("stdout-vertical")
}

export {
	horizontal_wrap,
	horizontal,
	vertical
}