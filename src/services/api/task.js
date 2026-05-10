import { config } from './api.js';
import { isLogedIn, getAuthHeader } from './auth.js';
import sendRequest from './sendRequest.js';

export async function sendTaskRequest(ep, method, body = {}, headers = {}) {
	if (!isLogedIn()) return null;
	headers = { ...getAuthHeader() };
	const result = await sendRequest(ep, method, body, headers);
	if (!result.ok) return null; // error
	return result; // result
}

export async function getAll(page = 1, per_page = config.MAX_PER_PAGE) {
	const ep = `tasks?page=${page}&per_page=${per_page}`;
	const method = 'GET';
	const result = await sendTaskRequest(ep, method);
	if (result === null) return null;
	return {
		'x-current-page': Number(result.headers['x-current-page']) || 0,
		'x-total-items': Number(result.headers['x-total-items']),
		'x-total-pages': Number(result.headers['x-total-pages']),
		content: result.body,
	}; // tasks
}

export async function toggleDone(id) {
	const ep = `task/${id}`;
	const body = { toggle: true };
	const method = 'PUT';
	const result = await sendTaskRequest(ep, method, body);
	if (result === null) return null;
	return result.body.id;
}

export async function moveUp(id) {
	const ep = `task/${id}`;
	const body = { move: 'up' };
	const method = 'PUT';
	const result = await sendTaskRequest(ep, method, body);
	if (result === null) return null;
	return result.body.id;
}

export async function moveDown(id) {
	const ep = `task/${id}`;
	const body = { move: 'down' };
	const method = 'PUT';
	const result = await sendTaskRequest(ep, method, body);
	if (result === null) return null;
	return result.body.id;
}

export async function create(text) {
	const ep = `task`;
	const method = 'POST';
	const body = { description: text.trim() };
	const result = await sendTaskRequest(ep, method, body);
	if (result === null) return null;
	return result.body.task_id;
}

export async function remove(id) {
	const ep = `task/${id}`;
	const method = 'DELETE';
	const result = await sendTaskRequest(ep, method);
	if (result === null) return null;
	return result.body.id;
}
