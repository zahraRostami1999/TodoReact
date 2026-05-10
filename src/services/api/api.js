import Cnst from '../../config/constants.js';
import {
	init,
	usernameExist,
	login,
	register,
	logout,
	isLogedIn,
} from './auth.js';
import {
	create,
	getAll,
	toggleDone,
	moveUp,
	moveDown,
	remove,
} from './task.js';

// api config
const config = {
	// common settings
	BASE_URL: Cnst.APP.API_BASE_URL,
	TRACE: (...args) => true && console.error(...args),
	TIMEOUT: Cnst.APP.API_TIMEOUT,

	// auth & user settings
	TOKENS_KEY: Cnst.APP.TOKENS_KEY, // the key in localStorage that holds token values
	TIMEOUT_ID_KEY: Cnst.APP.TIMEOUT_ID_KEY, // the key in localStorage that holds next refresh timeout id
	REFRESH_TRESHOLD: Cnst.APP.REFRESH_TRESHOLD, // refresh tokens before _ seconds before expiration

	// task settings
	MAX_PER_PAGE: Cnst.TASK.MAX_PER_PAGE,
};

const Api = {
	Auth: { init, usernameExist, login, register, logout, isLogedIn },
	Task: { create, getAll, toggleDone, moveUp, moveDown, delete: remove },
};

export { config };
export default Api;
//  ----------------------------------------	test

// console.log("started")
// let res

// // init
// res = Api.Auth.init()

// // // check user name
// // res = await Api.Auth.usernameExist("sadra")

// // // register
// // res = await Api.Auth.register("sadra", "12345678")

// // // login
// // res = await Api.Auth.login("sadra", "12345678")

// // // logout
// // res = await Api.Auth.logout()

// // // create task
// // for (let i = 0; i < 3; i++) {
// // 	setTimeout(async () => await Api.Task.create(`task ${i}`), (i + 1) * 1000)
// // }

// // res = await Api.Task.toggleDone("01KN9T8WHQTGBYYNZV6H44EHM6")
// // res = await Api.Task.moveUp("01KN9T8WHQTGBYYNZV6H44EHM6")
// // res = await Api.Task.moveDown("01KN9T8WHQTGBYYNZV6H44EHM6")

// // // delete tasks
// // await Api.Task.delete("01KN9T8WHQTGBYYNZV6H44EHM6")

// // // get tasks
// // res = await Api.Task.getAll(1, 8)

// console.log(res)
// console.log("finished")
