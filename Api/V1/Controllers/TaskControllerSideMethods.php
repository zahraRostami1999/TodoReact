<?php

namespace App\Controllers;

trait TaskControllerSideMethods
{
    private function read_tasks_recursive(string $user_id, int $limit, int $offset): array
    {
        // recursive algorithm
        $task = ["ID" => null];
        $tasks = [];
        $last_task = (new UserController())->get_last_task();
        for ($i = 0; $i < $offset + $limit; $i++) {
            if ($task["ID"] === $last_task) {
                break;
            }

            if ($i < $offset) {
                $task = $this->model->read(
                    "ID",
                    ["user_id" => $user_id, "prev_task_id" => $task["ID"]],
                )[0];
                continue;
            }

            $task = $this->model->read(
                ["ID", "description", "done_at"],
                ["user_id" => $user_id, "prev_task_id" => $task["ID"]],
            )[0];
            $tasks[] = [
                "id" => $task["ID"],
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
        $above = $this->model->read(["ID", "prev_task_id"], ["ID" => $this_task["prev_task_id"]])[0];
        $uc = new UserController();
        if ($this_task["ID"] === $uc->get_last_task()) {
            $uc->set_last_task($above["ID"]);
        }

        // current.above = above.above
        $this->model->update(
            ["prev_task_id" => $above["prev_task_id"]],
            ["ID" => $this_task["ID"]]
        );

        // below.above = above
        $this->model->update(
            ["prev_task_id" => $above["ID"]],
            ["prev_task_id" => $this_task["ID"]]
        );

        // above.above = current
        $this->model->update(
            ["prev_task_id" => $this_task["ID"]],
            ["ID" => $above["ID"]]
        );
    }

    private function move_down($this_task)
    {
        $uc = new UserController();
        $last_task = $uc->get_last_task();
        if ($this_task["ID"] === $last_task) return;

        // set last task if its applicable
        $below = $this->model->read(["ID", "prev_task_id"], ["prev_task_id" => $this_task["ID"]])[0];
        if ($below["ID"] === $last_task) {
            $uc->set_last_task($this_task["ID"]);
        }

        // double_below.above = current
        $this->model->update(
            ["prev_task_id" => $this_task["ID"]],
            ["prev_task_id" => $below["ID"]]
        );

        // current.above = below
        $this->model->update(
            ["prev_task_id" => $below["ID"]],
            ["ID" => $this_task["ID"]]
        );

        // below.above = current.above
        $this->model->update(
            ["prev_task_id" => $this_task["prev_task_id"]],
            ["ID" => $below["ID"]]
        );
    }
}
