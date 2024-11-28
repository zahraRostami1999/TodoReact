import { useState, useEffect } from "react";
import styles from "./ToDo.module.css";

function ToDo() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("Tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTask, setNewTask] = useState({ title: "", done: false });

  useEffect(() => {
    localStorage.setItem("Tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, title: e.target.value });
  };

  const addTask = () => {
    if (newTask.title.trim() !== "") {
      setTasks((t) => [...t, newTask]);
      setNewTask({ title: "", done: false });
    }
  };

  const doneTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = true;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const topTask = (index) => {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  };

  const bottomTask = (index) => {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  };

  return (
    <>
      <div className="my-3 sm:w-10/12 md:w-3/4">
        <div className="py-1 font-sans font-semibold">
          <h1 className="sm:text-center sm:text-2xl md:text-left font-bold">Xanim Qiz To-Do List</h1>
          <h2 className="sm:text-center sm:text-xl md:text-left font-semibold">Just Do It Babe 🥰</h2>
        </div>

        <div className="py-1 mt-7">
          <div className="flex justify-center items-center px-3 py-2 border-b-2">
            <input
              className="text-lg w-[89%] px-5 py-[10px] rounded-[30px] outline-none border-none "
              name="inputTask"
              type="text"
              placeholder="Add your new task..."
              value={newTask.title}
              onChange={handleInputChange}
            />
            <button
              className="bg-[#fc7814] text-[white] cursor-pointer text-lg px-[8px] py-3 rounded-[50%] border-[none] ml-3"
              onClick={addTask}
            >
              Add
            </button>
          </div>
          <div className="my-5 mx-2 ">
            <ol>
              {tasks.map((task, index) => (
                <li
                  key={index}
                  className="border flex mt-2.5 rounded-[10px] border-solid border-white shadow-zinc-600 shadow-md sm:px-2 py-1"
                >
                  <p
                    style={{
                      textDecoration: task.done ? "line-through" : "none",
                    }}
                    className="text-base font-medium w-2/3 break-words whitespace-normal"
                  >
                    {task.title}
                  </p>
                  <div className="sm:w-1/3 flex justify-around overflow-hidden items-center">
                    <button
                      onClick={() => doneTask(index)}
                      className="sm:text-base bg-transparent cursor-pointer rounded-[50%] border-[none] hover:scale-110"
                    >

                      ✔

                    </button>
                    <button
                      onClick={() => deleteTask(index)}
                      className="sm:text-sm bg-transparent cursor-pointer ml-1 rounded-[50%] border-[none] hover:scale-110"
                    >
                      ✖
                    </button>
                    <button
                      onClick={() => topTask(index)}
                      className="sm:text-base bg-transparent cursor-pointer ml-1 rounded-[50%] border-[none] hover:scale-110"
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => bottomTask(index)}
                      className="sm:text-base bg-transparent cursor-pointer ml-1 rounded-[50%] border-[none] hover:scale-110"
                    >
                      ▼
                    </button>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}

export default ToDo;
