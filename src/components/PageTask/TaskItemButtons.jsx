import { useDispatch } from "react-redux";
import { getPrimaryButtons } from "./TaskButtons";

const TaskItemButtons = ({ taskId, dropdown }) => {

    const dispatch = useDispatch();
    const buttons = getPrimaryButtons(dispatch, taskId, dropdown);

    return (
        <div className="flex items-center">
            {buttons.map(btn => (
                <button
                    key={btn.key}
                    onClick={btn.onClick}
                    className={btn.className}
                >
                    {btn.icon}
                </button>
            ))}
        </div>
    );
};

export default TaskItemButtons;
