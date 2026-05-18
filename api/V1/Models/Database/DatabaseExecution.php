<?php

namespace App\Models\Database;

use App\Core\Utilities\FileUtilities;
use Exception;
use PDO;

trait DatabaseExecution
{
	private function fetch_query($stmt, $type)
	{
		$this->prepare_query($stmt);
		$result = $stmt->execute();

		if (!$result) {
			$result = (int) $this->error_management($stmt);
			throw new Exception("An error occurd while fetching query", $result);
		}
		if ($type === "insert") {
			$insert_id = $this->stmt_data[":clm_0"];
			$this->stmt_data = [];
			$this->pdo->lastInsertId();
			return $insert_id;
		} elseif ($type === "select") {
			$this->stmt_data = [];
			return $stmt->fetchAll();
		} else {
			$this->stmt_data = [];
			$result = $stmt->rowCount();
			return $result;
		}
	}

	private function prepare_query(&$stmt)
	{
		$stmt = $this->pdo->prepare($stmt);
		foreach ($this->stmt_data as $key => $datum) {
			$type = match (gettype($datum)) {
				"NULL" => PDO::PARAM_NULL,
				"integer", "double" => PDO::PARAM_INT,
				"string" => PDO::PARAM_STR,
				default => PDO::PARAM_STR
			};
			$stmt->bindParam($key, $this->stmt_data[$key], $type);
		}
	}

	private function error_management($stmt)
	{
		$err = $stmt->errorInfo();
		$err_mssg = "Database query ERROR {$err[1]} ({$err[0]}) {$err[2]}";

		ob_start();
		$stmt->debugDumpParams();
		$sql = ob_get_clean();
		preg_match("/Sent SQL: \[\d+\]\s(?<sent_sql>.*)/", $sql, $matches);

		FileUtilities::log($err_mssg, "db_log");
		FileUtilities::log("Sent SQL for above error: {$matches['sent_sql']}", "db_log");

		return $err[0];
	}
}
