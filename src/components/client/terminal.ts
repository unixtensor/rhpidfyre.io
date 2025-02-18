import { history_list } from "./shell/history"

import prompt from "./elements/prompt"
import run from "./shell/command/run"

let history_index = 0

const term_win_unsafe = document.querySelector("main")
const enum Key {
	Enter      = "Enter",
	ArrowRight = "ArrowRight",
	ArrowUp    = "ArrowUp",
	ArrowDown  = "ArrowDown",
	Tab        = "Tab"
}

type InputClosure = (key_event: KeyboardEvent) => void
interface EnterArgs {
	readonly term_win_safe: HTMLElement,
	readonly ps1input: HTMLInputElement,
	readonly closure: InputClosure
}
function key_enter(input: EnterArgs) {
	const unknown_command_msg = run(input.term_win_safe, input.ps1input.value)

	if (unknown_command_msg) {
		input.term_win_safe.appendChild(unknown_command_msg)
	}
	input.ps1input.removeEventListener("keydown", input.closure)
	spawnps1(input.term_win_safe)
}

function key_up_arrow(ps1input: HTMLInputElement) {
	const history_item = history_list[history_index]
	if (history_item) {
		ps1input.value = history_item
		history_index+=1
	}
}

function key_down_arrow(ps1input: HTMLInputElement) {
	const history_item = history_list[history_index]
	if (history_item) {
		history_index-=1
		if (history_index === -1) {
			history_index = 0
		} else {
			ps1input.value = history_item
		}
	}
}

function spawnps1(term_win_safe: HTMLElement) {
	const ps1prompt = prompt()
	term_win_safe.appendChild(ps1prompt.body)
	bind_processor(term_win_safe, ps1prompt.input)
	history_index = 0
	ps1prompt.input.focus()
}

function bind_processor(term_win_safe: HTMLElement, ps1prompt_input: HTMLInputElement) {
	const input_closure = (key_event: KeyboardEvent) => {
		if (key_event.key === Key.Enter) {
			key_event.preventDefault()
			key_enter({
				term_win_safe: term_win_safe,
				ps1input: ps1prompt_input,
				closure: input_closure
			})
		} else if (key_event.key === Key.Tab) {
			key_event.preventDefault()

		} else if (key_event.key === Key.ArrowRight) {
			key_event.preventDefault()

		} else if (key_event.key === Key.ArrowUp) {
			key_event.preventDefault()
			key_up_arrow(ps1prompt_input)
		} else if (key_event.key === Key.ArrowDown) {
			key_event.preventDefault()
			key_down_arrow(ps1prompt_input)
		}
	}
	ps1prompt_input.addEventListener("keydown", input_closure)
}

if (term_win_unsafe) {
	spawnps1(term_win_unsafe)
} else {

}