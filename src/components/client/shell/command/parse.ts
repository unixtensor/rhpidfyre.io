function trim(stdin: string): string {
	const trimmed_str: string[] = []
	stdin.split(" ").forEach(s => { if (s !== "") { trimmed_str.push(s) } })
	return trimmed_str.join(" ")
}

function to_args(trimmed_str: string): string[] {
	return trimmed_str.split(" ")
}

export {
	trim,
	to_args
}