import { useState } from "react"
import { red } from "../shell/color"

import { display_prompt, keyboard_event } from "../shell/events"

const terminal_window = document.querySelector("main")

function panic(message: string) {
	return <>
		<p>{red("=================================================")}</p>
		<p>{red("An unexpected JavaScript error occured:")}</p>
		<p>{red(message)}</p>
		<p>{red("=================================================")}</p>
	</>
}

export default function Shell() {
	if (terminal_window) {
		const [existingPrompts, setPrompt] = useState([display_prompt()])
		keyboard_event(terminal_window, existingPrompts, setPrompt)

		return existingPrompts.map((ps1, k) => <div className="shell-prompt" key={k}>{ps1}</div>)
	}
	return panic("The <main> element is missing")
}

export { panic }