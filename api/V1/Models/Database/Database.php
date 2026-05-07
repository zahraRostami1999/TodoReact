<?php

namespace App\Models\Database;

use App\Models\Database\QueryGenerator\QueryGenerator;
use App\Models\Database\QueryGenerator\SubqueryGenerator;
use App\Models\Database\QueryGenerator\SingleSubqueryGenerator;
use App\Core\Config\DatabaseConfig as DbConfig;
use PDO;

class Database
{
	use DatabaseConnection, DatabaseCRUD, DatabaseExecution;
	use QueryGenerator, SubqueryGenerator, SingleSubqueryGenerator;

	private readonly PDO $pdo;

	function __construct(
		string $database = DbConfig::NAME,
		string $username = DbConfig::USER,
		string $password = DbConfig::PASS,
		string $host = DbConfig::HOST,
	) {
		// return connection result
		$this->set_connection($host, $database, $username, $password);
	}
}
