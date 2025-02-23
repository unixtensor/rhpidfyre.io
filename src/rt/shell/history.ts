interface HistoryFile {
	inner: string[],
	cursor: number,
	cursor_reset: () => void
}
interface History {
	file: HistoryFile
	add: (cmd: string) => void,
	index_up: (ps1input: HTMLInputElement) => void,
	index_down: (ps1input: HTMLInputElement) => void
}

const history = {} as History
history.file = {} as HistoryFile
history.file.inner = []
history.file.cursor = 0
history.file.cursor_reset = function() {
	this.cursor = 0
}

history.add = function(cmd: string) {
	if (this.file.inner[0] !== cmd) {
		this.file.inner.unshift(cmd)
	}
}

history.index_up = function(ps1input: HTMLInputElement) {
	const item = this.file.inner[this.file.cursor]
	if (item) {
		this.file.cursor+=1
		ps1input.value = item
	}
}

history.index_down = function(ps1input: HTMLInputElement) {
	if (this.file.cursor!==0) {
		this.file.cursor-=1
		if (this.file.cursor!==0) {
			const item = this.file.inner[this.file.cursor-1]
			if (item) { ps1input.value = item }
		} else {
			this.file.cursor_reset()
			ps1input.value = ""
		}
	}
}

export default history