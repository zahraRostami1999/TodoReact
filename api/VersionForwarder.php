<?php

use App\Views\Response;

function extract_version()
{
	// extracting version from uri
	$uri = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
	$pattern = ".*\/api\/(?<version>v\d+)(?<rest_of_uri>(?=(\/)|($)).*)";
	preg_match("/$pattern/i", $uri, $matches);

	$version_valid = isset($matches["version"]);
	$version_exist = $version_valid && file_exists(strtoupper($matches["version"]) . "/index.php");

	// die if version is not set correctly
	if ($version_valid && $version_exist) {
		unset($uri, $pattern, $version_valid, $version_exist);
		return strtoupper($matches["version"]) . "/index.php";
	} else {
		define("ABSPATH", __DIR__ . DIRECTORY_SEPARATOR . "V1" . DIRECTORY_SEPARATOR);
		new Response(404, default_message: true);
	}
}
