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

export const getPrimaryButtons = (dispatch, taskId, dropdown, setLoadingBtnKey) => [
    {
        key: "done",
        icon: <FaCheck size={18} />,
        onClick: async () => {
            setLoadingBtnKey("done");
            try {
                await handleDoneTask(dispatch, taskId);
            } finally {
                setLoadingBtnKey(null);
            }
        },
        className: "text-purple-500 hover:bg-orange-50 p-2 rounded-full"
    },
    {
        key: "move_up",
        icon: <FaAngleUp size={20} />,
        onClick: async () => {
            setLoadingBtnKey("move_up");
            try {
                await moveUpTask(dispatch, taskId);
            } finally {
                setLoadingBtnKey(null);
            }
        },
        className: "text-neutral-600 hover:bg-violet-50 p-2 rounded-full"
    },
    {
        key: "move_down",
        icon: <FaAngleDown size={20} />,
        onClick: async () => {
            setLoadingBtnKey("move_down");
            try {
                await moveDownTask(dispatch, taskId);
            } finally {
                setLoadingBtnKey(null);
            }
        },
        className: "text-neutral-600 hover:bg-violet-50 p-2 rounded-full"
    },
    {
        key: "more",
        icon: <FaEllipsisV size={16}/>,
        onClick: dropdown,
        className: "text-neutral-500 hover:bg-neutral-100 p-2 rounded-full"
    }
];

export const getDeleteButton = (dispatch, taskId, setLoadingBtnKey) => ({
    icon: <FaTrash size={20} />,
    onClick: async () => {
        setLoadingBtnKey("delete");
        try {
            await handleDeleteTask(dispatch, taskId);
        } finally {
            setLoadingBtnKey(null);
        }
    },
});

export const expandIcons = {
    expand: <FaPlus size={18} className="text-orange-600" />,
    collapse: <FaMinus size={18} />
}