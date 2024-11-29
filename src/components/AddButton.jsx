import { addNewTask } from "../redux/TaskSlice";
import { useDispatch, useSelector } from "react-redux";

const AddButton = () => {
    const tasksList = useSelector((state) => state.Task.tasks)
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(addNewTask("zahra"));
    }

    return (
        <>
            <div>
                <button className="bg-red-400" onClick={() => handleClick()}>Add</button>
            </div>
        </>
    );
}

export default AddButton;