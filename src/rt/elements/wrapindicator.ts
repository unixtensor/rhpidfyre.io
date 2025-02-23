import { horizontal_wrap } from "./layout";

import create from "./create";

export default function wrapindicator() {
	const wi_layout = horizontal_wrap()
	wi_layout.appendChild(create("div", "wrap-indicator"))
	return wi_layout
}