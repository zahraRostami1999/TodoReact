import React, { useState } from 'react';
import checkedImg from "../assets/checked.png"
import binImg from '../assets/bin.png';
import upImg from "../assets/up.png";
import downImg from "../assets/down.png";

function TaskItem({ task, index, onDone, onDeleted, onMoveUp, onMoveDown, onToggleDropdown, visibleDropDownIndex, activeButton }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <li
            key={index}
            className={`flex w-11/12 mx-auto justify-between my-4 px-3 py-4 relative rounded-xl bg-orange-50 shadow-lg hover:bg-orange-200 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                         `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <button
                className={`flex justify-center items-start text-2xl px-3.5 py-1 rounded-full cursor-pointer transition-colors duration-300
          ${activeButton === index
                        ? "bg-orange-400 text-white"
                        : "text-purple-800 hover:bg-purple-100"}
        `}
                onClick={() => onToggleDropdown(index)}
            >
                ⫶
            </button>
            <div className="flex items-start flex-grow"> 
                
                <p
                    style={{
                        textDecoration: task.status ? "line-through" : "none",
                        color: task.status ? "#a0a0a0" : "#333",
                        flexShrink: 1, 
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word', 
                    }}
                    className="ml-3 text-lg text-right font-medium 
                               whitespace-normal flex-grow" 
                >
                    {task.title}
                </p>
                <span className="text-2xl mr-3 flex-shrink-0">💫</span> 
            </div>



            {visibleDropDownIndex === index && (
                <div className="absolute z-100 sm:-right-12 lg:right-80 -top-10 mt-2 rounded-full shadow-xl bg-white border border-gray-200 flex flex-col space-y-1">
                    <div
                        className="px-3 py-2 hover:bg-orange-300 cursor-pointer rounded-t-full flex items-center space-x-2"
                        onClick={() => {
                            onDone(index);
                            onToggleDropdown(null);
                        }}
                    >
                        <img src={checkedImg} alt="Done" className="w-8 h-8" />
                    </div>
                    <div
                        className="px-3 py-2 hover:bg-orange-300 cursor-pointer rounded-md flex items-center space-x-2"
                        onClick={() => {
                            onDeleted(index);
                            onToggleDropdown(null);
                        }}
                    >
                        <img src={binImg} alt="Delete" className="w-8 h-8" />
                    </div>
                    <div
                        className="px-3 py-2 hover:bg-orange-300 cursor-pointer rounded-md flex items-center space-x-2"
                        onClick={() => {
                            onMoveUp(index);
                            onToggleDropdown(null);
                        }}
                    >
                        <img src={upImg} alt="Move Up" className="w-8 h-8" />
                    </div>
                    <div
                        className="px-3 py-2 hover:bg-orange-300 cursor-pointer rounded-b-full flex items-center space-x-2"
                        onClick={() => {
                            onMoveDown(index);
                            onToggleDropdown(null);
                        }}
                    >
                        <img src={downImg} alt="Move Down" className="w-8 h-8" />
                    </div>
                </div>
            )}
        </li>
    );
}

export default TaskItem;
