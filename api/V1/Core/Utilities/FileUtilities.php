<?php

namespace App\Core\Utilities;

use App\Core\Config\Keys;

final class FileUtilities
{
	// logging function
	public static function log($message, $file_name = null)
	{
		$file_name = ($file_name ?? "log") . ".text";
		$file_dir = ABSPATH . "logs--" . Keys::LOG;

		$file_path = $file_dir . DIRECTORY_SEPARATOR . $file_name;

		if (!file_exists($file_dir)) {
			mkdir($file_dir, recursive: true);
		}

		// log message
		$date = date("Y-m-d H:i:s", time());
		$log_message = "$date | $message" . PHP_EOL;

		// save log
		file_put_contents($file_path, $log_message, FILE_APPEND);
	}
};
