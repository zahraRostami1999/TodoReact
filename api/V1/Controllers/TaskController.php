<?php

namespace App\Controllers;

use App\Controllers\Src\Controller;
use App\Core\Config\CommonConstants;
use App\Core\Config\ResponseMessage;
use App\Core\Utilities\DatabaseUtilities as DBUtil;
use App\Core\Utilities\DatabaseUtilities;
use App\Views\Response;

class TaskController extends Controller
{
    use TaskControllerSideMethods;

    public function read_tasks()
    {
        $this->defy_querystring();
        $this->defy_body();

        $page = isset($this->custom_querystring["page"]) ? intval($this->custom_querystring["page"]) : 1;
        $per_page = isset($this->custom_querystring["per_page"]) ? intval($this->custom_querystring["per_page"]) : CommonConstants::PER_PAGE;
        $per_page = min(20, $per_page);

        $limit = $per_page;
        $offset = $per_page * ($page - 1);

        $user_id = $GLOBALS["authenticated_user_id"];
        $total_num = $this->model->total_num(["user_id" => $user_id])[0]["total_num"];
        $total_pages = ceil($total_num / $per_page);
        header("Access-Control-Expose-Headers: X-Total-Items, X-Total-Pages, X-Current-Page");
        header("X-Total-Items: $total_num");
        header("X-Total-Pages: $total_pages");

        if ((int) $total_pages === 0) {
            new Response(200, []);
        }

        if (($limit + $offset) / $per_page > $total_pages) {
            new Response(400, default_message: true);
        }
        header("X-Current-Page: $page");

        unset($page, $per_page, $total_num);

        $tasks = $this->read_tasks_recursive($user_id, $limit, $offset);

        new Response(200, $tasks);
    }

    public function delete_task()
    {
        $this->defy_custom_querystring();
        $this->defy_body();
        $this->accept_querystring("id", "/[\d\w]{26}/");

        if (!isset($this->querystring["id"])) {
            new Response(400);
        }

        // check id validity
        $this_task = $this->model->read(["id", "prev_task_id"], ["id" => $this->querystring["id"]]);
        if (empty($this_task)) {
            new Response(400, ["message" => ResponseMessage::$task["doesnt_exist"]]);
        }

        // handle last task in user table
        $uc = new UserController();
        if ($uc->get_last_task() === $this->querystring["id"]) {
            $uc->model->update(
                ["last_task" => $this_task[0]["prev_task_id"]],
                ["id" => $GLOBALS["authenticated_user_id"]]
            );
        }

        // edit task below this
        $this->model->update(
            ["prev_task_id" => $this_task[0]["prev_task_id"]],
            ["prev_task_id" => $this_task[0]["id"]]
        );

        // delete this task
        $this->model->delete(["id" => $this_task[0]["id"]]);
        new Response(200, ["id" => $this_task[0]["id"], "message" => ResponseMessage::$task["delete_success"]]);
    }

    public function update_task()
    {
        $this->accept_header("Content-Type", "/application\/json/");
        $this->defy_custom_querystring();
        $this->accept_querystring("id", "/[\d\w]{26}/");
        $this->accept_body("array");

        // check if id is sent
        if (!isset($this->querystring["id"])) {
            new Response(400, default_message: true);
        }

        // check if task exist
        $this_task = $this->model->read(["id", "done_at", "prev_task_id"], ["id" => $this->querystring["id"]]);
        if (empty($this_task)) {
            new Response(400, ["message" => ResponseMessage::$task["doesnt_exist"]]);
        }
        $this_task = $this_task[0];

        // toggle state
        if (isset($this->req_body["toggle"])) {
            $this->model->update(
                ["done_at" => is_null($this_task["done_at"])
                    ? DatabaseUtilities::formated_time() : null],
                ["id" => $this_task["id"]]
            );
            new Response(200, ["id" => $this_task["id"]], default_message: true);
        }

        // move (change priority)
        if (isset($this->req_body["move"])) {
            $direction = strtolower(trim($this->req_body["move"]));

            if ($direction === "up") {
                $this->move_up($this_task);
            } else {
                $this->move_down($this_task);
            }

            new Response(200, ["id" => $this_task["id"], "message" => ResponseMessage::$task["success_move"]]);
        }

        new Response(400, default_message: true);
    }

    public function create_task()
    {
        $this->defy_custom_querystring();
        $this->defy_querystring();
        $this->accept_header("Content-Type", "/application\/json/");
        $this->accept_body("array");

        if (!isset($this->req_body["description"])) {
            new Response(400);
        }

        $uc = new UserController();

        $record = [
            "id" => DBUtil::ulid(),
            "user_id" => $GLOBALS["authenticated_user_id"],
            "description" => $this->req_body["description"],
            "prev_task_id" => $uc->get_last_task(),
        ];

        $inserted_id = $this->model->create([$record]);
        $uc->set_last_task($inserted_id);

        new Response(201, ["task_id" => $inserted_id], default_message: true);
    }
}
