<?php

namespace App\Router\Src;

use App\Router\Src\UriTranslator;

trait RouterMappers
{
	use UriTranslator;

	private function method_matches($route_method)
	{
		$req_method = $_SERVER["REQUEST_METHOD"];
		return $route_method === $req_method;
	}

	private function uri_matches($route_uri)
	{
		// convert uri base to directory level
		$uri_base = trim(API_URI_BASE, "/ ");
		$dir_lvl = count(explode("/", $uri_base)) + 1;

		// extract request uri
		$req_uri = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
		$req_uri = implode("/", array_slice(explode("/", $req_uri), $dir_lvl)); // remove base part of uri (.../api/v1/)

		// what the func name
		return $this->compare_uri_and_extract_data($route_uri, $req_uri);
	}

	private function compare_uri_and_extract_data($route_uri, $req_uri)
	{
		if (preg_match("/$route_uri/", $req_uri, $matches)) {
			$this->get_querystring($matches);
			$this->get_headers();
			$this->get_body();
			return true;
		}
		return false;
	}
}
