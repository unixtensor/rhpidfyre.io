import { working_dir } from "../fs"
import { cyan, green } from "./color"

const userAgent = navigator.userAgent
const browser_name_fallible = userAgent.match(/Firefox.\d+[\d.\d]+|Chrome.\d+[\d.\d]+/gm)?.map(f => f.split("/")[0])
const browser_name = browser_name_fallible ? browser_name_fallible[0].toLowerCase() : "unknown"

function GetWorkingDir() {
	return working_dir === "user" ? "~" : working_dir
}

export default function Display() {
	const user = cyan("user")
	const dir = green(GetWorkingDir())
	return <p>{user}@{browser_name} {dir}{"> "}</p>
}

export { userAgent }