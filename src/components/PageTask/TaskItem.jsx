import { useState } from 'react';
import checkedImg from "../../assets/checked.png"
import binImg from '../../assets/bin.png';
import upImg from "../../assets/up.png";
import downImg from "../../assets/down.png";
import ExpandLongText from '../../pages/home/components/ExpandLongText';
import { BsDash, BsPlus } from "react-icons/bs";


function TaskItem({ task, index, onDone, onDeleted, onMoveUp, onMoveDown, onToggleDropdown, visibleDropDownIndex, activeButton }) {
    const titleLengthLimit = 90;
    const [isHovered, setIsHovered] = useState(false);
    const isTaskTextLong = task.description.length > titleLengthLimit;
    const [isExpand, setIsExpand] = useState(false);

    return (
        <li
            key={index}
            className={`flex w-11/12 flex-row mx-auto justify-between my-4 p-3 rounded-xl bg-orange-50 shadow-lg hover:bg-orange-200 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                         `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className='flex items-start gap-1.5 w-[15%]'>
                <div className='flex items-center gap-1.5'>
                    <button
                        className={`flex justify-center items-center w-6 h-8 relative text-[22px] px-4 py-1 rounded-full cursor-pointer transition-colors duration-300
          ${activeButton === index
                                ? "bg-orange-400 text-white"
                                : "text-purple-800 hover:bg-purple-100"}
        `}
                        onClick={() => onToggleDropdown(index)}
                    >
                        ⫶
                    </button>
                    {isTaskTextLong && (
                        <button className='w-[25px] h-[25px]  transition-all duration-300 cursor-pointer flex items-center justify-center font-bold bg-purple-600 rounded-full text-white text-2xl'
                            onClick={() => setIsExpand(!isExpand)}>
                            {isExpand ? (<BsDash />) : (<BsPlus />)}
                        </button>
                    )}
                    <div
                        className="py-2 hover:scale-105 transition-all duration-300 cursor-pointer rounded-b-full flex items-center space-x-2"
                        onClick={() => {
                            onMoveDown(index);
                            onToggleDropdown(null);
                        }}
                    >
                        <img src={downImg} alt="Move Down" className="w-7 h-7" />
                    </div>
                    <div
                        className="py-2 hover:scale-105 transition-all duration-300 cursor-pointer flex items-center space-x-2"
                        onClick={() => {
                            onMoveUp(index);
                            onToggleDropdown(null);
                        }}
                    >
                        <img src={upImg} alt="Move Up" className="w-7 h-7" />
                    </div>
                    <div
                        className="py-2 hover:scale-105 transition-all duration-300 cursor-pointer rounded-t-full flex items-center space-x-2"
                        onClick={() => {
                            onDone(index);
                            onToggleDropdown(null);
                        }}
                    >
                        <img src={checkedImg} alt="Done" className="w-[25px] h-[25px]" />
                    </div>
                </div>

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
                    className="ml-5 mr-3 my-2 text-neutral-600 text-lg text-right font-medium 
                               whitespace-normal flex-grow"
                >
                    {
                        isTaskTextLong ? (<ExpandLongText max_char={titleLengthLimit} text={task.description} is_expand={isExpand} handleClickIsExpand={(expand) => setIsExpand(!expand)} />) :
                            task.description
                    }
                </p>
            </div>



            {visibleDropDownIndex === index && (
                <div className="absolute z-100 sm:-right-12 lg:-left-16 w-12 top-0 mt-2 rounded-full shadow-xl bg-white border border-gray-200 flex flex-col space-y-1">

                    <div
                        className="py-2 justify-center hover:bg-orange-300 cursor-pointer rounded-md flex items-center space-x-2"
                        onClick={() => {
                            onDeleted(index);
                            onToggleDropdown(null);
                        }}
                    >
                        <img src={binImg} alt="Delete" className="w-7 h-7" />
                    </div>
                </div>
            )}
        </li>
    );
}

export default TaskItem;
