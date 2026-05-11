import { config } from './api.js';

export default async function sendRequest(ep, method, body = {}, headers = {}) {
	// endpoint url
	const endpoint = `${config.BASE_URL}/${ep}`;

	// fetch options
	const options = { method: method.trim().toUpperCase(), headers };

	// add contenttype header if there is body
	if (Object.keys(body).length) {
		options.body = JSON.stringify(body);
		options.headers['Content-Type'] = 'application/json';
	}

	const controller = new AbortController();
	const { signal } = controller;

	// Set up the timeout
	const timeoutId = setTimeout(() => {
		controller.abort();
	}, config.TIMEOUT);

	let response;
	try {
		// send request
		response = await fetch(endpoint, { ...options, signal });
		clearTimeout(timeoutId);
	} catch (error) {
		clearTimeout(timeoutId);
		if (error.name === 'AbortError') return null; // Timeout error
		return null; // Network error or other fetch errors
	}

	const result = { status: response.status, body: {} };

	// set ok
	result.ok = typeof response.ok === 'boolean' ? response.ok : result.body.ok;

	// decode body
	let temp_body;
	try {
		temp_body = await response.json();
	} catch (error) {
		// Handle cases where response is not JSON or is empty
		console.error("Failed to parse JSON response:", error);
		// Decide how to handle this - perhaps return an error object or null
		// For now, let's assume an empty body if parsing fails
		temp_body = {};
	}

	if (Array.isArray(temp_body)) {
		result.body = temp_body;
	} else {
		for (const key in temp_body) {
			if (key === 'ok') result.ok = temp_body.ok; // replace body ok with statuc code based ok
			result.body[key] = temp_body[key];
		}
	}

	// decode headers
	const tempHeaders = {};
	for (const header of response.headers.entries()) {
		tempHeaders[header[0]] = header[1];
	}
	result.headers = tempHeaders;

	// return result
	return result.ok ? result : null;
}
