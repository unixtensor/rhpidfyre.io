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

function display_prompt() {
	return <>
		<Display/>
		<input className="shell-ps1" type="text" spellCheck={false}/>
	</>
}

function get_current_prompt(): HTMLInputElement | undefined {
	const shell_input = document.getElementsByClassName("shell-ps1")
	return shell_input[shell_input.length-1] as HTMLInputElement
}

function new_prompt([existingPrompts, setPrompt]: [JSX.Element[], SetStateAction<JSX.Element[]>]) {
	const shell_prompts = document.getElementsByClassName("shell-ps1")
	Array.from(shell_prompts).forEach(shellps1 => {
		(shellps1 as HTMLInputElement).disabled = true
	})
	setPrompt([...existingPrompts, display_prompt()])
}

function keyboard_event(terminal: HTMLElement, existingPrompts: JSX.Element[], setPrompt: SetStateAction<JSX.Element[]>) {
	const terminal_event = (keyboard_event: KeyboardEvent) => {
		if (keyboard_event.key === Key.Enter) {
			const current_prompt = get_current_prompt()
			if (current_prompt) {
				new_prompt([existingPrompts, setPrompt])
				terminal.removeEventListener("keydown", terminal_event)
			}
		} else if (keyboard_event.key === Key.ArrowUp) {

		} else if (keyboard_event.key === Key.ArrowDown) {

		} else if (keyboard_event.key === Key.Tab) {

		}
	}
	terminal.addEventListener("keydown", terminal_event)
}

export {
	keyboard_event,
	display_prompt
}