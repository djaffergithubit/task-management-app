import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddTaskMessage, selectToken } from '../state'
import { useParams } from 'react-router-dom'
import { useTask } from '../api/task'
import { socket } from '../socket/socket'
import { nanoid } from '@reduxjs/toolkit'

const EditTask = () => {

    const token = useSelector(selectToken)
    const { taskId } = useParams()
    const {task, attachment} = useTask(taskId, token)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [formattedDate, setFormattedDueDate] = useState('')
    const [editedTask, setEditedTask] = useState({
        title: '',
        description: '',
        DueDate: '',
        attachment: null,
        status: '',
        category: '',
    });

    const handleTaskChange = (e) => {
        const { name, value, type } = e.target
        setEditedTask((prevTask) => {
            return{
                ...prevTask,
                [name]: type === 'file' ? e.target.files[0] : value
            }
        })
    }

    const clearFields = () => {
        setEditedTask({
            title: '',
            description: '',
            DueDate: '',
            attachment: null,
            status: '',
            category: '',
        })
    }

    useEffect(() => {
        const setFunction = () => {
            setEditedTask({
                title: task.title || '',
                description: task.description || '',
                DueDate: formattedDate || '',
                attachment: null, // Attachments are not fetched here, set to null for now
                status: task.status || '',
                category: task.category || '',
            });
        }
        if (task) {
            setFunction()
        }
        socket.on('task Edited', (message) => {
            setFunction()
        })

        return () => {
            socket.off('task edited')
        }

    }, [task]);

    useEffect(() => {
        if (task.DueDate) {
            const dueDate = new Date(task.DueDate);
            const year = dueDate.getFullYear();
            const month = String(dueDate.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed, so we add 1
            const day = String(dueDate.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            setFormattedDueDate(formattedDate);

        }
    }, [task]);

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const formData = new FormData()
        formData.append('taskId', taskId)
        formData.append('title', editedTask.title)
        formData.append('description', editedTask.description)
        formData.append('DueDate', editedTask.DueDate)
        formData.append('attachment', editedTask.attachment)
        formData.append('status', editedTask.status)
        formData.append('category', editedTask.category)
         
        if (editedTask.title !== '' && editedTask.description !== '' && editedTask.DueDate !== '' && editedTask.status !== '' && editedTask.category !== '' ) {
            await axios.post('http://localhost:3500/tasks/edit-task', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((res) => {
                socket.emit('task edited', { message: 'task edited successfully' })
                dispatch(AddTaskMessage({
                    id: nanoid(),
                    type: 'Success',
                    message: 'task edited successfully'
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

  return (
    <div className=' px-8 py-10'>
        <div className=' bg-white rounded-xl px-10 py-8 '>
            <h1 className=' text-2xl text-start font-medium tracking-wider text-[#333333] mb-6'>Edit Task</h1>
            <form action="" className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1a gap-x-6 gap-y-2 place-content-center' encType='multipart/form-data' onSubmit={handleFormSubmit}>
                    <div className=' flex flex-col mb-4 w-full'>
                        <label className=' mb-4' htmalFor="title">Title</label>
                        <input className=' px-4 py-2 rounded-md bg-gray-100 outline-none text-[#333333] text-sm border-[2px] border-solid border-gray-200' type="text" name="title" id="" onChange={handleTaskChange} value={editedTask.title} placeholder='Title ...' />
                    </div>

                    <div className=' flex flex-col mb-4 w-full'>
                        <label className=' mb-4' htmlFor="description">description</label>
                        <input className=' px-4 py-2 rounded-md bg-gray-100 outline-none text-[#333333] text-sm border-[2px] border-solid border-gray-200' type="text" name="description" onChange={handleTaskChange} value={editedTask.description} id="" placeholder='Description ...' />
                    </div>

                    <div className=' flex flex-col mb-4 w-full'>
                        <label className=' mb-4' htmlFor="DueDate">Due Date</label>
                        <input className=' px-4 py-2 rounded-md bg-gray-100 outline-none text-[#333333] text-sm border-[2px] border-solid border-gray-200' type="date" name="DueDate" onChange={handleTaskChange} value={editedTask.DueDate} id="" placeholder='Date ...' />
                    </div>

                    <div className=' flex flex-col mb-4 w-full'>
                        <label className=' mb-4' htmlFor="attachment">Attachment</label>
                        <input className=' px-4 py-2 rounded-md bg-gray-100 outline-none text-[#333333] text-sm border-[2px] border-solid border-gray-200' type="file" name="attachment" id="" onChange={handleTaskChange} placeholder='Add attachment ...' />
                    </div>

                    <div className=' flex flex-col mb-4 w-full'>
                        <label className=' mb-4' htmlFor="">Status</label>
                        <select className='px-4 py-2 rounded-md bg-gray-100 outline-none  text-sm border-[2px] border-solid border-gray-200 font-medium textlg' name="status" onChange={handleTaskChange} value={editedTask.status} id="">
                            <option className=' text-black font-medium' value="To Do">To Do</option>
                            <option className='text-black font-medium' value="In Progress">In Progress</option>
                            <option className='text-black font-medium' value="Completed">Completed</option>
                        </select>
                    </div>

                    <div className=' flex flex-col mb-4 w-full'>
                        <label className=' mb-4' htmlFor="category">Category</label>
                        <select className='px-4 py-2 rounded-md bg-gray-100 outline-none  text-sm border-[2px] border-solid border-gray-200 font-medium textlg' name="category" onChange={handleTaskChange} value={editedTask.category} id="">
                            <option className=' text-black font-medium' value="High Priority">High Priority</option>
                            <option className='text-black font-medium' value="Medium Priority">Medium Priority</option>
                            <option className='text-black font-medium' value="Low Priority">Low Priority</option>
                        </select>
                    </div>

                    <button type='submit' className=' flex-4 bg-blue-500 tracking-wider shadow-lg px-4 py-2 rounded-md text-white font-medium'>{isLoading ? 'Loading...' : 'Edit Task'}</button>
                    <button type='button' className=' flex-4 bg-blue-950 tracking-wider shadow-lg px-4 py-2 rounded-md text-white font-medium' onClick={clearFields}>Clear</button>
            </form>
            
        </div>
    </div>
  )
}

export default EditTask