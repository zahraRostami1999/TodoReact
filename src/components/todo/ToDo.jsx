// import { useState, useEffect } from "react";
// import checkedImg from "../../assets/checked.png";
// import binImg from '../../assets/bin.png';
// import upImg from "../../assets/up.png";
// import downImg from "../../assets/down.png";

// function ToDo() {
//   const [tasks, setTasks] = useState(() => {
//     const savedTasks = localStorage.getItem("Tasks");
//     return savedTasks ? JSON.parse(savedTasks) : [];
//   });
//   const [newTask, setNewTask] = useState({ title: "", done: false });
//   const [visibleDropDownIndex, setVisibleDropDownIndex] = useState(null);
//   const [activeButton, setActiveButton] = useState(null);
//   const [theme, setTheme] = useState(true);


//   useEffect(() => {
//     localStorage.setItem("Tasks", JSON.stringify(tasks));
//   }, [tasks]);

//   const handleInputChange = (e) => {
//     setNewTask({ ...newTask, title: e.target.value });
//   };

//   const addTask = () => {
//     if (newTask.title.trim() !== "") {
//       setTasks((t) => [...t, newTask]);
//       setNewTask({ title: "", done: false });
//     }
//   };

//   const doneTask = (index) => {
//     const updatedTasks = [...tasks];
//     updatedTasks[index].done = true;
//     setTasks(updatedTasks);
//   };

//   const deleteTask = (index) => {
//     const updatedTasks = tasks.filter((_, i) => i !== index);
//     setTasks(updatedTasks);
//   };

//   const topTask = (index) => {
//     if (index > 0) {
//       const updatedTasks = [...tasks];
//       [updatedTasks[index], updatedTasks[index - 1]] = [
//         updatedTasks[index - 1],
//         updatedTasks[index],
//       ];
//       setTasks(updatedTasks);
//     }
//   };

//   const bottomTask = (index) => {
//     if (index < tasks.length - 1) {
//       const updatedTasks = [...tasks];
//       [updatedTasks[index], updatedTasks[index + 1]] = [
//         updatedTasks[index + 1],
//         updatedTasks[index],
//       ];
//       setTasks(updatedTasks);
//     }
//   };

//   const toggleDropDown = (index) => {
//     setVisibleDropDownIndex(visibleDropDownIndex === index ? null : index);
//     setActiveButton(activeButton === index ? null : index);
//   };


//   const handleGrayTheme = ()=>{
//     setTheme(false);
//   }

//   const handleBlueTheme = ()=>{
//     setTheme(true);
//   }

//   return (
//     <>
//       <div className={`mt-5 mb-24 sm:w-10/12 md:w-3/4 h-screen ${setTheme ? "bg-gradient-to-br from-blue-200 to-blue-700 ": "bg-gradient-to-br from-neutral-200 to-neutral-700 "}`}>
//         <div className="py-1 font-sans font-semibold flex justify-between">
//           <div>
//             <h1 className="sm:text-center sm:text-2xl md:text-left font-bold">Xanim Qiz To-Do List</h1>
//             <h2 className="sm:text-center sm:text-xl md:text-left font-semibold">Just Do It Babe 🥰</h2>
//           </div>
//           <div className="w-20 h-8 flex justify-around items-center">
//             <div className="w-5 h-5 rounded-full bg-neutral-500" onClick={()=>handleGrayTheme()}></div>
//             <div className="w-5 h-5 rounded-full bg-blue-500" onClick={()=>handleBlueTheme()}></div>
//             <div></div>
//           </div>
//         </div>


//         <div className="py-1 mt-7">
//           <div className="w-full flex justify-center h-10 text-neutral-700">
//             <div className="w-11/12 flex rounded-full overflow-hidden">
//               <div className="w-11/12 ">
//                 <input type="text" className="w-full h-full outline-none bg-orange-100  focus-within:border-gray-400 px-4 text-lg" placeholder="Add your new task..."
//                   value={newTask.title}
//                   onChange={handleInputChange} />
//               </div>
//               <div className="w-1/12 flex justify-center items-center bg-orange-500 active:bg-orange-600" onClick={addTask}>
//                 <button>+</button>
//               </div>
//             </div>

//           </div>
//           <div className="my-5 mx-2 ">
//             <ol>
//               {tasks.map((task, index) => (
//                 <li
//                   key={index}
//                   className="border flex justify-between mt-2.5 rounded-[10px] border-solid border-white shadow-zinc-600 shadow-md sm:px-2 py-1 relative">
//                   <p
//                     style={{
//                       textDecoration: task.done ? "line-through" : "none",
//                     }}
//                     className="text-base font-medium w-11/12 break-words whitespace-normal"
//                   >
//                     {task.title}
//                   </p>
//                   <div
//                     className={` flex justify-center items-center rounded-full  ${activeButton === index
//                       ? "bg-zinc-800 hover:bg-blue-600 text-zinc-200"
//                       : "bg-zinc-200 hover:bg-gray-600"
//                       } px-2.5 cursor-pointer relative`}
//                     onClick={() => toggleDropDown(index)}
//                   >
//                     ⫶
//                   </div>
//                   {visibleDropDownIndex === index && (
//                     <div className="bg-zinc-800 w-8 absolute -right-11 -top-6 mt-6 rounded-md shadow-lg " >
//                       <ul className="">
//                         <li
//                           className="px-2 py-1 hover:bg-gray-300 cursor-pointer rounded-md"
//                           onClick={() => {
//                             doneTask(index);
//                             toggleDropDown(null);
//                           }}
//                         >
//                           <img src={checkedImg} alt="" />
//                         </li>
//                         <li
//                           className="px-2 py-1 hover:bg-gray-300 cursor-pointer rounded-md"
//                           onClick={() => {
//                             deleteTask(index);
//                             toggleDropDown(null);
//                           }}
//                         >
//                           <img src={binImg} alt="" />
//                         </li>
//                         <li
//                           className="px-2 py-1 hover:bg-gray-300 cursor-pointer rounded-md"
//                           onClick={() => {
//                             topTask(index);
//                             toggleDropDown(null);
//                           }}
//                         >
//                           <img src={upImg} alt="" />
//                         </li>
//                         <li
//                           className="px-2 py-1 hover:bg-gray-300 cursor-pointer rounded-md"
//                           onClick={() => {
//                             bottomTask(index);
//                             toggleDropDown(null);
//                           }}
//                         >
//                           <img src={downImg} alt="" />
//                         </li>
//                       </ul>
//                     </div>
//                   )}
//                 </li>
//               ))}
//             </ol>
//           </div>
//         </div>
//       </div >
//     </>
//   );
// }

// export default ToDo;
