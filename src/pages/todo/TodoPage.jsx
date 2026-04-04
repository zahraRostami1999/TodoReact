import { useState, useEffect } from "react";
import Header from "../../components/Header";
import InputTasks from "../../components/InputTasks";
import TasksList from "../../components/TasksList";
import Api from "../../services/Api";
const TodoPage = () => {
    const [tasks_list, setTasks_list] = useState([]);
    const [tasks_should_change, setTasks_should_change] = useState(false);

    const addTask = async (task_index) => {
        Api.Task.create(task_index);
        setTasks_should_change(true);
    };

    useEffect(() => {
        const getTasks = async () => {
            let tasksList = await Api.Task.getAll(1, 10);
            setTasks_list(tasksList.content);
            setTasks_should_change(false);
        }
        getTasks();
    }, [tasks_should_change])

    return (
        <>
            <div className='w-full min-h-screen overflow-hidden text-neutral-800 bg-gradient-to-br from-purple-50 to-purple-400'>
                <div className='flex flex-col gap-10 h-full overflow-hidden p-5'>
                    {/* header */}
                    <Header />
                    {/* input */}
                    <InputTasks addTask={addTask} />
                    {/* list */}
                    <TasksList initialTasks={tasks_list} handleChange={() => setTasks_should_change(true)} />
                </div>
            </div>
        </>
    );
}

export default TodoPage;