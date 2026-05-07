<?php

namespace App\Views;

use App\Core\Config\ResponseMessage;

class Response
{
	public function __construct(int $status_code, ?array $body = null, bool $default_message = false)
	{
		// set content type
		header('Content-Type: application/json');

		// set response code
		http_response_code($status_code);

		$response_body = [];

		// set response body
		if ($default_message) {
			$response_body = ["message" => ResponseMessage::$messages[$status_code]];
		}
		if ($body) {
			$response_body = array_merge($response_body, $body);
		}

		// send response
		echo json_encode($response_body);

		// stop script
		exit;
	}
}
