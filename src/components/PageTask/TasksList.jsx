import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import EmptyTasksList from "./EmptyTasksList";
function TasksList({ hasMore, onLoadMore, loadingMore }) {
  const tasks_list = useSelector((state) => state.task.tasks);
  const [visibleDropDownIndex, setVisibleDropDownIndex] = useState(null);
  const loaderRef = useRef(null);

  const toggleDropdown = (index) => {
    setVisibleDropDownIndex(index === visibleDropDownIndex ? null : index);
  };

  useEffect(() => {
    if (loadingMore) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          onLoadMore();
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();

  }, [hasMore, loadingMore]);

  return (
    <div className="w-full max-w-6xl mx-auto lg:p-4 p-1">
      {(!tasks_list || tasks_list.length === 0) ? (
        <EmptyTasksList />
      ) : (
        <ul className="space-y-4">
          {tasks_list?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleDropdown={toggleDropdown}
              visibleDropDownIndex={visibleDropDownIndex}
            />
          ))}
        </ul>
      )}
      {
        hasMore && !loadingMore && (
          <div ref={loaderRef} className="flex justify-center py-8">
            <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          </div>
        )
      }
    </div >
  );
}

export default TasksList;
