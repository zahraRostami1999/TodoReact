import { useState, useEffect } from 'react';
import ExpandLongText from '../../pages/home/components/ExpandLongText';
import { useDispatch } from 'react-redux';
import TaskItemButtons from "./TaskItemButtons"
import { getDeleteButton, expandIcons } from './TaskButtons';

function TaskItem({ task, onToggleDropdown, visibleDropDownIndex }) {
    const [titleLengthLimit, setTitleLengthLimit] = useState(85);
    const [isExpand, setIsExpand] = useState(false);
    const ltr = task.description && !/^[\u0600-\u06FF]/.test(task.description.trim());
    const [loadingBtnKey, setLoadingBtnKey] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setTitleLengthLimit(25);
            } else if (window.innerWidth < 1024) {
                setTitleLengthLimit(40);
            } else {
                setTitleLengthLimit(95);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isTaskTextLong = task?.description?.length > titleLengthLimit;

    const dispatch = useDispatch();
    const deleteBtn = getDeleteButton(dispatch, task.id, setLoadingBtnKey);

    return (
        <li
            className={`flex lg:w-11/12 w-full ${isExpand ? "flex-col" : "flex-row sm:flex-col"} mx-auto justify-between my-4 lg:p-3 p-1.5 rounded-2xl bg-purple-50 shadow-lg lg:hover:bg-purple-200 sm:active:bg-purple-200 transition-all duration-300 ease-in-out transform lg:hover:-translate-y-1`}>
            <div className='flex items-center gap-1.5 lg:w-[17%] sm:w-[50%]'>
                <div className='flex items-center' dir='rtl'>
                    <TaskItemButtons taskId={task.id} dropdown={() => onToggleDropdown(task.id)} />
                </div>
                {isTaskTextLong && (
                    <button
                        onClick={() => setIsExpand(!isExpand)}
                        className="text-red-600 p-2 flex justify-center items-start rounded-full lg:hover:bg-orange-100 sm:active:bg-orange-100">
                        {isExpand ? expandIcons.collapse : expandIcons.expand}
                    </button>
                )}

                {visibleDropDownIndex === task.id && (
                    <div className="absolute z-[100] sm:-left-5 sm:top-6 lg:-left-12 lg:w-10 w-9 lg:h-10 h-9 lg:top-2 rounded-full shadow-xl bg-white border border-gray-200 flex flex-col space-y-1">
                        <button
                            key="delete"
                            onClick={deleteBtn.onClick}
                            disabled={loadingBtnKey === "delete"}
                            className={`${loadingBtnKey === "delete" ? "opacity-60 cursor-not-allowed" : ""}text-red-600 w-full h-full flex justify-center items-center rounded-full lg:hover:bg-orange-100 sm:active:bg-orange-100`}>
                            {loadingBtnKey === "delete" ? (
                                <span className="inline-block w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            ) : (
                                deleteBtn.icon
                            )}
                        </button>
                    </div>
                )}
            </div>
            <div className={`flex items-center flex-grow w-full mr-2 sm:px-3`}
                dir={ltr ? "ltr" : "rtl"}>
                <p
                    style={{
                        textDecoration: task.done ? "line-through" : "none",
                        color: task.done ? "#a0a0a0" : "#525252",
                        flexShrink: 1,
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                    }}
                    className=" my-2 text-neutral-600 text-lg font-medium whitespace-normal flex-grow"
                >
                    {isTaskTextLong
                        ? (
                            <ExpandLongText
                                max_char={titleLengthLimit}
                                text={task.description}
                                is_expand={isExpand}
                                handleClickIsExpand={(expand) => setIsExpand(!expand)}
                                dir={ltr ? "ltr" : "rtl"}
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
