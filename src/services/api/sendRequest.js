import { config } from './api.js'

function prepareInput(ep, method, body, headers) {
	// endpoint url
	const endpoint = `${config.BASE_URL}/${ep}`

	// fetch options
	const options = { method: method.trim().toUpperCase(), headers }

	// add contenttype header if there is body
	if (Object.keys(body).length) {
		options.body = JSON.stringify(body)
		options.headers['Content-Type'] = 'application/json'
	}

	return { endpoint, options }
}

function initiateTimeout() {
	const controller = new AbortController()
	const { signal } = controller

	// Set up the timeout
	const timeoutId = setTimeout(() => {
		controller.abort()
	}, config.TIMEOUT)

	return { timeoutId, signal }
}

async function prepareOutput(response) {
	const result = { status: response.status, ok: response.ok, body: {} }

	// decode body
	let tempBody = {}
	try {
		tempBody = await response.json()
	} catch (error) {
		console.error(error)
	}

	if (Array.isArray(tempBody)) {
		result.body = tempBody
	} else {
		for (const key in tempBody) {
			if (key === 'ok') result.ok = tempBody.ok // replace body ok with statuc code based ok
			result.body[key] = tempBody[key]
		}
	}

	// decode headers
	const tempHeaders = {}
	for (const header of response.headers.entries()) {
		tempHeaders[header[0]] = header[1]
	}
	result.headers = tempHeaders

	return result
}

const timeout = new CustomEvent('timeout', {})
const tooManyRequests = new CustomEvent('tooManyRequests', {})
const unauthorized = new CustomEvent('unauthorized', {})

export default async function sendRequest(ep, method, body = {}, headers = {}) {
	const { endpoint, options } = prepareInput(ep, method, body, headers)
	const { timeoutId, signal } = initiateTimeout()

	let response
	try {
		// send request
		response = await fetch(endpoint, { ...options, signal })
		clearTimeout(timeoutId)
	} catch (error) {
		clearTimeout(timeoutId)
		if (error.name === 'AbortError') {
			// Timeout error
			document.body.dispatchEvent(timeout)
			return { ok: null }
		}
	}

	const result = await prepareOutput(response)

	if (result.status === 401) {
		document.body.dispatchEvent(unauthorized)
	} else if (result.status === 429) {
		document.body.dispatchEvent(tooManyRequests)
	}

	return result
}
