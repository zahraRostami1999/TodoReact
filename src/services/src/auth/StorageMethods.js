import Api from "../Inheritator.js"

/**
 * --------------------------------------------------------------
 * 	token helper methods
 * --------------------------------------------------------------
 *
 */

export default class StorageMethods {
	_canRefresh = () => {
		const tkns = this._getTokens()
		if (!tkns) return false
		if (Api._REFRESH_TRESHOLD + Date.now > tkns.refresh_exp) return false
		return true
	}

	isLogedIn = () => {
		if (!this._canRefresh()) return false
		if (Api._REFRESH_TRESHOLD + Date.now > this._getTokens().access_exp)
			return false
		return true
	}

	_getTokens = () => {
		let tkns = localStorage.getItem(Api._TOKENS_KEY)
		if (tkns) {
			tkns = JSON.parse(tkns)
			if (tkns.refresh && tkns.access) return tkns
		}
		return false
	}

	_saveTokens = (tkns) => {
		this._deleteTokens()
		tkns.message = undefined
		tkns = JSON.stringify(tkns)
		localStorage.setItem(Api._TOKENS_KEY, tkns)
	}

	_deleteTokens = () => {
		localStorage.removeItem(Api._TOKENS_KEY)
	}
}
