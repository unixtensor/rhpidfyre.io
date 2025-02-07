const red   = (s: string) => <span className="red">{s}</span>
const green = (s: string) => <span className="green">{s}</span>
const blue  = (s: string) => <span className="blue">{s}</span>
const cyan  = (s: string) => <span className="cyan">{s}</span>
const bold  = (s: string) => <span className="bold">{s}</span>

export default function rgb(s: string, Ru8: number, Gu8: number, Bu8: number) {
	return <span style={{color: `rgb(${Ru8},${Gu8},${Bu8})`}}>{s}</span>
}

export {
	red,
	green,
	blue,
	cyan,
	bold
}