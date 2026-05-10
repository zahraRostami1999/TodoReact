import Api from "../../services/api/api.js";
import { done_task, delete_Task, move_up_task, move_down_task } from "../../redux/TaskSlice";

export const handleDoneTask = async (dispatch, id) => {
    const res = await Api.Task.toggleDone(id);
    if (!res) return;
    dispatch(done_task(id));
};

export const handleDeleteTask = async (dispatch, id) => {
    const res = await Api.Task.delete(id);
    if (!res) return;
    dispatch(delete_Task(id));
};

export const moveUpTask = async (dispatch, id) => {
    const res = await Api.Task.moveUp(id);
    if (!res) return;
    dispatch(move_up_task(id));
};

export const moveDownTask = async (dispatch, id) => {
    const res = await Api.Task.moveDown(id);
    if (!res) return;
    dispatch(move_down_task(id));
};
