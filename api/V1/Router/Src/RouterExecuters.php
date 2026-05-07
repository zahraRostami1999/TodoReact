<?php

namespace App\Router\Src;

trait RouterExecuters
{
	private function run_middlewares($middlewares)
	{
		if (!is_array($middlewares)) $middlewares = [$middlewares];

		foreach ($middlewares as $mw) {
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
