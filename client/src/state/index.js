import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('tasks')) || {
    token: '',
    user:{},
    taskMessages: []
}

const taskSlice = createSlice({
    initialState,
    name: 'tasks',
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
            localStorage.setItem('tasks', JSON.stringify(state))
            return state
        },

        setUser: (state, action) => {
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(state))
            return state
        },

        AddTaskMessage: (state, action) => {
            state.taskMessages = [...state.taskMessages, action.payload]
            localStorage.setItem('tasks', JSON.stringify(state))
            return state
        },

        removeTaskMessage: (state, action) => {
            state.taskMessages = state.taskMessages.filter(message => message.id !== action.payload)
            localStorage.setItem('tasks', JSON.stringify(state))
            return state
        },

        clearTaskMessages: (state, action) => {
            state.taskMessages = []
            localStorage.setItem('tasks', JSON.stringify(state))
            return state
        }
    }
})

export const selectToken = (state) => state.task.token
export const selectUser = (state) => state.task.user
export const selectTaskMessages = (state) => state.task.taskMessages
export const { setToken, setUser, AddTaskMessage, removeTaskMessage, clearTaskMessages } = taskSlice.actions
export default taskSlice.reducer