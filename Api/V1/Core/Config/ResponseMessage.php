<?php

namespace App\Core\Config;

class ResponseMessage
{
	public static array $messages = [
		"200" => "با موفقیت دریافت شد",
		"201" => "ثبت داده با موفقیت انجام شد.",
		"400" => "درخواست نامعتبر است.",
		"401" => "ابتدا احراز هویت انجام دهید.",
		"404" => "صفحه مورد نظر پیدا نشد.",
		"429" => "تعداد درخواست بیش از حد مجاز!",
		"500" => "مشکلی در سمت سرور پیش آمده است.",
	];

	public static array $user = [
		"deleted" => "کاربر با موفقیت حذف شد",
		"updated" => "رمز عبور با موفقیت تغییر یافت.",
		"created" => "رمز عبور با موفقیت تغییر یافت.",

		"user_forbid_chars" => "نام کاربری مجاز به استفاده از کاراکترهای زیر نمی باشد.",
		"user_max_length" => "طول نام کاربری باید حداکثر " . CommonConstants::USER_MAX_LENGTH . " کاراکتر باشد.",
		"user_min_length" => "طول نام کاربری باید حداقل " . CommonConstants::USER_MIN_LENGTH . " کاراکتر باشد.",

		"pass_forbid_chars" => "رمز عبور مجاز به استفاده از کاراکترهای زیر نمی باشد.",
		"pass_min_length" => "طول رمز عبور باید حداقل " . CommonConstants::PASS_MIN_LENGTH . " کاراکتر باشد.",

		"doesnt_exist" => "این کاربر قبلا ثبت نشده است.",
		"exist" => "این نام کاربری قبلا انتخاب شده است.",
	];

	public static array $auth = [
		"successful_login" => "فرآیند ورود با موفقیت انجام شد.",
		"successful_logout" => "خروج با موفقیت انجام شد.",
		"invalid_token" => "توکن نامعتبر است.",
		"expired_token" => "توکن منقضی شده است",
		"failed_login" => "نام کاربری یا رمز عبور اشتباه است.",
	];

	public static array $task = [
		"doesnt_exist" => "وظیفه ای با این شناسه وجود ندارد.",
		"delete_success" => "عملیات حذف موفقیت آمیز بود.",
		"success_move" => "وظیفه با موفقیت منتقل شد.",
	];
}
