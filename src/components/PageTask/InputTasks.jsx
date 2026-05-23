import { useState, useRef, useEffect } from "react";

const InputTasks = ({ addTask, loading }) => {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const textareaRef = useRef(null);

    const ltr = newTaskTitle && !/^[\u0600-\u06FF]/.test(newTaskTitle)

    const autoResize = () => {
        const el = textareaRef.current
        if (!el) return

        el.style.height = "auto"
        el.style.height = el.scrollHeight + "px"
    }

    const handleInputChange = (e) => {
        setNewTaskTitle(e.target.value);
    };

    useEffect(() => {
        autoResize()
    }, [newTaskTitle])

    const handleAddBtn = () => {
        if (newTaskTitle.trim() !== "") {
            addTask(newTaskTitle);
            setNewTaskTitle("");
        }
    };

    return (
        <div className="w-full flex justify-center flex-wrap lg:p-1">
            <div className="flex items-center w-full sm:p-1 lg:max-w-3xl xl:max-w-3xl md:max-w-3xl sm:max-w-3xl bg-white rounded-full shadow-lg overflow-hidden 
                focus-within:outline-none focus-within:ring-4 focus-within:ring-orange-600/30 focus-within:border-orange-300
                focus-within:shadow-[0_0_0_6px_rgba(249,115,22,0.25)]">
                <button
                    className={`${loading ? "opacity-60 cursor-not-allowed" : ""} lg:w-16 lg:h-16 w-11 h-11 bg-orange-500 active:bg-orange-700 hover:bg-orange-600 text-white font-bold text-3xl lg:text-4xl
                      lg:m-1 sm:m-1 rounded-full shadow-md transition duration-300 ease-in-out 
                    flex items-center justify-center`}
                    onClick={handleAddBtn}
                >
                    {loading ? (
                        <span className="inline-block w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : (
                        "+"
                    )}
                </button>
                <textarea
                    ref={textareaRef}
                    rows={1}
                    className="flex-grow lg:px-6 sm:px-3 px-5 py-2 lg:mx-0 sm:mx-0 text-xl lg:text-3xl font-medium text-gray-700 placeholder-gray-400
                     border border-transparent rounded-3xl leading-relaxed resize-none bg-transparent outline-none overflow-hidden"
                    placeholder="چیکار باید بکنیم امروز؟"
                    dir={`${ltr ? "ltr" : "rtl"}`}
                    value={newTaskTitle}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault()
                            handleAddBtn()
                        }
                    }}
                />
            </div>
        </div >
    );
};

export default InputTasks;
