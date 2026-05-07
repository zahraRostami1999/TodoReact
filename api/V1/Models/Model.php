<?php

namespace App\Models;

use App\Models\Database\Database;

abstract class Model
{
	private $db;
	protected string $table_name;

	public function __construct()
	{
		if (!isset($this->table_name)) {
			// extract current controler name
			$name = get_class($this);
			$name = explode("\\", $name);
			$name = $name[count($name) - 1];
			$name = substr($name, 0, strlen($name) - 5);

			// set table name
			$this->table_name = strtolower($name) . "s";
		}

		$this->db = new Database();
	}

	public function __get($name) {}

	public function total_num(array $conds = ["1=1"], $count_this = "ID")
	{
		return $this->db->select($this->table_name, "COUNT($count_this) as total_num", $conds);
	}

	public function create(array $records)
	{
		return $this->db->insert($this->table_name, $records);
		// $this->db->insert($this->table_name, [
		// 	['description' => "php course", 'id' => 5, 'user_id' => 1],
		// 	['edit images', 6, 1]
		// ]);
	}

	public function read(string|array $columns = ["*"], ?array $conditions = ["1=1"], string|array $order = "", int|array $page = 0)
	{
		return $this->db->select($this->table_name, $columns, $conditions, $order, $page);
		// $this->db->select(
		// 	$this->table_name,
		// 	["funcname (  name)   As  first_name  ", "last_name"],
		// 	[
		// 		[
		// 			"age>=" => 5,
		// 			"age<=" => 5,
		// 			"id" => [1, 2, 3.5],
		// 			"id!" => [1, 2, 3.5],
		// 			"age>" => 5,
		// 			"phone" => null,
		// 			"phone!" => null,
		// 			"age<" => 5
		// 		],
		// 		"name!" => "ali",
		// 		"and",
		// 		"family" => "husen",
		// 		"or",
		// 	],
		// 	["ali", "mmd", ["ali", "DeSc"]],
		// 	[5, 7]
		// );
	}

	public function update($record_data, $conditions)
	{
		return $this->db->update($this->table_name, $record_data, $conditions);
		// $this->db->update($this->table_name, ['name' => "huden"], ["id" => 2, "phone!" => 2]);
	}

	public function delete($conditions, $soft_delete_column = false)
	{
		return $this->db->delete($this->table_name, $conditions, $soft_delete_column);
		// $this->db->delete($this->table_name, ["id" => 1], "deleted_at");
	}
}
