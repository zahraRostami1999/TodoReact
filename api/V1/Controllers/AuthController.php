<?php

namespace App\Controllers;

use App\Controllers\Src\Controller;
use App\Core\Config\ResponseMessage;
use App\Views\Response;

class AuthController extends Controller
{
	use AuthTokenGeneration, AuthTokenVerification, AuthControllerSideMethods;

	public function login(?string $username = null, ?string $password = null, ?UserController $uc = null)
	{
		// extract credentials from body if method is called from endpoint
		if (!isset($username) && !isset($password)) {
			$uc = new UserController($this->querystring, $this->querystring, $this->req_headers, $this->req_body);
			list($username, $password) = $uc->get_user_and_pass_from_request();
		}

		// get id of this user and password
		$ID = $uc->get_id($username, $password);

		// delete previous tokens
		$this->model->delete(["user_id" => $ID]);
		$this->set_tkn_and_return($ID);
	}

	public function refresh()
	{
		// delete previous refresh token
		list($refresh, $user_id) = $this->get_refresh_from_body_and_validate();
		$this->delete_user_tokens($refresh, $user_id);
		$this->set_tkn_and_return($user_id);
	}

	public function logout()
	{
		// delete previous refresh token
		list($refresh, $user_id) = $this->get_refresh_from_body_and_validate();
		$this->delete_user_tokens($refresh, $user_id);

		// send response
		$response_body = ["message" => ResponseMessage::$auth["successful_logout"]];
		new Response(200, $response_body);
	}
}
