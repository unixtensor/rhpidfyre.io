import { get_working_dir_name_full } from "./fs/fn"
import { cyan, green } from "./color"

const userAgent = navigator.userAgent
const browser_name_fallible = userAgent.match(/Firefox.\d+[\d.\d]+|Chrome.\d+[\d.\d]+/gm)?.map(f => f.split("/")[0])

let browser_name = "unknown"
if (browser_name_fallible) {
	browser_name = browser_name_fallible[0] === "Firefox" ? "gecko" : "chromium"
}

function working_dir() {
	const name = get_working_dir_name_full()
	return name === "user" ? "~" : name
}

export default function Display() {
	const user = cyan("user")
	const dir = green(working_dir())
	return <p>{user}@{browser_name} {dir}{"> "}</p>
}

export { userAgent }