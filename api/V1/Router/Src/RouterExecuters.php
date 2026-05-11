<?php

namespace App\Router\Src;

trait RouterExecuters
{
	private function run_middlewares($mws)
	{
		$singleMw = !is_array($mws[array_key_first($mws)]);
		if ($singleMw) $mws = [$mws];

		foreach ($mws as $mw) {
			$params = [$this->custom_querystring, $this->querystring, $this->req_headers, $this->req_body];
			$mw[0] = new $mw[0](...$params);
			call_user_func($mw);
		}
	}

	private function run_controller($controller)
	{
		$params = [$this->custom_querystring, $this->querystring, $this->req_headers, $this->req_body];
		$controller[0] = new $controller[0](...$params);
		call_user_func($controller);
	}
}
