import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddTaskMessage, selectToken } from '../state'
import { useNavigate } from 'react-router-dom'
import { nanoid } from '@reduxjs/toolkit'

const AddTask = () => {

    const token = useSelector(selectToken)
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        DueDate: '',
        attachment: null,
        status: '',
        category: '',
    })

    const handleTaskChange = (e) => {
        const { name, value, type } = e.target
        setNewTask((prevTask) => {
            return{
                ...prevTask,
                [name]: type === 'file' ? e.target.files[0] : value
            }
        })
    }

    const clearFields = () => {
        setNewTask({
            title: '',
            description: '',
            DueDate: '',
            attachment: null,
            status: '',
            category: '',
        })
    }

    const handleFormSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        const formData = new FormData()
        formData.append('title', newTask.title)
        formData.append('description', newTask.description)
        formData.append('DueDate', newTask.DueDate)
        formData.append('attachment', newTask.attachment)
        formData.append('status', newTask.status)
        formData.append('category', newTask.category)

        if (newTask.title !== '' && newTask.description !== '' && newTask.DueDate !== '' && newTask.status !== '' && newTask.category !== '' ) {
            await axios.post('http://localhost:3500/tasks/add-task', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((res) => {
                Navigate('/')
                dispatch(AddTaskMessage({
                    id: nanoid(),
                    type: 'Success',
                    message: 'New task added'
                }))
                console.log(res.data);
            })
            .catch((err) => {
                dispatch(AddTaskMessage({
                    id: nanoid(),
                    type: 'Error',
                    message: 'Something went wrong!'
                }))
                console.log(err);
            })
        }else{
            dispatch(AddTaskMessage({
                id: nanoid(),
                type: 'Warning',
                message: "Please fill all fields"
            }))
        }

        setIsLoading(false)
    }

    useEffect(() => {
        console.log('newTask', newTask);
    }, [newTask])

  return (
    <div className=' px-8 py-10'>
        <div className=' bg-white rounded-xl px-10 py-8 '>
            <h1 className=' text-2xl text-start font-medium tracking-wider text-[#333333] mb-6'>Add Task</h1>
            <form action="" className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-2 place-content-center' encType='multipart/form-data' onSubmit={handleFormSubmit}>
                    <div className=' flex flex-col mb-4 w-full'>
                        <label className=' mb-4' htmlFor="title">Title</label>
                        <input className=' px-4 py-2 rounded-md bg-gray-100 outline-none text-[#333333] text-sm border-[2px] border-solid border-gray-200' type="text" name="title" id="" onChange={handleTaskChange} value={newTask.title} placeholder='Title ...' />
                    </div>

                    <div className=' flex flex-col mb-4 w-full'>
                        <label className=' mb-4' htmlFor="description">description</label>
                        <input className=' px-4 py-2 rounded-md bg-gray-100 outline-none text-[#333333] text-sm border-[2px] border-solid border-gray-200' type="text" name="description" onChange={handleTaskChange} value={newTask.description} id="" placeholder='Description ...' />
                    </div>

                    <div className=' flex flex-col mb-4 w-full'>
                        <label className=' mb-4' htmlFor="DueDate">Due Date</label>
                        <input className=' px-4 py-2 rounded-md bg-gray-100 outline-none text-[#333333] text-sm border-[2px] border-solid border-gray-200' type="date" name="DueDate" onChange={handleTaskChange} value={newTask.DueDate} id="" placeholder='Date...' />
                    </div>

                    <div className=' flex flex-col mb-4 w-full'>
                        <label className=' mb-4' htmlFor="attachment">Attachment</label>
                        <input className=' px-4 py-2 rounded-md bg-gray-100 outline-none text-[#333333] text-sm border-[2px] border-solid border-gray-200' type="file" name="attachment" id="" onChange={handleTaskChange} placeholder='Add attachment ...' />
                    </div>

                    <div className=' flex flex-col mb-4 w-full'>
                        <label className=' mb-4' htmlFor="">Status</label>
                        <select className='px-4 py-2 rounded-md bg-gray-100 outline-none  text-sm border-[2px] border-solid border-gray-200 font-medium textlg' name="status" onChange={handleTaskChange} value={newTask.status} id="">
                            <option className=' text-black font-medium' value="To Do">To Do</option>
                            <option className='text-black font-medium' value="In Progress">In Progress</option>
                            <option className='text-black font-medium' value="Completed">Completed</option>
                        </select>
                    </div>

                    <div className=' flex flex-col mb-4 w-full'>
                        <label className=' mb-4' htmlFor="category">Category</label>
                        <select className='px-4 py-2 rounded-md bg-gray-100 outline-none  text-sm border-[2px] border-solid border-gray-200 font-medium textlg' name="category" onChange={handleTaskChange} value={newTask.category} id="">
                            <option className=' text-black font-medium' value="High Priority">High Priority</option>
                            <option className='text-black font-medium' value="Medium Priority">Medium Priority</option>
                            <option className='text-black font-medium' value="Low Priority">Low Priority</option>
                        </select>
                    </div>

                    <button type='submit' className=' flex-4 bg-blue-500 tracking-wider shadow-lg px-4 py-2 rounded-md text-white font-medium'>{isLoading ? 'Loading...' : 'Submit'}</button>
                    <button type='button' className=' flex-4 bg-blue-950 tracking-wider shadow-lg px-4 py-2 rounded-md text-white font-medium' onClick={clearFields}>Clear</button>
            </form>
            
        </div>
    </div>
  )
}

export default AddTask