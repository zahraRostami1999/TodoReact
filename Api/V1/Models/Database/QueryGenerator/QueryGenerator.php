<?php

namespace App\Models\Database\QueryGenerator;

trait QueryGenerator
{
	private function generate_insert(&$data, string $table, array $records)
	{
		if (!is_array($records[0])) {
			$records = [$records];
		}

		// generate columns
		$columns = "( " . $this->gen_columns_clause($data, array_keys($records[0])) . " )";

		// generate values
		$total_values = [];
		$counter = 0;
		foreach ($records as $record) {
			$total_values[] = "( " . $this->gen_columns_clause($data, array_values($record), $counter, is_data: true) . " )";
		}
		$total_values = implode(", ", $total_values);

		// generate query
		return "INSERT INTO `$table` $columns VALUES $total_values";
	}

	private function generate_select(
		&$data,
		string $table,
		string|array $columns = ["*"],
		?array $conditions = ["1=1"],
		string|array $order = "",
		int|array $page = 0
	): string {
		$columns = $this->gen_columns_clause($data, $columns);
		$where = $this->gen_wheres_clause($data, $conditions);
		$order_by = $this->gen_order_clause($data, $order);
		$paginate = $this->gen_pagination_clause($data, $page);
		return  "SELECT $columns FROM `$table` WHERE $where $order_by $paginate";
	}

	private function generate_update(&$data, string $table, array $record_data, ?array $conditions = ["1=1"])
	{
		$set = [];
		$value_counter = 0;
		foreach ($record_data as $column => $value) {

			$value_tag = ":value_{$value_counter}";
			$set[] = "`$column` = $value_tag";
			$value_counter++;
			$data[$value_tag] = $value;
		}
		$set = implode(", ", $set);

		$where = $this->gen_wheres_clause($data, $conditions);

		return "UPDATE `$table` SET $set WHERE $where";
	}

	private function generate_delete(&$data, $table, $conditions = ["1=1"])
	{
		$where = $this->gen_wheres_clause($data, $conditions);
		return "DELETE FROM `$table` WHERE $where";
	}
}
