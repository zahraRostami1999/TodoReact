<?php

namespace App\Controllers;

use App\Core\Config\CommonConstants as CommonConstants;
use App\Core\Config\Keys;

trait AuthTokenGeneration
{

	private function createAccessToken($user_id)
	{
		$payload = [
			"sub" => $user_id,
			"type" => "access",
			"iat" => time(),
			"exp" => time() + CommonConstants::get_access_exp()
		];

		return $this->createToken($payload);
	}

	private function createRefreshToken($user_id)
	{

		$payload = [
			"sub" => $user_id,
			"type" => "refresh",
			"iat" => time(),
			"exp" => time() + CommonConstants::get_refresh_exp()
		];

		return $this->createToken($payload);
	}

	private function createToken($payload)
	{
		$header = [
			"alg" => "HS256",
			"typ" => "JWT"
		];

		$header_encoded = $this->base64UrlEncode(json_encode($header));
		$payload_encoded = $this->base64UrlEncode(json_encode($payload));
		$signature = $this->sign($header_encoded . "." . $payload_encoded);

		return $header_encoded . "." . $payload_encoded . "." . $signature;
	}

	private function base64UrlEncode($data)
	{
		$b64 = base64_encode($data);
		$b64 = strtr($b64, '+/', '-_');
		$b64 = rtrim($b64, '=');
		return $b64;
	}

	private function sign($data)
	{
		$data = hash_hmac(CommonConstants::JWT_ALGO, $data, Keys::JWT, true);
		$data = $this->base64UrlEncode($data);
		return $data;
	}
}
