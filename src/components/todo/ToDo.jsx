import { useState, useEffect } from "react";
import checkedImg from "../../assets/checked.png";
import binImg from '../../assets/bin.png';
import upImg from "../../assets/up.png";
import downImg from "../../assets/down.png";

// todo: loading - verify inputs

function ToDo() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("Tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // title of new task
  const [newTask, setNewTask] = useState({ title: "", status: false });
  const [visibleDropDownIndex, setVisibleDropDownIndex] = useState(null);
  const [activeButton, setActiveButton] = useState(null);

  useEffect(() => {
    localStorage.setItem("Tasks", JSON.stringify(tasks));
  }, [tasks]);


  const doneTask = (index) => {
    // copy of tasks
    const updatedTasks = [...tasks];
    // change special task status
    updatedTasks[index].status = true;
    // save change
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
      <div className='w-full min-h-screen overflow-hidden text-neutral-800 bg-gradient-to-br from-purple-50 to-purple-400'>
        <div className='flex flex-col gap-10 h-full overflow-hidden p-5'>
          
          <main>
            <div className=''>
              <div className=" w-full flex justify-center items-center ">
                <ol className={`flex-1 overflow-y-auto h-[55vh] mt-7 custom-scrollbar w-10/12 px-5 pt-0 pb-6 rounded-lg bg-blackBg shadow-xl shadow-gray-400 `}>
                  {tasks.length === 0 ? <div className="text-center font-bold lg:text-2xl flex items-center justify-center h-full">✨Your Tasks Place✨</div> : <p></p>}
                  {tasks.map((task, index) => (
                    <li
                      key={index}
                      className="flex w-11/12 mx-auto justify-between my-6 rounded-full bg-orange-100 shadow-zinc-400 shadow-md sm:px-2 py-3 relative hover:bg-orange-200 transition-all duration-300">
                      <div className="w-5/6 flex mt">
                        <span>💫</span>
                        <p
                          style={{
                            textDecoration: task.status ? "line-through" : "none",
                          }}
                          className="ml-3 text-lg font-medium sm:w-1/2 w-11/12 break-words whitespace-normal"
                        >
                          {task.title}
                        </p>
                      </div>
                      <div
                        className={` flex justify-center items-center px-3 py-0.5 rounded-full text-xl  ${activeButton === index
                          ? "bg-orange-400 hover:text-zinc-100 text-zinc-100"
                          : "text-purple-800 hover:text-purple-950"
                          }  cursor-pointer relative`}
                        onClick={() => toggleDropDown(index)}
                      >
                        ⫶
                      </div>
                      {visibleDropDownIndex === index && (
                        <div className=" lg:w-12 sm:w-9 md:w-9 absolute z-50 sm:-right-10 lg:-right-12 -top-6 mt-6 rounded-full shadow-2xl shadow-gray-100  bg-neutral-200" >
                          <ul className="">
                            <li
                              className="px-2 py-1 hover:bg-orange-300 cursor-pointer rounded-full"
                              onClick={() => {
                                doneTask(index);
                                toggleDropDown(null);
                              }}
                            >
                              <img src={checkedImg} alt="" />
                            </li>
                            <li
                              className="px-2 py-1 hover:bg-orange-300 cursor-pointer rounded-full"
                              onClick={() => {
                                deleteTask(index);
                                toggleDropDown(null);
                              }}
                            >
                              <img src={binImg} alt="" />
                            </li>
                            <li
                              className="px-2 py-1 hover:bg-orange-300 cursor-pointer rounded-full"
                              onClick={() => {
                                topTask(index);
                                toggleDropDown(null);
                              }}
                            >
                              <img src={upImg} alt="" />
                            </li>
                            <li
                              className="px-2 py-1 hover:bg-orange-300 cursor-pointer rounded-full"
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
          </main>
        </div>
      </div>
    </>
  );
}

export default ToDo;
