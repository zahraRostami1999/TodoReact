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
      <div className={styles.container}>
        <h1 className="text-red-600">To-Do List</h1>
        <div className={styles.inputTask}>
          <input
            name="inputTask"
            type="text"
            placeholder="Add a new task"
            value={newTask.title}
            onChange={handleInputChange}
          />
          <button onClick={addTask}>Add</button>
        </div>
        <div className={styles.tasksList}>
          <ol>
            {tasks.map((task, index) => (
              <li key={index}>
                <p
                  style={{
                    textDecoration: task.done ? "line-through" : "none",
                  }}
                >
                  {task.title}
                </p>
                <div className={styles.btn}>
                  <button onClick={() => doneTask(index)} className={styles.doneBtn}>
                    ✅
                  </button>
                  <button onClick={() => deleteTask(index)} className={styles.deleteBtn}>
                    ❌
                  </button>
                  <button onClick={() => topTask(index)} className={styles.topBtn}>
                    ☝🏻
                  </button>
                  <button onClick={() => bottomTask(index)} className={styles.bottomBtn}>
                    👇🏻
                  </button>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}

export default ToDo;
