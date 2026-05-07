<?php

namespace App\Controllers\Src;

use App\Views\Response;
use App\Core\Utilities\CommonUtilities as Util;

trait ControllerInputConstraints
{
	// defy all of these (black list)
	protected function defy_querystring(?string $key = null, ?string $value = null, bool $regex = true)
	{
		if (Util::in_array($this->querystring, $key, $value, $regex))
			new Response(400, default_message: true);
	}
	protected function defy_custom_querystring(?string $key = null, ?string $value = null, bool $regex = true)
	{
		if (Util::in_array($this->custom_querystring, $key, $value, $regex))
			new Response(400, default_message: true);
	}
	protected function defy_body(?string $accept_type = null, ?string $pattern = null)
	{
		if (isset($accept_type) && gettype($this->req_body) === $accept_type) {
			new Response(400, default_message: true);
		}

		if (isset($pattern)) {
			if (!is_array($pattern)) $pattern = [$pattern];
			if (Util::check_regex($pattern, $this->req_body)) new Response(400, default_message: true);
		}

		if (Util::mixed_len($this->req_body) > 0) {
			new Response(400, default_message: true);
		}
	}
	protected function defy_header(?string $header_name = null, ?string $header_value = null, bool $regex = true)
	{
		if (Util::in_array($this->req_headers, $header_name, $header_value, $regex))
			new Response(400, default_message: true);
	}


	// accept only these (white list)
	protected function accept_querystring(?string $key = null, ?string $value = null, bool $regex = true)
	{
		if (!Util::in_array($this->querystring, $key, $value, $regex))
			new Response(400, default_message: true);
	}
	protected function accept_custom_querystring(?string $key = null, ?string $value = null, bool $regex = true)
	{
		if (!Util::in_array($this->custom_querystring, $key, $value, $regex))
			new Response(400, default_message: true);
	}
	protected function accept_body(?string $accept_type = null, ?string $patterns = null)
	{
		if (isset($accept_type) && gettype($this->req_body) !== $accept_type) {
			new Response(400, default_message: true);
		}

		if (isset($patterns)) {
			if (!is_array($patterns)) $patterns = [$patterns];
			if (!Util::check_regex($patterns, $this->req_body)) new Response(400, default_message: true);
		}

		if (Util::mixed_len($this->req_body) === 0) {
			new Response(400, default_message: true);
		}
	}
	protected function accept_header(?string $header_name = null, ?string $header_value = null, bool $regex = true)
	{
		if (!Util::in_array($this->req_headers, $header_name, $header_value, $regex))
			new Response(400, default_message: true);
	}
}
