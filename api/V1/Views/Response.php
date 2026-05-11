<?php

namespace App\Views;

use App\Core\Config\ResponseMessage;

function scapeHtml(array $input)
{
	foreach ($input as $k => $v) {
		$input[$k] = match (gettype($v)) {
			'array' => scapeHtml($v),
			'integer' => (int)htmlentities($v),
			default => htmlentities($v)
		};
	}

	return $input;
}

class Response
{
	public function __construct(int $status_code, ?array $body = null, bool $default_message = false)
	{
		// set content type
		header('Content-Type: application/json');

		// set response code
		http_response_code($status_code);

		$response_body = [];
		DEBUG && $response_body['debug_data'] = $GLOBALS['debug_data'];

		// set response body
		if ($default_message) {
			$response_body['message'] = ResponseMessage::$messages[$status_code];
		}
		if ($body) {
			$response_body = array_merge($response_body, $body);
		}

		// send response
		echo json_encode(scapeHtml($response_body));

		// stop script
		exit;
	}
}
