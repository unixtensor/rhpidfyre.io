import { working_dir } from "../fs"
import rgb, { cyan, green } from "./color"

const GetWorkingDir = () => working_dir === "user" ? "~" : working_dir

export default function Prompt() {
	const user = cyan("user")
	const dir = green(GetWorkingDir())
	return <p>{user}@host {dir}{"> "}</p>
}