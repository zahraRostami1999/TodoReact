import { configureStore } from '@reduxjs/toolkit';
import { TaskSlice } from './TaskSlice';

export const Store = configureStore({
    reducer:{
        Task: TaskSlice.reducer,
    }
})