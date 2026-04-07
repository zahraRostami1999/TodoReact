import Api from "../Inheritator.js"
import RefreshMethods from "./RefreshMethods.js"

/**
 * --------------------------------------------------------------
 * 	frontend accessible interface
 * --------------------------------------------------------------
 *
 */

export default class Auth extends RefreshMethods {
	init = async () => {
		this._stopRefresh()
		if (this._canRefresh()) {
			if (!this.isLogedIn()) await this._refresh()
			this._autoRefresh()
		} else {
			this._deleteTokens()
		}
	}

	usernameExist = async (username) => {
		if (this.isLogedIn()) return null

		// define endpoint and options
		const ep = `users/${username}`
		const method = "GET"
		const result = await Api._sendRequest(ep, method)

		if (result === null) return null // error
		if (!result.ok) return result // error

		return result // user state
	}

	login = async (username, password, ep = false) => {
		if (this.isLogedIn()) return null

		ep = ep || "auth/login"
		const method = "POST"
		const body = { username, password }
		const result = await Api._sendRequest(ep, method, body)

		if (result === null) return null // error
		if (!result.ok) return result // error

		this._saveTokens(result.body) // save received tokens
		this._autoRefresh() // start autorefresh

		return result // tokens
	}

	register = async (username, password) => {
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

		if (result === null) return null // error
		if (!result.ok) return result // error

		this._stopRefresh()
		this._deleteTokens()

		return result // tokens
	}

	getAuthHeader = () => {
		if (!this.isLogedIn()) return false
		const accessToken = this._getTokens().access
		return { Authorization: `Bearer ${accessToken}` }
	}
}
