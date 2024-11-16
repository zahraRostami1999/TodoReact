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
      <div className="w-[95%] my-3">
        <div className="py-1 font-Poppins font-semibold">
          <h1 className="text-center text-3xl ">Xanim Qiz To-Do List</h1>
        </div>

        <div className="py-1 my-10">
          <div className="bg-[rgba(14,14,14,0.5)] rounded-[15px]  flex justify-center items-center px-3 py-5">
            <input
              className="text-xl w-[89%] px-3 py-[7px] rounded-[30px] outline-none border-none font-Poppins"
              name="inputTask"
              type="text"
              placeholder="Add your new task..."
              value={newTask.title}
              onChange={handleInputChange}
            />
            <button
              className="bg-[#fc7814] font-Poppins text-[white] cursor-pointer text-xl px-[8px] py-2 rounded-[50%] border-[none] mx-10;
"
              onClick={addTask}
            >
              Add
            </button>
          </div>
          <div className="my-10 mx-3">
            <ol>
              {tasks.map((task, index) => (
                <li
                  key={index}
                  className="border flex justify-between mt-2.5 p-2.5 rounded-[10px] border-solid border-white shadow-zinc-600 shadow-md
"
                >
                  <p
                    style={{
                      textDecoration: task.done ? "line-through" : "none",
                    }}
                    className="text-xl font-Poppins font-medium"
                  >
                    {task.title}
                  </p>
                  <div className={styles.btn}>
                    <button
                      onClick={() => doneTask(index)}
                      className="text-xl bg-transparent cursor-pointer ml-5 rounded-[50%] border-[none]
"
                    >
                      ✅
                    </button>
                    <button
                      onClick={() => deleteTask(index)}
                      className="text-xl bg-transparent cursor-pointer ml-5 rounded-[50%] border-[none]"
                    >
                      ❌
                    </button>
                    <button
                      onClick={() => topTask(index)}
                      className="text-xl bg-transparent cursor-pointer ml-5 rounded-[50%] border-[none]"
                    >
                      ☝🏻
                    </button>
                    <button
                      onClick={() => bottomTask(index)}
                      className="text-xl bg-transparent cursor-pointer ml-5 rounded-[50%] border-[none]"
                    >
                      👇🏻
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
