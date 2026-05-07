<?php

namespace App\Controllers;

use App\Views\Response;
use App\Core\Config\ResponseMessage;

trait UserControllerSideMethods
{
	private function does_user_exist($username, ?array $does_pars = null, ?array $doesnt_pars = null)
	{
		$users = $this->users_by_this($username);

		if (count($users) === 0) {
			if ($doesnt_pars) new Response(...$doesnt_pars);
			else return false;
		}

		if ($does_pars) new Response(...$does_pars);
		else return true;
	}

	private function users_by_this($username)
	{
		$username = $this->validate_user($username);
		return  $this->model->read("*", ["username" => $username]);
	}

	public function get_user_and_pass_from_request()
	{
		$this->defy_custom_querystring();
		$this->defy_querystring();
		$this->accept_header("Content-Type", "/application\/json/");
		$this->accept_body(accept_type: "array");

		// only get user and pass
		if (count($this->req_body) !== 2 || !isset($this->req_body["username"]) || !isset($this->req_body["password"])) {
			new Response(400, default_message: true);
		}

		$username = $this->validate_user($this->req_body["username"]);
		$password = $this->validate_pass($this->req_body["password"]);

		return [$username, $password];
	}

	public function get_id($username, $password)
	{
		$result = $this->model->read("ID", ["username" => $username, "password" => $password]);

		if (!$result) {
			$response_body = ["message" => ResponseMessage::$auth["failed_login"]];
			new Response(400, $response_body);
		}

		return $result[0]["ID"];
	}

	public function get_last_task()
	{
		$user_id = $GLOBALS["authenticated_user_id"];
		$records = $this->model->read("last_task", ["ID" => $user_id]);
		return empty($records) ? [] : $records[0]["last_task"];
	}
	public function set_last_task($value)
	{
		$user_id = $GLOBALS["authenticated_user_id"];
		return $this->model->update(["last_task" => $value], ["ID" => $user_id]);
	}
}
