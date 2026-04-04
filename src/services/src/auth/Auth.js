import Api from "../Inheritator.js"
import RefreshMethods from "./RefreshMethods.js"

/**
 * --------------------------------------------------------------
 * 	frontend accessible interface
 * --------------------------------------------------------------
 *
 */

export default class Auth extends RefreshMethods {
	init = () => {
		this._stopRefresh()
		if (this._canRefresh()) {
			this._autoRefresh()
		} else {
			this._deleteTokens()
		}
	}

	usernameExist = async (username) => {
		if (this.isLogedIn()) return

		// define endpoint and options
		const ep = `users/${username}`
		const method = "GET"

		const result = await Api._sendRequest(ep, method)

		if (!result.ok) return null // error
		return result.body.user_exists // user state
	}

	login = async (username, password, ep = false) => {
		if (this.isLogedIn()) return

		ep = ep || "auth/login"
		const method = "POST"
		const body = { username, password }

		const result = await Api._sendRequest(ep, method, body)

		if (!result.ok) return null // error

		// save received tokens
		this._saveTokens(result.body)

		// start autorefresh
		this._autoRefresh()
		return result.body // tokens
	}

	register = async (username, password) => {
		if (this.isLogedIn()) return

		const ep = "user"
		return this.login(username, password, ep)
	}

	logout = async () => {
		if (!this.isLogedIn() || !this._canRefresh()) return

		const ep = "auth/logout"
		const method = "POST"
		const headers = { ...this.getAuthHeader() }
		const body = { refresh: this._getTokens().refresh }

		const result = await Api._sendRequest(ep, method, body, headers)

		if (!result.ok) return null // error

		this._stopRefresh()
		this._deleteTokens()

		return result.body // tokens
	}

	getAuthHeader = () => {
		if (!this.isLogedIn()) return false
		const accessToken = this._getTokens().access
		return { Authorization: `Bearer ${accessToken}` }
	}
}
