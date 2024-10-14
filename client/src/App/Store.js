import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../state/index"

export const Store = configureStore({
    reducer:{
        task: taskReducer
    }
})