function create<T extends keyof HTMLElementTagNameMap>(element: T, className?: string): HTMLElementTagNameMap[T] {
	const new_element = document.createElement(element)
	if (className) {
		new_element.className = className
	}
	return new_element
}

export default create