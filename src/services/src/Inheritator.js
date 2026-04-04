import HandleRequest from "./net/HandleRequest.js"
import Auth from "./auth/Auth.js"
import Task from "./task/Task.js"
import ApiConfig from "./Config.js"
import Interface from "./Interface.js"

// multi-inheritence in root
;[ApiConfig, HandleRequest].forEach((cls) => {
	Object.assign(Interface.prototype, { ...new cls() })
})

const Api = new Interface()

// multi-inheritence in its own key
;[Auth, Task].forEach((cls) => {
	const obj = { ...new cls() }
	Api[cls.name] = obj
})

export default Api
