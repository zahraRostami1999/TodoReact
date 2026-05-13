<?php

// every second

define("ABSPATH", __DIR__ . "/../");
require(ABSPATH . "Core/Autoloader.php");

use App\Middlewares\Throttle;

$th = new Throttle();
$th->cleanIpsViews();
