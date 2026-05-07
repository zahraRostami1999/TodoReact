<?php

namespace App\Controllers;

use App\Controllers\Src\Controller;
use App\Core\Config\ResponseMessage;
use App\Core\Utilities\DatabaseUtilities as DBUtil;

class UserController extends Controller
{
    use UserControllerSideMethods;

    public function user_exists()
    {
        $this->defy_custom_querystring();
        $this->defy_body();
        $this->accept_querystring("username", "/[^\s]/");

        // response if user exists
        $does_pars = [
            "status_code" => 200,
            "body" => ["user_exists" => true, "message" => ResponseMessage::$user["exist"]]
        ];

        // response if user doesnt exist
        $doesnt_pars = [
            "status_code" => 404,
            "body" => ["ok"=>true, "user_exists" => false, "message" => ResponseMessage::$user["doesnt_exist"]],
        ];

        // check user existence
        $this->does_user_exist(
            $this->querystring["username"],
            does_pars: $does_pars,
            doesnt_pars: $doesnt_pars
        );
    }

    public function create_user()
    {
        // get user and pass from request
        list($username, $password) = $this->get_user_and_pass_from_request();

        // check if username used or not
        $does_pars = [
            "status_code" => 400,
            "body" => ["username" => $username, "message" => ResponseMessage::$user["exist"]]
        ];
        $this->does_user_exist($username, does_pars: $does_pars);

        // insert to database
        $record = [
            "id" => DBUtil::ulid(),
            "username" => $username,
            "password" => $password,
        ];
        $this->model->create([$record]);

        // login user automatically
        (new AuthController())->login($username, $password, $this);
    }
}
