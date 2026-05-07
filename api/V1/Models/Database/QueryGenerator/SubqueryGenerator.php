<?php

namespace App\Models\Database\QueryGenerator;

use App\Core\Config\CommonConstants;

trait SubqueryGenerator
{
	private function wrapper($value, string $type = "string")
	{
		if (is_null($value)) return $value;

		return match ($type) {
			"string" => "'$value'",
			"numeric" => floatval($value),
			"bool" => boolval($value),
			"column" => "`$value`",
			default => $value
		};
	}

	/**
	 * @param string|array $columns columns you want to read. "first_name"; "count(id) aS num"; ["first_name", "last_name"]
	 */
	private function gen_columns_clause(&$data, array|string $columns, &$column_counter = 0, bool $is_data = false): string
	{
		if (!is_array($columns)) {
			$columns = [$columns];
		}

		$result = [];
		foreach ($columns as $i => $column) {
			if ($column === "*") {
				$result = ["*"];
				break;
			}

			$result[] = $this->gen_column_clause($data, $column, $column_counter, $is_data);
		}

		return implode(", ", $result);
	}

	private function gen_wheres_clause(&$data, array $conds, &$where_counter = 0): string
	{
		$final_clause = "( 1=1";
		$insert_or = false;
		foreach ($conds as $key => $value) {
			$result = $this->gen_where_clause($data, $key, $value, $insert_or, $where_counter);
			if ($result === "continue") continue;
			$final_clause .= $result;
		}
		return substr($final_clause, 10);
	}

	private function gen_order_clause(&$data, array|string $orders): string
	{
		if ($orders === "") {
			return "";
		}

		if (is_string($orders)) {
			$orders = [$orders];
		}

		$order_clause = "ORDER BY ";
		$order_counter = 0;
		foreach ($orders as $order) {
			list($order, $dir) = is_array($order)
				? [$order[0], strtolower(trim($order[1])) === "asc" ? "ASC" : "DESC"]
				: [$order, "DESC"];

			$order_clause .= "`$order` $dir, ";
		}

		return substr($order_clause, 0, strlen($order_clause) - 2);
	}

	private function gen_pagination_clause(&$data, int|array $page, int $per_page = CommonConstants::PER_PAGE): string
	{
		if ($page === 0) return "";
		if (!is_array($page)) $page = [$page];
		if (!isset($page[1])) $page[1] = $per_page;

		$per_page = is_numeric($page[1]) ? $this->wrapper($page[1], 'numeric') : $per_page;
		$page = is_numeric($page[0]) ? $this->wrapper($page[0], 'numeric') : 1;

		$limit = $per_page;
		$offset = $per_page * ($page - 1);

		$data[":limit"] = $limit;
		$data[":offset"] = $offset;

		return "LIMIT :limit OFFSET :offset";
	}
}
