import {
    FaCheck,
    FaAngleUp,
    FaAngleDown,
    FaEllipsisV,
    FaTrash,
    FaPlus,
    FaMinus,
} from "react-icons/fa";

import {
    handleDoneTask,
    handleDeleteTask,
    moveUpTask,
    moveDownTask
} from "./TaskActions";

export const getPrimaryButtons = (dispatch, taskId, dropdown) => [
    {
        key: "done",
        icon: <FaCheck size={18} />,
        onClick: () => handleDoneTask(dispatch, taskId),
        className: "text-purple-500 hover:bg-orange-50 p-2 rounded-full"
    },
    {
        key: "move_up",
        icon: <FaAngleUp size={20} />,
        onClick: () => moveUpTask(dispatch, taskId),
        className: "text-neutral-600 hover:bg-violet-50 p-2 rounded-full"
    },
    {
        key: "move_down",
        icon: <FaAngleDown size={20} />,
        onClick: () => moveDownTask(dispatch, taskId),
        className: "text-neutral-600 hover:bg-violet-50 p-2 rounded-full"
    },
    {
        key: "more",
        icon: <FaEllipsisV />,
        onClick: dropdown,
        className: "text-neutral-500 hover:bg-neutral-100 p-2 rounded-full"
    }
];

export const getDeleteButton = (dispatch, taskId) => ({
    icon: <FaTrash size={22} />,
    onClick: () => handleDeleteTask(dispatch, taskId)
});

export const expandIcons = {
    expand: <FaPlus size={18} className="text-orange-600"/>,
    collapse: <FaMinus size={18} />
}