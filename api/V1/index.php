<?php

define("ABSPATH", __DIR__ . DIRECTORY_SEPARATOR);
require_once(ABSPATH . "Core/Autoloader.php");

use App\Core\Config\CommonConstants;

date_default_timezone_set(CommonConstants::TIMEZONE);
require_once(ABSPATH . "Router/Route.php");
