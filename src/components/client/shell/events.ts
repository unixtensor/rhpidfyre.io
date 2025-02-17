import Display from "./prompt"
import run from "./command/run"

const enum Key {
	Enter     = "Enter",
	ArrowUp   = "ArrowUp",
	ArrowDown = "ArrowDown",
	Tab       = "Tab"
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
}