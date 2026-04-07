import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import Api from "../../services/Api"

function TasksList({ initialTasks = [], handleChange }) {
  const [tasks, setTasks] = useState(initialTasks || []);
  const [visibleDropDownIndex, setVisibleDropDownIndex] = useState(null);
  const [activeButton, setActiveButton] = useState(null);

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  const doneTask = async (index) => {
    await Api.Task.toggleDone(index);
    handleChange();
  };

  const deleteTask = async (index) => {
    await Api.Task.delete(index)
    handleChange();
  }

  const moveUpTask = async (index) => {
    await Api.Task.moveUp(index);
    handleChange();
  }

  const moveDownTask = async (index) => {
    await Api.Task.moveDown(index);
    handleChange();
  }

  const toggleDropdown = (index) => {
    setVisibleDropDownIndex(index === visibleDropDownIndex ? null : index);
    setActiveButton(index === visibleDropDownIndex ? null : index);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      {(tasks && tasks?.length < 0) ? (
        <p className="text-center text-gray-500">هنوز تسکی اضافه نشده!</p>
      ) : (
        <ul className="space-y-4">
          {tasks?.map((task, index) => (
            <TaskItem
              key={task.id}
              task={task}
              index={task.id}
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

// import React, { useState, useEffect, useRef } from "react";
// import TaskItem from "./TaskItem";
// import Api from "../../services/Api";

// function TasksList({ handleChange }) {
//   const [tasks, setTasks] = useState([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const loaderRef = useRef(null);

//   const [visibleDropDownIndex, setVisibleDropDownIndex] = useState(null);
//   const [activeButton, setActiveButton] = useState(null);

//   const fetchTasks = async (pageNumber) => {
//     const res = await Api.Task.getAll(pageNumber);
//     if (!res) return;

//     if (res.content.length === 0) {
//       setHasMore(false);
//       return;
//     }

//     setTasks(prev => [...prev, ...res.content]);
//   };

//   useEffect(() => {
//     fetchTasks(page);
//   }, [page]);

//   // infinite scroll
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       entries => {
//         if (entries[0].isIntersecting && hasMore) {
//           setPage(prev => prev + 1);
//         }
//       },
//       { threshold: 1 }
//     );

//     if (loaderRef.current) observer.observe(loaderRef.current);

//     return () => observer.disconnect();
//   }, [hasMore]);

//   const doneTask = async (index) => {
//     await Api.Task.toggleDone(index);
//     handleChange();
//   };

//   const deleteTask = async (index) => {
//     await Api.Task.delete(index);
//     handleChange();
//   };

//   const moveUpTask = async (index) => {
//     await Api.Task.moveUp(index);
//     handleChange();
//   };

//   const moveDownTask = async (index) => {
//     await Api.Task.moveDown(index);
//     handleChange();
//   };

//   const toggleDropdown = (index) => {
//     setVisibleDropDownIndex(index === visibleDropDownIndex ? null : index);
//     setActiveButton(index === visibleDropDownIndex ? null : index);
//   };

//   return (
//     <div className="w-full max-w-7xl mx-auto p-4">
//       <ul className="space-y-4">
//         {tasks.map((task) => (
//           <TaskItem
//             key={task.id}
//             task={task}
//             index={task.id}
//             onDone={doneTask}
//             onDeleted={deleteTask}
//             onMoveUp={moveUpTask}
//             onMoveDown={moveDownTask}
//             onToggleDropdown={toggleDropdown}
//             visibleDropDownIndex={visibleDropDownIndex}
//             activeButton={activeButton}
//           />
//         ))}
//       </ul>

//       {hasMore && (
//         <div ref={loaderRef} className="text-center py-6 text-gray-500">
//           loading...
//         </div>
//       )}
//     </div>
//   );
// }

// export default TasksList;

