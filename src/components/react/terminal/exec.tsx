import { useState, type JSX } from "react"
import { red } from "../shell/color"
import { display_prompt, keyboard_events } from "../shell/events"

import React from "react"

const terminal_window = document.querySelector("main")

function panic(message: string) {
	return <>
		<p>{red("=================================================")}</p>
		<p>{red("An unexpected JavaScript error occured:")}</p>
		<p>{red(message)}</p>
		<p>{red("=================================================")}</p>
	</>
}

type newElement = (elements: JSX.Element[]) => void

export default function Shell() {
	if (terminal_window) {
		const [renderedElements, renderElement] = useState([display_prompt()])
		const new_element_f = (elements: JSX.Element[]) => renderElement([...renderedElements, ...elements])

		keyboard_events(terminal_window, new_element_f)

		return renderedElements.map((element, k) => <React.Fragment key={k}>{element}</React.Fragment>)
	}
	return panic("The <main> element is missing")
}

export {
	panic,
	type newElement,
}