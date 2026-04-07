import Cnst from "../../config/constants.js";

// api config
export default class ApiConfig {
	// common settings
	_BASE_URL = Cnst.APP.API_BASE_URL
	_TRACE = (...args) => true && console.error(...args)

	// auth & user settings
	_TOKENS_KEY = Cnst.APP.TOKENS_KEY // the key in localStorage that holds token values
	_TIMEOUT_ID_KEY = Cnst.APP.TIMEOUT_ID_KEY // the key in localStorage that holds next refresh timeout id
	_REFRESH_TRESHOLD = Cnst.APP.REFRESH_TRESHOLD // refresh tokens before _ seconds before expiration

	// task settings
	_MAX_PER_PAGE = Cnst.TASK.MAX_PER_PAGE
}
