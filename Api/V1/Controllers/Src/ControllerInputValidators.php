<?php

namespace App\Controllers\Src;

use App\Core\Config\CommonConstants;
use App\Views\Response;
use App\Core\Config\ResponseMessage;
use App\Core\Utilities\CommonUtilities;
use App\Core\Utilities\DatabaseUtilities;

trait ControllerInputValidators
{
	protected function validate_user($username)
	{
		$username = trim($username);

		$below_min = mb_strlen($username) < CommonConstants::USER_MIN_LENGTH;
		if ($below_min) {
			new Response(400, ["message" => ResponseMessage::$user["user_min_length"]]);
		}

		$above_max = mb_strlen($username) > CommonConstants::USER_MAX_LENGTH;
		if ($above_max) {
			new Response(400, ["message" => ResponseMessage::$user["user_max_length"]]);
		}

		$has_forbid = CommonUtilities::string_has($username, CommonConstants::FORBID_USER_CHARS);
		if ($has_forbid) {
			new Response(400, [
				"message" => ResponseMessage::$user["user_forbid_chars"],
				"forbidden_characters" => str_split(CommonConstants::FORBID_USER_CHARS),
			]);
		}

		return $username;
	}

	protected function validate_pass($password)
	{
		$password = trim($password);

		$below_min = mb_strlen($password) < CommonConstants::PASS_MIN_LENGTH;
		if ($below_min) {
			new Response(400, ["message" => ResponseMessage::$user["pass_min_length"]]);
		}

		$has_forbid = CommonUtilities::string_has($password, CommonConstants::FORBID_PASS_CHARS);
		if ($has_forbid) {
			new Response(400, [
				"message" => ResponseMessage::$user["pass_forbid_chars"],
				"forbidden_characters" => str_split(CommonConstants::FORBID_PASS_CHARS),
			]);
		}

		$password = DatabaseUtilities::hash($password);

		return $password;
	}
}
