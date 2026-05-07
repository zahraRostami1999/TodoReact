<?php

namespace App\Controllers\Src;

/**
 * @method create
 * @method read
 * @method update
 * @method delete
 * @method total_num
 */
abstract class Controller
{
	use ControllerInputConstraints, ControllerInputValidators;
	protected mixed $model;

	public function __construct(
		protected array $custom_querystring = [],
		protected array $querystring = [],
		protected array $req_headers = [],
		protected mixed $req_body = [],
	) {
		// extract current controler name
		$name = get_class($this);
		$name = explode("\\", $name);
		$name = $name[count($name) - 1];
		$name = substr($name, 0, strlen($name) - 10);

		// set associated model for this controller
		$Model_name = "App\\Models\\{$name}Model";
		$this->model = new $Model_name();
	}
}
