// import { red } from "../shell/color"
// import { display_prompt, keyboard_events } from "../shell/events"

import prompt from "./elements/prompt"
// import run from "./shell/command/run"

const terminal_window = document.querySelector("main")

const enum Key {
	Enter     = "Enter",
	ArrowUp   = "ArrowUp",
	ArrowDown = "ArrowDown",
	Tab       = "Tab"
}

function spawnps1(terminal_window_safe: HTMLElement) {
	const ps1prompt = prompt()
	terminal_window_safe.appendChild(ps1prompt.body)
	input_processor(ps1prompt.input)
}

type InputClosure = (key_event: KeyboardEvent) => void
function key_enter(ps1input: HTMLInputElement, key_event: KeyboardEvent, input_closure: InputClosure) {
	key_event.preventDefault()
	// run(ps1input.value)
	ps1input.removeEventListener("keydown", input_closure)
}

function input_processor(ps1input: HTMLInputElement) {
	const input_closure = (key_event: KeyboardEvent) => {
		if (key_event.key === Key.Enter) {
			key_enter(ps1input, key_event, input_closure)
		}
	}
	ps1input.addEventListener("keydown", input_closure)
}

if (terminal_window) {
	spawnps1(terminal_window)
} else {

}