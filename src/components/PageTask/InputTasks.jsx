import { useState } from "react";

const InputTasks = ({ addTask }) => {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const ltr = newTaskTitle && !/^[\u0600-\u06FF]/.test(newTaskTitle)

    const handleInputChange = (e) => {
        setNewTaskTitle(e.target.value);
    };

    const handleAddBtn = () => {
        if (newTaskTitle.trim() !== "") {
            addTask(newTaskTitle);
            setNewTaskTitle("");
        }
    };

    return (
        <div className={`w-full flex justify-center flex-wrap lg:p-1`}>
            <div className="flex items-center w-full sm:p-1 lg:max-w-3xl xl:max-w-3xl md:max-w-3xl sm:max-w-3xl bg-white rounded-full shadow-lg overflow-hidden 
                     focus-within:outline-none focus-within:ring-4 focus-within:ring-orange-600/30 focus-within:border-orange-300
                     focus-within:shadow-[0_0_0_6px_rgba(249,115,22,0.25)]">
                <button
                    className="bg-orange-500 active:bg-orange-700 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50
                    text-white font-bold text-3xl lg:text-4xl
                    lg:py-5 lg:px-8 py-1 px-3.5 lg:m-2 sm:m-0.5 rounded-full shadow-md
                    transition duration-300 ease-in-out 
                    flex items-center justify-center
                    "
                    onClick={handleAddBtn}
                >
                    +
                </button>
                <input
                    type="text"
                    className="flex-grow lg:px-6 sm:px-3 px-5 py-1 lg:mx-0 sm:mx-0 text-xl lg:text-3xl font-medium text-gray-700 placeholder-gray-400
                     border border-transparent rounded-full
                     bg-transparent outline-none"
                    placeholder="چیکار باید بکنیم امروز؟"
                    dir={`${ltr ? "ltr" : "rtl"}`}
                    value={newTaskTitle}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleAddBtn();
                    }}
                />
            </div>
        </div >
    );
};

export default InputTasks;
