<?php

namespace App\Core\Config;

use App\Core\Utilities\CommonUtilities;

class CommonConstants
{
	// website related constants
	public const TIMEZONE = "Asia/Tehran";
	public const PER_PAGE = 10;

	// network related constants
	public const MAX_REQUEST_WINDOWS = 60;
	public const MAX_REQUEST_RATE = 60;

	// user related constants
	public const FORBID_USER_CHARS = " ,/\\=+'\"[]{}*%@";
	public const USER_MIN_LENGTH = 4;
	public const USER_MAX_LENGTH = 25;
	public const FORBID_PASS_CHARS = " ";
	public const PASS_MIN_LENGTH = 8;

	// authentication related constants
	public const JWT_ALGO = "sha256";
	public static function get_access_exp()
	{
		return DEBUG
			? CommonUtilities::to_seconds(day: 1)
			: CommonUtilities::to_seconds(min: 10);
	}
	public static function get_refresh_exp()
	{
		return CommonUtilities::to_seconds(day: 7);
	}
}
