<?php

namespace App\Core\Utilities;

final class CommonUtilities
{
	public static function to_seconds($sec = 0, $min = 0, $hour = 0, $day = 0, $week = 0, $mounth = 0, $year = 0)
	{
		$time = 0;
		$time += $sec;
		$time += $min * 60;
		$time += $hour * 60 * 60;
		$time += $day * 60 * 60 * 60;
		$time += $week * 60 * 60 * 60 * 7;
		$time += $mounth * 60 * 60 * 60 * 30;
		$time += $year * 60 * 60 * 60 * 365;
		return $time;
	}

	public static function string_has($string, $chars)
	{
		foreach (str_split($chars) as $char) {
			if (str_contains($string, $char)) return true;
		}
		return false;
	}

	public static function mixed_len($value)
	{
		if (is_array($value)) return count($value);
		if (is_string($value)) return strlen($value);
		if (is_null($value)) return 0;
		return strlen("$value");
	}

	public static function in_array(array $array, ?string $key = null, ?string $pattern = null, bool $regex = true)
	{
		if (isset($key) && isset($pattern)) { // bot set
			if (isset($array[$key])) { // array value and given value are identical
				if ($regex) return static::check_regex($pattern, $array[$key]);
				if ($array[$key] === $pattern) return true;
			}
		}

		if (isset($key) && !isset($pattern)) { // only key set
			if (isset($array[$key])) { // given key has been set in array
				return true;
			}
		}

		if (!isset($key) && isset($pattern)) { // only value set
			foreach ($array as $v) { // given value exists in array
				if ($regex) return static::check_regex($pattern, $v);
				if ($v === $pattern) return true;
			}
		}

		if (!isset($key) && isset($pattern)) { // none set
			if (count($array) > 0) { // array has keys
				return true;
			}
		}

		return false;
	}

	public static function check_regex($patterns, $subject)
	{
		if (is_string($patterns)) $patterns = [$patterns];
		foreach ($patterns as $pattern) {
			preg_match($pattern, $subject, $matches);
			if (isset($matches[0])) return true;
		}
		return false;
	}

	public static function convert_to_numeric($data)
	{
		return static::is_numeric($data) ? floatval($data) : $data;
	}

	public static function is_numeric($data)
	{
		if (is_null($data)) return false;

		foreach (str_split($data) as $char) {
			if (!array_search($char, str_split("0123456789"))) return false;
		}
		return true;
	}

	public static function is_in($value, $set)
	{
		foreach ($set as $data) {
			if ($value === $data)
				return true;
		}
		return false;
	}

	public static function gen_unique_string($current_strings, $gen_callback, $callback_args = [])
	{
		while (true) {
			$new_string = $gen_callback(...$callback_args);

			if (array_search($new_string, $current_strings, true)) {
				continue;
			} else {
				return $new_string;
			}
		}
	}

	public static function random_string($length = 16)
	{
		$lower_letters = "abcdefghijklmnopqrstuvwxyz";
		$upper_letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		$digits = "0123456789";
		// $symbols = "!@#$%^&`~()-=+/{}[]\\';,";
		$chars = $lower_letters . $upper_letters . $digits;

		$result = "";
		for ($i = 0; $i < $length; $i++) {
			$index = rand(0, strlen($chars) - 1);
			$selected_char = substr($chars, $index, 1);
			$result .= $selected_char;
		}

		return $result;
	}
};
