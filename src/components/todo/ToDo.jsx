import { useState } from "react";
import styles from "./ToDo.module.css";

function ToDo() {
  const [tasks, setTasks] = useState(["Try React Project", "Eat Bread"]);
  const [newTask, setNewTask] = useState("");

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const addTask = () => {
    setTasks((t) => [...t, newTask]);
    setNewTask("");
  };

  const deleteTask = (index) => {};

  return (
    <>
      <div className={styles.container}>
        <h1>To-Do List</h1>
        <div className={styles.inputTask}>
          <input
            name="inputTask"
            type="text"
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => handleInputChange(e)}
          />
          <button onClick={addTask}>Add Task</button>
        </div>
        <div className={styles.tasksList}>
          <ol>
            {tasks.map((task, index) => (
              <li key={index}>
                {task}
                <div className={styles.btn}>
                  <button className={styles.deleteBtn}>👎</button>
                  <button className={styles.doneBtn}>👌</button>
                  <button className={styles.topBtn}>☝️</button>
                  <button className={styles.bottomBtn}>👇</button>
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
