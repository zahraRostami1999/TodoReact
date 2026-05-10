import { config } from './api.js';
import sendRequest from './sendRequest.js';

function getTokens() {
	let tkns = localStorage.getItem(config.TOKENS_KEY);
	if (tkns) {
		tkns = JSON.parse(tkns);
		if (tkns.refresh && tkns.access) return tkns;
	}
	return false;
}

function canRefresh() {
	const tkns = getTokens();
	if (!tkns) return false;
	if (config.REFRESH_TRESHOLD + Date.now > tkns.refresh_exp) return false;
	return true;
}

export function isLogedIn() {
	if (!canRefresh()) return false;
	if (config.REFRESH_TRESHOLD + Date.now > getTokens().access_exp) return false;
	return true;
}

function saveTokens(tkns) {
	deleteTokens();
	tkns.message = undefined;
	tkns = JSON.stringify(tkns);
	localStorage.setItem(config.TOKENS_KEY, tkns);
}

function deleteTokens() {
	localStorage.removeItem(config.TOKENS_KEY);
}

function stopRefresh() {
	const timeoutId = localStorage.getItem(config.TIMEOUT_ID_KEY);
	clearTimeout(Number(timeoutId));
	localStorage.setItem(config.TIMEOUT_ID_KEY, false);
}

function autoRefresh() {
	const timeoutId = setTimeout(async () => await refresh(), calcRefreshAfter());
	localStorage.setItem(config.TIMEOUT_ID_KEY, timeoutId);
}

function calcRefreshAfter() {
	return Math.max(
		0,
		getTokens().access_exp - Date.now() - config.REFRESH_TRESHOLD,
	);
}

async function refresh() {
	// get tokens from localstorage
	let tkns = getTokens();

	const ep = 'auth/refresh';
	const method = 'POST';
	const body = { refresh: tkns.refresh };

	const result = await sendRequest(ep, method, body);

	if (!result.ok) {
		deleteTokens();
		stopRefresh();
		return null;
	} // error

	// save tokens to localStorage
	tkns = result.body;
	saveTokens(tkns);

	autoRefresh();
}

export async function init() {
	stopRefresh();
	if (canRefresh()) {
		if (!isLogedIn()) await refresh();
		autoRefresh();
	} else {
		deleteTokens();
	}
}

export async function usernameExist(username) {
	if (isLogedIn()) return null;

	// define endpoint and options
	const ep = `users/${username}`;
	const method = 'GET';
	const result = await sendRequest(ep, method);

	if (result === null) return null; // error
	if (!result.ok) return result; // error

	return result; // user state
}

export async function login(username, password, ep = false) {
	if (isLogedIn()) return null;

	ep = ep || 'auth/login';
	const method = 'POST';
	const body = { username, password };
	const result = await sendRequest(ep, method, body);

	if (result === null) return null; // error
	if (!result.ok) return result; // error

	saveTokens(result.body); // save received tokens
	autoRefresh(); // start autorefresh

	return result; // tokens
}

export async function register(username, password) {
	const ep = 'user';
	return login(username, password, ep);
}

export async function logout() {
	if (!isLogedIn() || !canRefresh()) return;

	const ep = 'auth/logout';
	const method = 'POST';
	const headers = { ...getAuthHeader() };
	const body = { refresh: getTokens().refresh };
	const result = await sendRequest(ep, method, body, headers);

	if (result === null) return null; // error
	if (!result.ok) return result; // error

	stopRefresh();
	deleteTokens();

	return result; // tokens
}

export function getAuthHeader() {
	if (!isLogedIn()) return false;
	const accessToken = getTokens().access;
	return { Authorization: `Bearer ${accessToken}` };
}
