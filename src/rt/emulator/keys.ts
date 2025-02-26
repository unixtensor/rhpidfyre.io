import run from "../shell/command/command"
import history from "../shell/history"

type InputClosure = (key_event: KeyboardEvent) => void
interface EnterArgs {
	readonly term_win_safe: HTMLElement,
	readonly ps1input: HTMLInputElement,
	readonly closure: InputClosure
}
interface Keys {
	enter: (input: EnterArgs) => void,
	up_arrow: (ps1input: HTMLInputElement) => void,
	down_arrow: (ps1input: HTMLInputElement) => void,
}

const keys = {} as Keys

keys.enter = function(input: EnterArgs) {
	const unknown_command_msg = run(input.term_win_safe, input.ps1input.value)
	if (unknown_command_msg) {
		input.term_win_safe.appendChild(unknown_command_msg)
	}
	input.ps1input.removeEventListener("keydown", input.closure)
}

keys.up_arrow = function(ps1input: HTMLInputElement) {
	history.index_up(ps1input)
}

keys.down_arrow = function(ps1input: HTMLInputElement) {
	history.index_down(ps1input)
}

export default keys