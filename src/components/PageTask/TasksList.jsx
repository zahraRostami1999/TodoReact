import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import EmptyTasksList from "./EmptyTasksList";
function TasksList({ handleChange, hasMore, onLoadMore }) {
  const tasks_list = useSelector((state) => state.task.tasks);
  const [visibleDropDownIndex, setVisibleDropDownIndex] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const loaderRef = useRef(null);
  console.log(tasks_list);

  const toggleDropdown = (index) => {
    setVisibleDropDownIndex(index === visibleDropDownIndex ? null : index);
    setActiveButton(index === visibleDropDownIndex ? null : index);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          onLoadMore();
        }
      },
      // see all of thing
      { threshold: 1 }
    );
    //set observer
    if (loaderRef.current) observer.observe(loaderRef.current);
    // clear 
    return () => observer.disconnect();
  }, [hasMore, onLoadMore]);

  return (
    <div className="w-full lg:max-w-7xl max-w-9xl mx-auto lg:p-4 p-1">
      {(!tasks_list || tasks_list.length === 0) ? (
        <EmptyTasksList />
      ) : (
        <ul className="space-y-4">
          {tasks_list?.map((task, index) => (
            <TaskItem
              key={task.id}
              task={task}
              index={index}
              handleChange={handleChange}
              onToggleDropdown={toggleDropdown}
              visibleDropDownIndex={visibleDropDownIndex}
              activeButton={activeButton}
            />
          ))}
        </ul>
      )}
      {
        hasMore && (
          <div ref={loaderRef} className="flex justify-center items-center py-8 gap-3">
            <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          </div>
        )
      }
    </div >
  );
}

export default TasksList;
