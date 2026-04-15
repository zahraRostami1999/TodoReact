// import { configureStore } from '@reduxjs/toolkit';
// import { TaskSlice } from './TaskSlice';

// export const Store = configureStore({
//     reducer:{
//         task: TaskSlice.reducer,
//     }
// })

import {configureStore} from "@reduxjs/toolkit";
import {TaskSlice} from "./TaskSlice";

export const Store = configureStore({
    reducer: {
        task: TaskSlice.reducer
    }
})