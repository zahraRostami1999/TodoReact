<?php

namespace App\Router\Src;

trait RouterDataReceivers
{
	private function get_querystring($matches)
	{
		$this->custom_querystring = [];
		foreach ($_GET as $key => $value) {
			$this->custom_querystring[$key] = $value;
		}

		$this->querystring = [];
		foreach ($matches as $key => $match) {
			if (is_string($key)) {
				$this->querystring[$key] = $match;
			}
		}
	}

	private function get_headers()
	{
		$this->req_headers = apache_request_headers() ?? [];
	}

	private function get_body()
	{
		$body = file_get_contents("php://input");

		if (!isset($this->req_headers["Content-Type"])) $this->req_headers["Content-Type"] = "";
		$check = trim($this->req_headers["Content-Type"]);
		$check = explode(";", $check)[0];
		$this->req_body = match ($check) {
			"application/json" => json_decode($body, true),
			default => $body
		};
	}
}
