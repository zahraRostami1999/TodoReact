<?php

namespace App\Models\Database;

use App\Core\Utilities\DatabaseUtilities;

trait DatabaseCRUD
{
	private $stmt_data = [];

	public function insert(string $table, array $records)
	{
		$stmt = $this->generate_insert($this->stmt_data, $table, $records);
		$result = $this->fetch_query($stmt, type: "insert");
		return $result;
	}

	public function select(string $table, string|array $columns = ["*"], ?array $conditions = ["1=1"], string|array $order = "", int|array $page = 0)
	{
		$stmt = $this->generate_select($this->stmt_data, $table, $columns, $conditions, $order, $page);
		$result = $this->fetch_query($stmt, type: "select");
		return $result;
	}

	public function update(string $table, array $record_data, ?array $conditions = ["1=1"])
	{
		$stmt = $this->generate_update($this->stmt_data, $table, $record_data, $conditions);
		$result = $this->fetch_query($stmt, type: "update");
		return $result;
	}

	public function delete(string $table, $conditions = ["1=1"], bool|string $soft_delete_column = false)
	{
		if ($soft_delete_column) {
			$records = [$soft_delete_column => DatabaseUtilities::formated_time()];
			$stmt = $this->generate_update($this->stmt_data, $table, $records, $conditions);
		} else {
			$stmt = $this->generate_delete($this->stmt_data, $table, $conditions);
		}
		$result = $this->fetch_query($stmt, type: "delete");
		return $result;
	}
}
