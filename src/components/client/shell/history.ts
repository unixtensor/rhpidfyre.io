const history_list: string[] = []

interface History {
	add: (cmd: string) => void
}
const history = {} as History

history.add = function(cmd: string) {
	if (history_list[history_list.length-1] !== cmd) {
		history_list.push(cmd)
	}
}

export default history
export { history_list }