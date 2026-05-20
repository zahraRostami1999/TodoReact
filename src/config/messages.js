import Const from "./constants.js"

export default class Msg {
	static PASS = {
		NO: "رمز عبورت کو پس؟ بدون اون که نمی‌شه وارد شد",
		VERIFY: "تکرار پسورد و پسوردت با هم فرق داره. دقت کن",
		SHORT: (crrLen) =>
			`خیلی کوتاهه! باید  حداقل ${Const.PASS.MIN} حرف باشه. (${Const.PASS.MIN - crrLen} تا دیگه لازمه)`,
	}

	static USER = {
		NO: "هی! اول یه نام کاربری خوشگل برامون بنویس",
		LONG: (crrLen) =>
			`وای! نام کاربری طولانی شد! باید حداکثر ${Const.USER.MAX} حرف باشه. (${crrLen - Const.USER.MAX} تا از کاراکتراش رو حذف کن)`,
		SHORT: (crrLen) =>
			`خیلی کوتاهه! باید  حداقل ${Const.USER.MIN} حرف باشه. (${Const.USER.MIN - crrLen} تا دیگه لازمه)`,
	}

	static COMMON = {
		CNN: "هی! برو اتصال خودتو چک کن جوجوووو",
		FORBID: (char) =>
			`وای! نمیتونی از کاراکتر ${char === " " ? "فاصله" : char} استفاده کنی`,
		TOOMANYREQ: "چخبره!! یکم آروم تر",
		UNAUTHORIZED: "مثل اینکه هویتت واسه من ناشناسه! می‌شه یه بار دیگه معرفی کنی خودتو؟"
	}

	static WELLCOME = {
		MSG: "خوش اومدی 🙂"
	}

	static TASKINPUT = {
		ERR: "مشکلی پیش اومده. بعدا دوباره امتحان کن",
		ADD: "تسک جدید داری"
	}

	static LOADING = {
		MSG: "دارم لیست کارات رو مرتب می‌کنم..."
	}
}
