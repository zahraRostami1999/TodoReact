import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPrimaryButtons } from "./TaskButtons";

const TaskItemButtons = ({ taskId, dropdown }) => {
    const dispatch = useDispatch();
    const [loadingBtnKey, setLoadingBtnKey] = useState(null);

    const buttons = getPrimaryButtons(dispatch, taskId, dropdown, setLoadingBtnKey);

    return (
        <div className="flex items-center">
            {buttons.map(btn => (
                <button
                    key={btn.key}
                    onClick={btn.onClick}
                    disabled={loadingBtnKey === btn.key}
                    className={`${btn.className} ${loadingBtnKey === btn.key ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                    {loadingBtnKey === btn.key ? (
                        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : (
                        btn.icon
                    )}
                </button>
            ))}
        </div>
    );
};

export default TaskItemButtons;
