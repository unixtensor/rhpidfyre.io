import { useState } from "react"
import type { JSX } from "react/jsx-dev-runtime"

import Display from "./prompt"

type SetStateAction<T> = React.Dispatch<React.SetStateAction<T>>
const enum Key {
	Enter     = "Enter",
	ArrowUp   = "ArrowUp",
	ArrowDown = "ArrowDown",
	Tab       = "Tab"
}

function DisplayPrompt() {
	return <>
		<Display/>
		<input className="shell-ps1" type="text" spellCheck={false}/>
	</>
}

function Prompt([existingPrompts, setPrompt]: [JSX.Element[], SetStateAction<JSX.Element[]>]) {
	const shell_prompts = document.getElementsByClassName("shell-ps1")
	Array.from(shell_prompts).forEach((shellps1) => {
		(shellps1 as HTMLInputElement).disabled = true
	})
	setPrompt([...existingPrompts, DisplayPrompt()])
}

function keyboard_stream(terminal_window: HTMLElement, existingPrompts: JSX.Element[], setPrompt: SetStateAction<JSX.Element[]>) {
	terminal_window.addEventListener("keydown", keyboard_event => {
		if (keyboard_event.key === Key.Enter) {
			Prompt([existingPrompts, setPrompt])
		} else if (keyboard_event.key === Key.ArrowUp) {

		} else if (keyboard_event.key === Key.ArrowDown) {

		} else if (keyboard_event.key === Key.Tab) {

		}
	})
}

function Events() {
	const terminal_window = document.querySelector("main")
	if (terminal_window) {
		const [existingPrompts, setPrompt] = useState([DisplayPrompt()])

		keyboard_stream(terminal_window, existingPrompts, setPrompt)
		return existingPrompts
	}
	return
}

export default Events