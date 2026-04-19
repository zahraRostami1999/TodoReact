import { createSlice } from "@reduxjs/toolkit";

export const TaskSlice = createSlice({
    name: "task",
    initialState: {
        tasks: []
    },
    reducers: {
        set_tasks: (state, action) => {
            state.tasks = action.payload;
        },
        append_tasks: (state, action) => {
            state.tasks = [...state.tasks, ...action.payload]
        },
        add_task: (state, action) => {
            state.tasks = [...state.tasks, action.payload]
        },
        done_task: (state, action) => {
            let taskId = action.payload;
            let tasks_list = [...state.tasks];
            state.tasks = tasks_list.map((task) => {
                if (task.id === taskId) return { ...task, done: !task.done }
                return task;
            })
        },
        delete_Task: (state, action) => {
            let taskId = action.payload;
            let tasks_list = [...state.tasks];
            state.tasks = tasks_list.filter((task) => task.id !== taskId)
        },
        move_up_task: (state, action) => {
            let taskId = action.payload;
            let taskIndex = state.tasks.findIndex((task) => task.id === taskId);

            if (taskIndex <= 0) {
                return;
            }
            const newItems = [...state.tasks];
            [newItems[taskIndex - 1], newItems[taskIndex]] = [newItems[taskIndex], newItems[taskIndex - 1]];
            state.tasks = newItems;
        },
        move_down_task: (state, action) => {
            let taskId = action.payload;
            let taskIndex = state.tasks.findIndex((task) => task.id === taskId);
            let lastIndex = state.tasks.length - 1;
            if (taskIndex >= lastIndex) {
                return;
            }
            const newItems = [...state.tasks];
            [newItems[taskIndex], newItems[taskIndex + 1]] = [newItems[taskIndex + 1], newItems[taskIndex]];
            state.tasks = newItems;
        }
    }
})

export const { set_tasks, append_tasks, add_task, done_task, delete_Task, move_up_task, move_down_task } = TaskSlice.actions;
