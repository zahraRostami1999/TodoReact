<?php

namespace App\Models\Database;

use PDO;

trait DatabaseConnection
{
	private readonly string $dsn;

	private function set_dsn($host, $database, $driver = "mysql", $charset = "utf8mb4")
	{
		$this->dsn = "$driver:host=$host;dbname=$database;charset=$charset";
	}

	private function set_connection(string $host, string $database, string $username, ?string $password, ?array $options = [])
	{
		$this->set_dsn($host, $database);

		$options = [
			PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
			PDO::ATTR_ERRMODE => PDO::ERRMODE_SILENT,
			PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => false,
			...$options
		];
		$this->pdo = new PDO($this->dsn, $username, $password, $options);
	}
}
