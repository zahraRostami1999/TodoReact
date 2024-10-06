import { useState } from "react";
import styles from "./ToDo.module.css";

function ToDo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  return (
    <>
      <div className={styles.container}>
        <h1>To-Do List</h1>
        <div className={styles.inputTask}>
          <input type="text" placeholder="Add a new task" />
          <button>Add Task</button>
        </div>
      </div>
    </>
  );
}

export default ToDo;
