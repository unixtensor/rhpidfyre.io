import Display from "./prompt"
import run from "./command/run"

import { type newElement } from "../terminal/exec";
import type { JSX } from "react";

const enum Key {
	Enter     = "Enter",
	ArrowUp   = "ArrowUp",
	ArrowDown = "ArrowDown",
	Tab       = "Tab"
}

function display_prompt() {
	return <div className="shell-prompt">
		<Display/>
		<input className="shell-ps1" type="text" spellCheck={false}/>
	</div>
}

function get_current_prompt(): HTMLInputElement | undefined {
	const shell_input = document.getElementsByClassName("shell-ps1")

	return shell_input[shell_input.length-1] as HTMLInputElement
}

function new_prompt(): JSX.Element {
	const shell_prompts = document.getElementsByClassName("shell-ps1")

	Array.from(shell_prompts).forEach(shellps1 => {
		(shellps1 as HTMLInputElement).disabled = true
	})
	return display_prompt()
}

function keyboard_events(terminal_window: HTMLElement, new_elements_f: newElement) {
	const terminal_event = (keyboard_event: KeyboardEvent) => {
		if (keyboard_event.key === Key.Enter) {
			keyboard_event.preventDefault()
			const current_prompt = get_current_prompt()
			if (current_prompt) {
				const prompt = new_prompt()
				const output = run(current_prompt.value)
				new_elements_f([output, prompt])
				terminal_window.removeEventListener("keydown", terminal_event)
			}
		} else if (keyboard_event.key === Key.ArrowUp) {
			keyboard_event.preventDefault()
		} else if (keyboard_event.key === Key.ArrowDown) {
			keyboard_event.preventDefault()
		} else if (keyboard_event.key === Key.Tab) {
			keyboard_event.preventDefault()
		}
	}
	terminal_window.addEventListener("keydown", terminal_event)
}

export {
	keyboard_events,
	display_prompt,
	get_current_prompt
}