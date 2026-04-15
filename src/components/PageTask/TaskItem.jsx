import { useState } from 'react';
import TaskItemButtons from "./TaskItemButtons"
import ExpandLongText from '../../pages/home/components/ExpandLongText';
import { useDispatch } from 'react-redux';
import { getDeleteButton, expandIcons } from './TaskButtons';

function TaskItem({ task, onToggleDropdown, visibleDropDownIndex, activeButton }) {
    const titleLengthLimit = 90;
    const isTaskTextLong = task?.description?.length > titleLengthLimit;
    const [isExpand, setIsExpand] = useState(false);

    const dispatch = useDispatch();
    const deleteBtn = getDeleteButton(dispatch, task.id);

    return (
        <li
            className={`flex lg:w-11/12 w-full flex-row mx-auto justify-between my-4 p-3 rounded-xl bg-purple-50 shadow-lg hover:bg-purple-200 transition-all duration-300 ease-in-out transform hover:-translate-y-1`}>
            <div className='flex items-start gap-1.5 w-[15%]'>
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
                    <div className="absolute z-[100] sm:-left-6 lg:-left-16 lg:w-12 w-9 lg:h-12 h-9 lg:top-0 sm:top-3 rounded-full shadow-xl bg-white border border-gray-200 flex flex-col space-y-1">
                        <button
                            onClick={deleteBtn.onClick}
                            className="text-red-600 w-full h-full flex justify-center items-center rounded-full hover:bg-orange-100">
                            {deleteBtn.icon}
                        </button>
                    </div>
                )}
            </div>
            <div className="flex items-center flex-grow w-[10%]">
                <p
                    style={{
                        textDecoration: task.done ? "line-through" : "none",
                        color: task.done ? "#a0a0a0" : "#525252",
                        flexShrink: 1,
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                    }}
                    className="ml-5 mr-3 my-2 text-neutral-600 text-lg text-right font-medium whitespace-normal flex-grow"
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
