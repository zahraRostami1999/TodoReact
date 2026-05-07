<?php

namespace App\Controllers;

use App\Core\Config\ResponseMessage;
use App\Core\Utilities\DatabaseUtilities as DbUtils;
use App\Views\Response;

trait AuthTokenVerification
{
	public function authenticate()
	{
		$this->accept_header("Authorization", "/Bearer\s(\S+)/");

		preg_match("/Bearer\s(?<token>\S+)/", $this->req_headers["Authorization"], $matches);
		if (!isset($matches["token"])) {
			new Response(401, default_message: true);
		}
		$payload = $this->verifyToken($matches["token"]);

		if (!$payload || $payload["type"] !== "access") {
			new Response(401, default_message: true);
		}

		if ($this->token_expired($payload["exp"])) {
			new Response(401, ["message" => ResponseMessage::$auth["expired_token"]]);
		}

		$GLOBALS["authenticated_user_id"] = $payload["sub"];
	}

	public function verifyToken($token)
	{
		// extract token parts
		$parts = explode('.', $token);
		if (count($parts) != 3) return false;
		list($header, $payload, $signature_sent) = $parts;

		// check signature validation
		$calculated_signature = $this->sign($header . "." . $payload);
		if (!hash_equals($calculated_signature, $signature_sent)) return false;

		// check expiration date
		$payload_data = json_decode($this->base64UrlDecode($payload), true);
		if (isset($payload_data["exp"]) && (((int) $payload_data["exp"]) < time())) return false;

		return $payload_data;
	}

	private function base64UrlDecode($b64)
	{
		$data = strtr($b64, '-_', '+/');
		$data = base64_decode($data);
		return $data;
	}

	private function token_expired($token_expiration)
	{
		$now = time();
		return $token_expiration < $now;
	}
}
