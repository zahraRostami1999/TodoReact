import React, { useState } from 'react';
import TaskItem from './TaskItem';

function TasksList({ initialTasks = [] }) { 
  const [tasks, setTasks] = useState(initialTasks); 
  const [visibleDropDownIndex, setVisibleDropDownIndex] = useState(null); 
  const [activeButton, setActiveButton] = useState(null); 

  const doneTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].status = !newTasks[index].status; 
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    setVisibleDropDownIndex(null); 
    setActiveButton(null); 
  };

  const moveUpTask = (index) => {
    if (index === 0) return; 
    const newTasks = [...tasks];
    [newTasks[index - 1], newTasks[index]] = [newTasks[index], newTasks[index - 1]];
    setTasks(newTasks);
  };

  const moveDownTask = (index) => {
    if (index === tasks.length - 1) return;
    const newTasks = [...tasks];
    [newTasks[index], newTasks[index + 1]] = [newTasks[index + 1], newTasks[index]];
    setTasks(newTasks);
  };

  const toggleDropdown = (index) => {
    setVisibleDropDownIndex(index === visibleDropDownIndex ? null : index);
    setActiveButton(index === visibleDropDownIndex ? null : index);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">هنوز تسکی اضافه نشده!</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task, index) => (
            <TaskItem
              key={index} 
              task={task} 
              index={index}
              onDone={doneTask} 
              onDeleted={deleteTask} 
              onMoveUp={moveUpTask} 
              onMoveDown={moveDownTask} 
              onToggleDropdown={toggleDropdown} 
              visibleDropDownIndex={visibleDropDownIndex} 
              activeButton={activeButton} 
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TasksList;
