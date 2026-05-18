<?php

// weekly

namespace App\Crons;

define("ABSPATH", __DIR__ . "/../");
require(ABSPATH . "Core/Autoloader.php");

use App\Models\AuthModel;

define("DEBUG", false);
$model = new AuthModel();


$now = date('Y-m-d H:i:s');
$cond = ["expiration < '$now'"];
$model->delete($cond);
