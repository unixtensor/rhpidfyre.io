import { working_dir } from "../fs"

type args = string[]

function ls(args: args) {
	console.log(args)
}

function pwd(args: args) {

}

function cat(args: args) {

}

interface commands_list {
	[index: string]: (args: args) => void
}
const commands: commands_list = {
	["ls"]: ls,
	["pwd"]: pwd,
	["cat"]: cat,
}

export default commands