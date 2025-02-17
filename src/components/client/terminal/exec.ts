import { red } from "../shell/color"
import { display_prompt, keyboard_events } from "../shell/events"

const terminal_window = document.getElementById("interactive-area")

// function panic(message: string) {
// 	return <>
// 		<p>{red("=================================================")}</p>
// 		<p>{red("An unexpected JavaScript error occured:")}</p>
// 		<p>{red(message)}</p>
// 		<p>{red("=================================================")}</p>
// 	</>
// }

// function ps1(terminal_window_safe: HTMLElement): JSX.Element[] {
// 	const [renderedElements, renderElement] = useState([display_prompt()])
// 	const new_elements_f = (elements: JSX.Element[]) => renderElement([...renderedElements, ...elements])

// 	keyboard_events(terminal_window_safe, new_elements_f)

// 	return renderedElements
// }

// export default function Shell() {
// 	if (terminal_window) {
// 		return ps1(terminal_window).map((element, k) => <React.Fragment key={k}>{element}</React.Fragment>)
// 	}
// 	return panic("The <main> element is missing")
// }

// export {
// 	panic,
// 	type newElement,
// }