<?php
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: *");
// header("Access-Control-Allow-Headers: *");

// if (strtolower($_SERVER['REQUEST_METHOD']) === 'options') {
// 	http_response_code(204);
// 	exit;
// }

define("API_URI_BASE", "/todo/Backend/Api/v1/");
define("DEPLOYED", false);

require_once("V1/Core/Autoloader.php");
require("VersionForwarder.php");
require extract_version();
