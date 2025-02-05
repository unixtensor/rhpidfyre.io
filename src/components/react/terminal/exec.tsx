import { TermEvents } from "./events"
import { red } from "../shell/color"

import Events from "../shell/events"

function Panic(message: string) {
	return <>
		<p>{red("=================================================")}</p>
		<p>{red("An unexpected JavaScript error occured:")}</p>
		<p>{red(message)}</p>
		<p>{red("=================================================")}</p>
	</>
}

export default function Shell() {
	const existingPrompts = Events()
	if (existingPrompts) {
		return existingPrompts.map((ps1, k) => <div className="shell-prompt" key={k}>{ps1}</div>)
	}
	return Panic("The <main> element is missing")
}