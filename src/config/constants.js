export default class Const {
	static APP = {
		API_BASE_URL: "http://todo.souperlopers.ir/api/v1",
		TOKENS_KEY: "myAuthTokens",
		TIMEOUT_ID_KEY: "myAuthRefreshInterval",
		REFRESH_TRESHOLD: 1000 * 30, // 30 seconds before it get expired
	}

	static USER = {
		FORBID_CHARS: " ,/\\=+'\"[]{}*%@",
		MIN: 4,
		MAX: 25,
	}

	static PASS = {
		FORBID_CHARS: " ",
		MIN: 8,
	}

	static TASK = {
		MAX_PER_PAGE: 10,
	}
}
