import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPrimaryButtons } from "./TaskButtons";

const TaskItemButtons = ({ taskId, dropdown }) => {
    const dispatch = useDispatch();
    const [loadingBtnKey, setLoadingBtnKey] = useState(null);

    const buttons = getPrimaryButtons(dispatch, taskId, dropdown, setLoadingBtnKey);

    return (
        <div className="flex items-center gap-1">
            {buttons.map(btn => (
                <button
                    key={btn.key}
                    onClick={btn.onClick}
                    disabled={loadingBtnKey === btn.key}
                    className={`${btn.className} ${loadingBtnKey === btn.key ? "opacity-60 cursor-not-allowed" : ""}w-9 h-9 flex justify-center items-center`}
                >
                    {loadingBtnKey === btn.key ? (
                        <span className="inline-block w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : (
                        btn.icon
                    )}
                </button>
            ))}
        </div>
    );
};

export default TaskItemButtons;
