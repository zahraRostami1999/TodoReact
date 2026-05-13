<?php

namespace App\Models\Database\QueryGenerator;

use App\Core\Utilities\CommonUtilities as Util;

trait SingleSubqueryGenerator
{
	private function gen_column_clause(&$data, $column, &$column_counter, $is_data): string
	{
		if ($is_data) {
			$temp_value = $column;
			$column = ":clm_{$column_counter}";
			$data[$column] = Util::convert_to_numeric($temp_value);
			$column_counter++;
		} else {
			/**
			 * ^(?:(?<func>\w+)\s*\()?\s*(?:(?<distinct>distinct)\s*)?(?<column>\w+)\s*\)?(?:\s*as\s+(?<alias>\w+))?$
			 */
			$func = "(?:(?<func>\w+)\s*\(\s*)?";
			$distinct = "(?:(?<distinct>distinct)\s*)?";
			$column_pattern = "(?<column>\w+)";
			$alias = "(?:\s*as\s+(?<alias>\w+))?";
			$pattern = "^$func$distinct$column_pattern\s*\)?$alias$";
			preg_match("/$pattern/i", trim($column), $matches);
			$column = $this->wrapper($matches["column"], "column");

			if (isset($matches['distinct']) && $matches['distinct']) $column = "DISTINCT " . $column;
			if (isset($matches['func']) && $matches['func']) $column = strtoupper($matches['func']) . "($column)";
			if (isset($matches['alias']) && $matches['alias']) {
				$column .= " AS " . $this->wrapper($matches['alias'], "column");
			}
		}

		return $column;
	}
	private function gen_where_clause(&$data, $key, $value, &$insert_or, &$where_counter): string
	{
		if (is_numeric($key) && is_array($value)) {
			$cond_clause = $this->gen_wheres_clause($data, $value, $where_counter);
		} elseif (is_numeric($key) && is_string($value)) { // and, or directive && custom clause
			$value = strtolower(trim($value));
			$insert_or = $value === "or";
			if ($value === "or" || $value === "and")
				return "continue";
			$cond_clause = $value; // ['lgbkuvku']custom condition; DO NOT PASS USER INPUT (NO SQLINJECTION CHECK)
		} else {
			$is_negative = substr($key, -1) === "!";

			if (is_array($value)) { // handle array
				// $value = "(" . implode(", ", array_map([$this, 'wrapper'], $value, array_fill(0, count($value), "string"))) . ")";
				$res = "( ";
				foreach ($value as $v) {
					$temp_val = ":where_value_{$where_counter}";
					$res .= "$temp_val , ";
					$where_counter++;
					$data[$temp_val] = $v;
				}
				$value = substr($res, 0, strlen($res) - 3) . " )";
				$operator = $is_negative ? "NOT IN" : "IN";
			} elseif (is_null($value)) { // handle null
				// $value = "NULL";
				$value = ":where_value_{$where_counter}";
				$where_counter++;
				$data[$value] = null;
				$operator = $is_negative ? "IS NOT" : "IS";
			} else {
				$operator = match (substr($key, -2)) {
					">=" => ">=",
					"<=" => "<=",
					"> " => ">",
					"< " => "<",
					default => $is_negative ? "<>" : "="
				};
				$temp_val = ":where_value_{$where_counter}";
				$data[$temp_val] = $value;
				$value = $temp_val;
				$where_counter++;
			}

			// turn 0 and 1 length operators to 2 length
			$op_len = match (substr($key, -1)) {
				">", "<", "!" => 1,
				"=" => 2,
				default => 0
			};
			$key .= str_repeat(" ", 2 - $op_len);
			$key = substr($key, 0, strlen($key) - 2);

			$cond_clause = "`$key` $operator $value";
			// $cond_clause = "$key $operator $value";
		}
		$directive = $insert_or ? "OR" : "AND";
		$insert_or = false;
		return " $directive ( $cond_clause )";
	}
}
