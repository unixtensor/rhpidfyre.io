import type { JSX } from "react/jsx-dev-runtime"
import { TermEvents } from "./term_events"
import { createRoot } from "react-dom/client"
import { useState } from "react"

import Prompt from "./shell/prompt"

const active_shell_prompt = ShellPrompt()

function ShellEvents() {
	const shell_input = document.querySelector("main")
	if (shell_input) {
		const [prompts, newPrompt] = useState([])
		shell_input.addEventListener("keydown", (keyboard_event) => {
			if (keyboard_event.key == "Enter") {

			}
		})
	}
}

function ShellPrompt() {
	return <div className="shell-prompt">
		<Prompt/>
		<input id="shell-input" type="text" spellCheck={false} autoFocus/>
	</div>
}

export default function Shell() {
	TermEvents()
	ShellEvents()
	return active_shell_prompt
}