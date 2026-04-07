import Api from "../Inheritator.js"

/**
 * --------------------------------------------------------------
 * 	network methods
 * --------------------------------------------------------------
 *
 */

export default class HandleRequest {
	_sendRequest = async (ep, method, body = {}, headers = {}) => {
		// endpoint url
		const endpoint = `${Api._BASE_URL}/${ep}`

		// fetch options
		const options = { method: method.trim().toUpperCase(), headers }

		// add contenttype header if there is body
		if (Object.keys(body).length) {
			options.body = JSON.stringify(body)
			options.headers["Content-Type"] = "application/json"
		}

		try {
			// send request
			let response = await fetch(endpoint, options)
			const result = { status: response.status, body: {} }

			// decode body
			const temp_body = await response.json()
			if (Array.isArray(temp_body)) {
				result.body = temp_body
			} else {
				for (const key in temp_body) {
					if (key === "ok") result.ok = temp_body.ok // replace body ok with statuc code based ok
					result.body[key] = temp_body[key]
				}
			}

			// set ok
			result.ok =
				typeof response.ok === "boolean" ? response.ok : result.body.ok

			// decode headers
			const headers = {}
			for (const header of response.headers.entries())
				headers[header[0]] = header[1]
			result.headers = headers

			// return result
			return result

			// connection error
		} catch (error) {
			console.error(error)
			// I don't know what to do with this error
			return null
		}
	}
}
