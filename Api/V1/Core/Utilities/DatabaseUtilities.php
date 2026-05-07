<?php

namespace App\Core\Utilities;

use App\Core\Config\Keys;

final class DatabaseUtilities
{
	public static function ulid()
	{
		$encoding = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';

		$time = (int) round(microtime(true) *  1000);

		$timeChars = '';
		for ($i = 0; $i < 10; $i++) {
			$mod = $time % 32;
			$timeChars = $encoding[$mod] . $timeChars;
			$time = ($time - $mod) / 32;
		}

		$random = random_bytes(10);

		$randomChars = '';
		foreach (str_split($random) as $char) {
			$byte = ord($char);
			$randomChars .= $encoding[$byte >> 3];
			$randomChars .= $encoding[$byte & 31];
		}

		return substr($timeChars . $randomChars, 0, 26);
	}

	public static function formated_time(int $time = 0)
	{
		return date("Y-m-d H:i:s", time() + $time);
	}

	public static function hash($value)
	{
		for ($i = 0; $i < 100; $i++) {
			$value = Keys::SALT . $value . Keys::SALT; // add salt
			$value = sha1($value);
			$value = md5($value);
		}
		return $value;
	}
};
