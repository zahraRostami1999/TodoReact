import Const from "./constants.js"

export default class Msg {
	static PASS = {
		NO: "برای ورود رمزعبور خود را وارد کنید.",
		VERIFY: "تکرار رمز عبور با رمز عبور مطابقت ندارد. دوباره بررسی کنید.",
		SHORT: (crrLen) =>
			`رمز عبور باید حداقل ${Const.PASS.MIN} کاراکتر باشد. (${Const.PASS.MIN - crrLen} کاراکتر دیگر لازم است)`,
	}

	static USER = {
		NO: "لطفا یک نام کاربری وارد کنید",
		LONG: (crrLen) =>
			`نام کاربری بیش از حد طولانی است. حداکثر ${Const.USER.MAX} کاراکتر مجاز است. (${crrLen - Const.USER.MAX} کاراکتر اضافی دارید)`,
		SHORT: (crrLen) =>
			`نام کاربری باید حداقل ${Const.USER.MIN} کاراکتر داشته باشد. (${Const.USER.MIN - crrLen} کاراکتر دیگر لازم است)`,
	}

	static COMMON = {
		CNN: "اتصال به اینترنت برقرار نیست. لطفاً اتصال خود را بررسی کنید.",
		FORBID: (char) =>
			`امکان استفاده از کاراکتر ${char === " " ? "فاصله" : char} وجود ندارد.`,
		TOOMANYREQ: "درخواست‌ها زیاد بوده‌اند. لطفاً کمی بعد دوباره تلاش کنید.",
		UNAUTHORIZED: "اجازه دسترسی ندارید. لطفاً دوباره وارد شوید.",
	}

	static WELLCOME = {
		MSG: "خوش آمدید"
	}

	static TASKINPUT = {
		ERR: "مشکلی پیش آمده است. لطفاً بعداً دوباره تلاش کنید.",
		ADD: "تسک جدید با موفقیت اضافه شد."
	}

	static LOADING = {
		MSG: "در حال دریافت و آماده‌سازی لیست تسک‌ها..."
	}
}
