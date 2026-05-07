<?php

namespace App\Controllers;

use App\Core\Config\CommonConstants;
use App\Core\Config\ResponseMessage;
use App\Core\Utilities\DatabaseUtilities as DBUtil;
use App\Views\Response;

trait AuthControllerSideMethods
{
	private function set_tkn_and_return($user_id)
	{
		// create new tokens
		list($access_token, $refresh_token) = $this->gen_token_for_user($user_id);

		// send response
		$response_body = [
			"message" => ResponseMessage::$auth["successful_login"],
			"access" => $access_token,
			"refresh" => $refresh_token,
			"access_exp" => 1000 * (time() +  CommonConstants::get_access_exp()),
			"refresh_exp" => 1000 * (time() +  CommonConstants::get_refresh_exp()),
		];
		new Response(200, $response_body);
	}

	private function delete_user_tokens($refresh, $user_id)
	{
		// get all token for this user
		$token_cond = ["user_id" => $user_id, "value" => DBUtil::hash($refresh)];
		$db_token = $this->model->read("id", $token_cond);
		if (!$db_token) {
			new Response(400, ["message" => ResponseMessage::$auth["invalid_token"]]);
		}

		// invalidate last token
		$this->model->delete($token_cond);
	}

	private function get_refresh_from_body_and_validate()
	{
		// check user input
		$this->defy_custom_querystring();
		$this->defy_querystring();
		$this->accept_header("Content-Type", "/application\/json/");
		$this->accept_body(accept_type: "array");

		// extraction
		if (count($this->req_body) !== 1 || !isset($this->req_body["refresh"])) {
			new Response(400, default_message: true);
		}

		// validation
		$refresh = trim($this->req_body["refresh"]);
		$payload = $this->verifyToken($refresh);
		if (!$payload || $payload["type"] !== "refresh") {
			new Response(400, ["message" => ResponseMessage::$auth["invalid_token"]]);
		}
		if ($this->token_expired($payload["exp"])) {
			new Response(400, ["message" => ResponseMessage::$auth["expired_token"]]);
		}

		// return result
		return [$refresh, $payload["sub"]];
	}

	private function gen_token_for_user($ID)
	{
		// generate tokens
		$access_token = $this->createAccessToken($ID);
		$refresh_token = $this->createRefreshToken($ID);

		// save refresh token
		$record = [
			"id" => DBUtil::ulid(),
			"user_id" => $ID,
			"value" => DBUtil::hash($refresh_token),
			"expiration" => DBUtil::formated_time(CommonConstants::get_refresh_exp()),
		];
		$this->model->create([$record]);

		// return results
		return [$access_token, $refresh_token];
	}
}
