import ErrMsg from "../config/errorMessages"

export default class Auth {
    static #base_url = "http://todo.souperlopers.ir/api/v1"
    refreshInterval = undefined

    static async checkUserName(username) {
        // define endpoint and options
        const ep = `users/${username}`
        const method = "GET"

        const result = await this.#sendRequest(ep, method)

        // error
        if (!result.ok && result.status !== 404) {
            return result
        }

        const body = await result.json()
        const userExists = body.user_exists

        return userExists
    }
    
    static login() {}
    static logout() {}
    static createUser() {}
    refresh() {
        this.refreshInterval = setInterval(this.#refreshOperation)
    }
    #refreshOperation() {}
    stopRefresh = () => clearInterval(this.refreshInterval)

    static async #sendRequest(ep, method, headers = {}, body = {}) {
        // endpoint url
        const endpoint = `${this.#base_url}/${ep}`

        // fetch options
        const options = { method: method.trim().toUpperCase(), headers }

        // add contenttype header if there is body
        if (Object.keys(body).length) {
            options.body = body
            options.headers["Content-Type"] = "application/json"
        }

        try {
            // send request
            return await fetch(endpoint, options)

            // connection error
        } catch (error) {
            console.error(error)
            return { ok: false, message: ErrMsg.COMMON.CNN }
        }
    }
}

// const base_url = "http://todo.test/api/v1"

// export const checkUserName = async (username) => {
// 	try {
// 		const response = await fetch(`${base_url}/users/${username}`, {
// 			method: "GET",
// 		})
// 		const result = await response.json()
// 		return result
// 	} catch (error) {
// 		console.log("Error checking username:", error)
// 		throw error
// 	}
// }

// //image/png

// export const login = async (haveAccount, username, password) => {
// 	try {
// 		const endpoint =
// 			haveAccount ? `${base_url}/auth/login` : `${base_url}/user/`
// 		const response = await fetch(endpoint, {
// 			method: "POST",
// 			headers: { "Content-Type": "application/json" },
// 			body: JSON.stringify({
// 				username: username,
// 				password: password,
// 			}),
// 		})
// 		const result = await response.json()
// 		return result
// 	} catch (error) {
// 		console.log("Error login:", error)
// 		throw error
// 	}
// }

// let refreshInterval = null

// export const refreshToken = async () => {
// 	try {
// 		const refresh = localStorage.getItem("refresh")
// 		if (!refresh) return null

// 		const response = await fetch(`${base_url}/auth/refresh`, {
// 			method: "POST",
// 			headers: { "Content-Type": "application/json" },
// 			body: JSON.stringify({ refresh }),
// 		})
// 		// (200 <= respopnse status < 299) ===> response.ok=true
// 		if (!response.ok) {
// 			stopAutoRefresh()
// 			localStorage.removeItem("access")
// 			localStorage.removeItem("refresh")
// 			window.location.href = "/login"
// 			return null
// 		}

// 		const result = await response.json()

// 		if (result?.access) {
// 			localStorage.setItem("access", result.access)
// 		}

// 		return result
// 	} catch (error) {
// 		console.log("Refresh error:", error)
// 	}
// }

// export const startAutoRefresh = () => {
// 	stopAutoRefresh()

// 	refreshInterval = setInterval(
// 		() => {
// 			refreshToken()
// 		},
// 		13 * 60 * 1000,
// 	)
// }

// export const stopAutoRefresh = () => {
// 	if (refreshInterval) clearInterval(refreshInterval)
// 	refreshInterval = null
// }
