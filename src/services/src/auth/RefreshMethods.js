import Api from "../Inheritator.js"
import StorageMethods from "./StorageMethods.js"
/**
 * --------------------------------------------------------------
 * 	refresh helper methods
 * --------------------------------------------------------------
 *
 */
export default class RefreshMethods extends StorageMethods {
	_autoRefresh = () => {
		const after = this.#calcRefreshAfter()
		// const after = 1000 * 4
		const timeoutId = setTimeout(async () => await this.#refresh(), after)
		localStorage.setItem(Api._TIMEOUT_ID_KEY, timeoutId)
	}

	#calcRefreshAfter = () => {
		return this._getTokens().access_exp - Date.now() - Api._REFRESH_TRESHOLD
	}

	#refresh = async () => {
		// get tokens from localstorage
		let tkns = this._getTokens()

		const ep = "auth/refresh"
		const method = "POST"
		const body = { refresh: tkns.refresh }

		const result = await Api._sendRequest(ep, method, body)

		if (!result.ok) {
			this._deleteTokens()
			this._stopRefresh()
			return null
		} // error

		// save tokens to localStorage
		tkns = result.body
		this._saveTokens(tkns)

		this._autoRefresh()
	}

	_stopRefresh = () => {
		const timeoutId = localStorage.getItem(Api._TIMEOUT_ID_KEY)
		clearTimeout(Number(timeoutId))
		localStorage.setItem(Api._TIMEOUT_ID_KEY, false)
	}
}
