import { setNewTask } from "../redux/TaskSlice";
import { useDispatch, useSelector } from "react-redux";

const Input = () => {
    const taskTitle = useSelector((state) => state.Task.newTask)
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const task = e.target.value;
        dispatch(setNewTask(task))
    }
    return (
        <>
            <div>
                <input type="text" className="border" value={taskTitle} onChange={(e) => handleInputChange(e)} />
            </div>
        </>
    );
}

export default Input;