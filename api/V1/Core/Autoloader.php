<?php

spl_autoload_register(function ($callable_name) {
	$callable_name = explode("\\", $callable_name);
	if ($callable_name[0] !== "App") throw new Exception("Wrong namespace");
	unset($callable_name[0]);
	$callable_name = implode(DIRECTORY_SEPARATOR, $callable_name);
	$callable_name = ABSPATH . $callable_name . ".php";

	if (file_exists($callable_name)) {
		require($callable_name);
	} else {
		throw new Exception("File Doesn't exist: $callable_name");
	}
});
