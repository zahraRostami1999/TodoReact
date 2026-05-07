<?php

namespace App\Router\Src;

trait UriTranslator
{
	private $uri_special_chars = ["/", "-"];
	private $querystring_translator = [
		"int" => "\d+",
		"double" => "\d+(?:\.\d+)?",
		"string" => "[\D\S]+",
		"bool" => "(?:true)|(?:false)"
	];

	private function translate_uri_to_regex($route_uri)
	{
		// remove last /
		if (substr($route_uri, -1, 1) === "/")
			$route_uri = substr($route_uri, 0, strlen($route_uri) - 1);

		// escape /s with \
		foreach ($this->uri_special_chars as $char)
			$route_uri = str_replace($char, "\\" . $char, $route_uri);

		// replace {} with its regex counterpart
		$route_uri = preg_replace_callback("/{(?<var>[\w:]+)}/", function ($matchs) {
			$match = explode(":", $matchs["var"]);
			$replace = "(?<{$match[0]}>" . $this->querystring_translator[$match[1]] . ")";
			return $replace;
		}, $route_uri);

		// define uri start/end position and consider final /
		$route_uri = "^" . $route_uri . "\/?" . "$";

		return $route_uri;
	}
}
