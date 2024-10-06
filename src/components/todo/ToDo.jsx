import { useState } from "react";
import styles from "./ToDo.module.css";

function ToDo() {
  const [tasks, setTasks] = useState(["Try React Project", "Eat Bread"]);
  const [newTask, setNewTask] = useState("");

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const addTask = () => {
    if(newTask.trim() !== ""){
      setTasks((t) => [...t, newTask]);
      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    const updateTask = tasks.filter((_, i) => i !== index);
    setTasks(updateTask);
  };

const topTask = (index) => {
  if(index > 0){
    const updateTask = [...tasks];
    [updateTask[index], updateTask[index-1]] = [updateTask[index-1], updateTask[index]];
    setTasks(updateTask);
  }
};

const bottomTask = (index) => {
  if(index < tasks.length - 1){
    const updateTask = [...tasks];
    [updateTask[index], updateTask[index+1]] = [updateTask[index+1], updateTask[index]];
    setTasks(updateTask);
  }


};

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
                  <button onClick={() => deleteTask(index)} className={styles.deleteBtn}>👎</button>
                  <button onClick={() => topTask(index)} className={styles.topBtn}>☝️</button>
                  <button onClick={() => bottomTask(index)} className={styles.bottomBtn}>👇</button>
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
