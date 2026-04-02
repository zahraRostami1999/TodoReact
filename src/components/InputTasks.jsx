import { useState } from "react";

const InputTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const ltr = newTaskTitle && !/^[\u0600-\u06FF]/.test(newTaskTitle)

    const handleInputChange = (e) => {
        setNewTaskTitle(e.target.value);
    };

    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            setTasks((prevTasks) => [...prevTasks, { title: newTaskTitle, status: false }]);
            setNewTaskTitle("");
        }
    };

    return (
        <div className={`w-full flex justify-center flex-wrap p-1`} dir={ltr ? "rtl" : "ltr"}>
            <div className="flex items-center w-full lg:max-w-3xl xl:max-w-3xl md:max-w-3xl sm:max-w-2xl bg-white rounded-full shadow-lg overflow-hidden 
                     focus-within:outline-none focus-within:ring-4 focus-within:ring-orange-600/30 focus-within:border-orange-300
                     focus-within:shadow-[0_0_0_6px_rgba(249,115,22,0.25)]">
                <button
                    className="bg-orange-500 active:bg-orange-700 hover:bg-orange-600 text-white font-bold py-4 px-7 rounded-full transition duration-300 ease-in-out flex items-center justify-center text-3xl lg:text-4xl shadow-md
                     focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 m-2"
                    onClick={addTask}
                >
                    +
                </button>
                <input
                    type="text"
                    className="flex-grow px-6 py-1 text-xl lg:text-3xl font-medium text-gray-700 placeholder-gray-400
                     border border-transparent rounded-full
                     bg-transparent outline-none"
                    placeholder="چیکار باید بکنیم امروز؟"
                    dir={`${ltr ? "ltr" : "rtl"}`}
                    value={newTaskTitle}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") addTask();
                    }}
                />
            </div>
        </div >
    );
};

export default InputTasks;
