<?php

namespace App\Core\Config;

class DatabaseConfig
{
	public const NAME = DEBUG ? "todo" : "database_name";
	public const HOST = DEBUG ? "localhost" : "database_host";
	public const USER = DEBUG ? "root" : "database_user";
	public const PASS = DEBUG ? "" : "database_password";
}
