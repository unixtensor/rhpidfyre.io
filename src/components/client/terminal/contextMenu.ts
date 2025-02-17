const terminal_window = document.querySelector("main")

interface PromptPosition {
	x: number,
	y: number,
}

interface PromptContext extends PromptPosition {
	enabled: boolean,
}

function Menu(pos: PromptPosition) {
	console.log(pos.x, pos.y)
}

export default function ContextMenu() {
	if (terminal_window) {
		useEffect(() => {
			const [contextMenu, newContextMenu] = useState(false)
			const [_, toggleRightClick] = useState({enabled: false, x: 0, y: 0})

			terminal_window.addEventListener("contextmenu", (menuEvent) => {
				menuEvent.preventDefault()
				toggleRightClick({enabled: true, x: menuEvent.pageX, y: menuEvent.pageY})
				Menu({x: menuEvent.pageX, y: menuEvent.pageY})
			})
		})

	}
}