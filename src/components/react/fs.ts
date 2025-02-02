const user = {
	["about_me"]: {},
	["services"]: {}
}
const home = {
	["user"]: user
}
const root = {
	["bin"]: {},
	["home"]: {}
}

const fs = {
	["/"]: root
}

export { fs }