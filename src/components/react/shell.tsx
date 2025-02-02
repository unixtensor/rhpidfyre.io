import { TermEvents } from "./terminal"

let working_fs_dir = "user"
function GetWorkingDir(): string {
	if (working_fs_dir === "user") {
		return "~"
	}
	return working_fs_dir
}

function ls() {

}

function Prompt() {
	const cyan_user = <span className="cyan">user</span>
	const green_dir = <span className="green">{GetWorkingDir()}</span>
	return <p>{cyan_user}@host {green_dir}{"> "}</p>
}

function ShellEvents() {
	const shell_input = document.getElementById("shell-input")
	if (shell_input) {
		shell_input.addEventListener("keydown", (keyboard_event) => {
			if (keyboard_event.key === "Enter") {
				console.log("woah its the enter key")
			}
		})
	}
}

function ShellPrompt() {
	return <div className="shell-prompt">
		<Prompt/>
		<input id="shell-input" type="text" spellCheck={false}/>
	</div>
}

export default function Shell() {
	const shell_prompt = ShellPrompt()
	TermEvents()
	ShellEvents()

	return shell_prompt
}