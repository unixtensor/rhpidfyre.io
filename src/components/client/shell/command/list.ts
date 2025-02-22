import history from "./builtin/history"
import clear from "./builtin/clear"
import pwd from "./builtin/pwd"
import cat from "./builtin/cat"
import cd from "./builtin/cd"
import ls from "./builtin/ls"

type Term = HTMLElement
type Args = string[]
type Command = (term: Term, args: Args) => boolean

interface CommandsList {
	[index: string]: Command,
}

const commands: CommandsList = {
	["history"]: history,
	["clear"]: clear,
	["pwd"]: pwd,
	["cat"]: cat,
	["cd"]: cd,
	["ls"]: ls,
}

export default commands
export {
	type Command,
	type Term,
	type Args
}