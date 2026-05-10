<?php

namespace App\Controllers;

trait TaskControllerSideMethods
{
    private function read_tasks_recursive(string $user_id, int $limit, int $offset): array
    {
        // recursive algorithm
        $task = ["id" => null];
        $tasks = [];
        $last_task = (new UserController())->get_last_task();
        for ($i = 0; $i < $offset + $limit; $i++) {
            if ($task["id"] === $last_task) {
                break;
            }

            if ($i < $offset) {
                $task = $this->model->read(
                    "id",
                    ["user_id" => $user_id, "prev_task_id" => $task["id"]],
                )[0];
                continue;
            }

            $task = $this->model->read(
                ["id", "description", "done_at"],
                ["user_id" => $user_id, "prev_task_id" => $task["id"]],
            )[0];
            $tasks[] = [
                "id" => $task["id"],
                "description" => $task["description"],
                "done" => !is_null($task["done_at"]),
            ];
        }

        return $tasks;
    }

    private function move_up($this_task)
    {
        if (is_null($this_task["prev_task_id"])) return;

        // set last task if its applicable
        $above = $this->model->read(["id", "prev_task_id"], ["id" => $this_task["prev_task_id"]])[0];
        $uc = new UserController();
        if ($this_task["id"] === $uc->get_last_task()) {
            $uc->set_last_task($above["id"]);
        }

        // current.above = above.above
        $this->model->update(
            ["prev_task_id" => $above["prev_task_id"]],
            ["id" => $this_task["id"]]
        );

        // below.above = above
        $this->model->update(
            ["prev_task_id" => $above["id"]],
            ["prev_task_id" => $this_task["id"]]
        );

        // above.above = current
        $this->model->update(
            ["prev_task_id" => $this_task["id"]],
            ["id" => $above["id"]]
        );
    }

    private function move_down($this_task)
    {
        $uc = new UserController();
        $last_task = $uc->get_last_task();
        if ($this_task["id"] === $last_task) return;

        // set last task if its applicable
        $below = $this->model->read(["id", "prev_task_id"], ["prev_task_id" => $this_task["id"]])[0];
        if ($below["id"] === $last_task) {
            $uc->set_last_task($this_task["id"]);
        }

        // double_below.above = current
        $this->model->update(
            ["prev_task_id" => $this_task["id"]],
            ["prev_task_id" => $below["id"]]
        );

        // current.above = below
        $this->model->update(
            ["prev_task_id" => $below["id"]],
            ["id" => $this_task["id"]]
        );

        // below.above = current.above
        $this->model->update(
            ["prev_task_id" => $this_task["prev_task_id"]],
            ["id" => $below["id"]]
        );
    }
}
