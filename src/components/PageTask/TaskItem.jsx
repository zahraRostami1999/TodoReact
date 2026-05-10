import { useState, useEffect } from 'react';
import ExpandLongText from '../../pages/home/components/ExpandLongText';
import { useDispatch } from 'react-redux';
import TaskItemButtons from "./TaskItemButtons"
import { getDeleteButton, expandIcons } from './TaskButtons';

function TaskItem({ task, onToggleDropdown, visibleDropDownIndex }) {
    const [titleLengthLimit, setTitleLengthLimit] = useState(85);
    const [isExpand, setIsExpand] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setTitleLengthLimit(16);
            } else if (window.innerWidth < 1024) {
                setTitleLengthLimit(40);
            } else {
                setTitleLengthLimit(85);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isTaskTextLong = task?.description?.length > titleLengthLimit;

    const dispatch = useDispatch();
    const deleteBtn = getDeleteButton(dispatch, task.id);

    return (
        <li
            className={`flex lg:w-11/12 w-full ${isExpand ? "flex-col" : "flex-row"} mx-auto justify-between my-4 lg:p-3 p-1.5 rounded-2xl bg-purple-50 shadow-lg hover:bg-purple-200 transition-all duration-300 ease-in-out transform hover:-translate-y-1`}>
            <div className='flex items-center gap-1.5 lg:w-[17%] sm:w-[50%]'>
                <div className='flex items-center' dir='rtl'>
                    <TaskItemButtons taskId={task.id} dropdown={() => onToggleDropdown(task.id)} />
                </div>
                {isTaskTextLong && (
                    <button
                        onClick={() => setIsExpand(!isExpand)}
                        className="text-red-600 p-2 flex justify-center items-start rounded-full hover:bg-orange-100">
                        {isExpand ? expandIcons.collapse : expandIcons.expand}
                    </button>
                )}

                {visibleDropDownIndex === task.id && (
                    <div className="absolute z-[100] sm:-left-5 sm:top-6 lg:-left-16 lg:w-12 w-9 lg:h-12 h-9 lg:top-0 rounded-full shadow-xl bg-white border border-gray-200 flex flex-col space-y-1">
                        <button
                            onClick={deleteBtn.onClick}
                            className="text-red-600 w-full h-full flex justify-center items-center rounded-full hover:bg-orange-100">
                            {deleteBtn.icon}
                        </button>
                    </div>
                )}
            </div>
            <div className={`flex items-center flex-grow w-full mr-2 
            ${isTaskTextLong ?
                    isExpand ? "xl:ml-0 lg:ml-0"
                        : "xl:ml-5"
                    : "xl:ml-5 lg:ml-5"}`}>
                <p
                    style={{
                        textDecoration: task.done ? "line-through" : "none",
                        color: task.done ? "#a0a0a0" : "#525252",
                        flexShrink: 1,
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                    }}
                    className=" my-2 text-neutral-600 text-lg text-right font-medium whitespace-normal flex-grow"
                >
                    {isTaskTextLong
                        ? (
                            <ExpandLongText
                                max_char={titleLengthLimit}
                                text={task.description}
                                is_expand={isExpand}
                                handleClickIsExpand={(expand) => setIsExpand(!expand)}
                            />
                        )
                        : task.description
                    }
                </p>
            </div>


        </li>
    );
}

export default TaskItem;
