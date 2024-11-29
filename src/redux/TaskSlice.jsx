import { createSlice } from "@reduxjs/toolkit";

export const TaskSlice = createSlice({
    name: 'Task',
    initialState: {
        newTask: '',
        tasks: []
    },
    reducers: {
        setNewTask: (state, action) => {
            state.newTask = action.payload;
        },
        addNewTask: (state) => {
            if (state.newTask.trim() !== "") {
                const newTaskObj = {
                    title: state.newTask,
                    isDone: false
                }
                const duplicate = state.tasks.find(task => task.title === newTaskObj.title);
                if (!duplicate) {
                    state.tasks = [...state.tasks, newTaskObj];
                }else{
                    alert("Task is already added!");
                }
            }
            state.newTask = "";
            localStorage.setItem("TasksList", JSON.stringify(state.tasks));
        }
    }
})


export const { setNewTask, addNewTask } = TaskSlice.actions;