import { useState } from "react";
import styles from "./ToDo.module.css";

function ToDo() {
  const [tasks, setTasks] = useState(["Try React Project", "Eat Bread"]);
  const [newTask, setNewTask] = useState("");

  return (
    <>
      <div className={styles.container}>
        <h1>To-Do List</h1>
        <div className={styles.inputTask}>
          <input type="text" placeholder="Add a new task" />
          <button>Add Task</button>
        </div>
        <div className={styles.tasksList}>
          <ol>
            {tasks.map((task,index) => (<li key={index}>{task}</li>))}
          </ol>
        </div>
      </div>
    </>
  );
}

export default ToDo;
