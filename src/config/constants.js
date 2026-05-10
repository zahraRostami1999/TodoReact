export default class Const {
	static APP = {
		API_BASE_URL: "http://todo.souperlopers.ir/api/v1",
		TOKENS_KEY: "myAuthTokens",
		TIMEOUT_ID_KEY: "myAuthRefreshInterval",
		REFRESH_TRESHOLD: 1000 * 30, // 30 seconds before it get expired
		API_TIMEOUT: 1000 * 8,
	}

	static UI = {
		LOAD: "یه لحظه صبر کن",
		HAVE: "تو قبلا ثبت نام کردی، رمزعبورت رو وارد کن تا وارد سایت بشی",
		DHAVE: "تو قبلا ثبت نام نکردی، اول یه پسورد وارد کن",
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
