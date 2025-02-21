import history from "./shell/history"
import prompt from "./elements/prompt"
import keys from "./keys"

const term_win_unsafe = document.querySelector("main")
const enum Key {
	Enter      = "Enter",
	ArrowRight = "ArrowRight",
	ArrowUp    = "ArrowUp",
	ArrowDown  = "ArrowDown",
	Tab        = "Tab"
}

function spawnps1(term_win_safe: HTMLElement) {
	const ps1prompt = prompt()
	term_win_safe.appendChild(ps1prompt.body)
	bind_processor(term_win_safe, ps1prompt.input)
	history.file.cursor_reset()
	ps1prompt.input.focus()
}

function bind_processor(term_win_safe: HTMLElement, ps1prompt_input: HTMLInputElement) {
	const input_closure = (key_event: KeyboardEvent) => {
		if (key_event.key === Key.Enter) {
			key_event.preventDefault()
			keys.enter({
				term_win_safe: term_win_safe,
				ps1input: ps1prompt_input,
				closure: input_closure
			})
			spawnps1(term_win_safe)
		} else if (key_event.key === Key.Tab) {
			key_event.preventDefault()

		} else if (key_event.key === Key.ArrowRight) {
			key_event.preventDefault()

		} else if (key_event.key === Key.ArrowUp) {
			key_event.preventDefault()
			keys.up_arrow(ps1prompt_input)
		} else if (key_event.key === Key.ArrowDown) {
			key_event.preventDefault()
			keys.down_arrow(ps1prompt_input)
		}
	}
	ps1prompt_input.addEventListener("keydown", input_closure)
}

if (term_win_unsafe) {
	spawnps1(term_win_unsafe)
} else {

}