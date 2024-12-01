import { useState, useEffect } from "react";
import checkedImg from "../../assets/checked.png";
import binImg from '../../assets/bin.png';
import upImg from "../../assets/up.png";
import downImg from "../../assets/down.png";

function ToDo() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("Tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState({ title: "", done: false });
  const [visibleDropDownIndex, setVisibleDropDownIndex] = useState(null);
  const [activeButton, setActiveButton] = useState(null);

  useEffect(() => {
    localStorage.setItem("Tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, title: e.target.value });
  };

  const addTask = () => {
    if (newTask.title.trim() !== "") {
      setTasks((t) => [...t, newTask]);
      setNewTask({ title: "", done: false });
    }
  };

  const doneTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = true;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const topTask = (index) => {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  };

  const bottomTask = (index) => {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  };

  const toggleDropDown = (index) => {
    setVisibleDropDownIndex(visibleDropDownIndex === index ? null : index);
    setActiveButton(activeButton === index ? null : index);
  };


  return (
    <>
      <div className={`w-full flex justify-center pb-60  text-neutral-800`}>
        <div className={`mt-5 w-full flex justify-center flex-wrap`}>
          <div className="py-1 font-sans font-semibold flex justify-center flex-w sm:w-full md:w-11/12 lg:w-5/6">
            <div className="w-full sm:text-center xs:text-center md:text-left lg:text-left">
              <h1 className="sm:text-2xl md:text-2xl lg:text-3xl font-bold">Xanim Qiz To-Do List</h1>
              <h2 className="sm:text-xl md:text-xl lg:text-2xl font-semibold">Just Do It Babe 🥰</h2>
            </div>

          </div>
          <div className="py-1 w-full flex flex-wrap items-start absolute top-24 pb-20">
            <div className="w-full flex justify-center h-10 text-neutral-700  ">
              <div className=" xs:w-11/12 sm:w-11/12 md:w-9/12 lg:w-9/12 xl:w-10/12 flex rounded-full overflow-hidden shadow-zinc-600 shadow-md focus-within:outline focus-within:outline-blackBg">
                <div className="w-11/12 ">
                  <input type="text" className="w-full h-full outline-none bg-orange-100   px-4 text-lg" placeholder="Add your new task..."
                    value={newTask.title}
                    onChange={handleInputChange} />
                </div>
                <div className="md:w-1/12 sm:w-2/12 xs:w-2/12 flex justify-center font-bold items-center bg-orange-500 active:bg-orange-600" onClick={addTask}>
                  <button>+</button>
                </div>
              </div>
            </div>
            <div className=" w-full flex justify-center items-start mt-20  h-full ">
              <ol className={`w-11/12 min-h-10 mb-20  px-5 py-6 rounded-md bg-blackBg shadow-xl shadow-gray-400 `}>
                {tasks.length === 0 ? <p className="text-center font-bold">✨Your Tasks Place✨</p> : <p></p>}
                {tasks.map((task, index) => (
                  <li
                    key={index}
                    className="flex justify-between my-2.5 rounded-full bg-orange-100 shadow-zinc-400 shadow-md sm:px-2 py-1 relative hover:scale-x-105 transition-all duration-300">
                    <div className="w-5/6 flex mt">
                      <span>💫</span>
                      <p
                        style={{
                          textDecoration: task.done ? "line-through" : "none",
                        }}
                        className="text-base font-medium sm:w-1/2 w-11/12 break-words whitespace-normal"
                      >
                        {task.title}
                      </p>
                    </div>
                    <div
                      className={` flex justify-center items-center rounded-full  ${activeButton === index
                        ? "bg-orange-400 hover:text-zinc-100 text-zinc-100"
                        : "text-purple-800 hover:text-purple-950"
                        } px-2.5 cursor-pointer relative`}
                      onClick={() => toggleDropDown(index)}
                    >
                      ⫶
                    </div>
                    {visibleDropDownIndex === index && (
                      <div className=" w-8 absolute sm:-right-8 -top-6 mt-6 rounded-full shadow-2xl shadow-gray-100  bg-nu-200" >
                        <ul className="">
                          <li
                            className="px-2 py-1 hover:bg-orange-300 cursor-pointer rounded-md"
                            onClick={() => {
                              doneTask(index);
                              toggleDropDown(null);
                            }}
                          >
                            <img src={checkedImg} alt="" />
                          </li>
                          <li
                            className="px-2 py-1 hover:bg-orange-300 cursor-pointer rounded-md"
                            onClick={() => {
                              deleteTask(index);
                              toggleDropDown(null);
                            }}
                          >
                            <img src={binImg} alt="" />
                          </li>
                          <li
                            className="px-2 py-1 hover:bg-orange-300 cursor-pointer rounded-md"
                            onClick={() => {
                              topTask(index);
                              toggleDropDown(null);
                            }}
                          >
                            <img src={upImg} alt="" />
                          </li>
                          <li
                            className="px-2 py-1 hover:bg-orange-300 cursor-pointer rounded-md"
                            onClick={() => {
                              bottomTask(index);
                              toggleDropDown(null);
                            }}
                          >
                            <img src={downImg} alt="" />
                          </li>
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div >
      </div>
    </>
  );
}

export default ToDo;
