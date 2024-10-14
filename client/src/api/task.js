import axios from "axios"
import { useEffect, useState } from "react"
import { socket } from "../socket/socket"
import { useDispatch } from "react-redux"
import { AddTaskMessage } from "../state"
import { nanoid } from "@reduxjs/toolkit"

const useTasks = (token, searchForm) =>{
    const [userTasks, setUserTasks] = useState([])
    const [attachments, setAttachments] = useState([])
    const [tasks, setTasks] = useState([])
    const dispatch = useDispatch()

    const getTasks = async () => {
        axios.get('http://localhost:3500/tasks/get-user-tasks', {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            setUserTasks(res.data.tasks)
            setTasks(res.data.tasks)
            setAttachments(res.data.attachments)
            console.log(res.data.attachment);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        getTasks()
        socket.on('task deleted', (message) => {
          dispatch(AddTaskMessage({
            id: nanoid(),
            type: 'Success',
            message: 'task deleted'
          }))
          getTasks()
        })

        return () => {
            socket.off('task deleted')
        }

    }, [])

    useEffect(() => {
        let filteredTasks = [...userTasks]
        if (searchForm.search !== '') {
          filteredTasks = filteredTasks.filter((task) => {
            return task.title.toLowerCase().includes(searchForm.search.toLowerCase())
          })
          setUserTasks(filteredTasks)
        }

        if (searchForm.status !== '' && searchForm.status !== 'All') {
            filteredTasks = filteredTasks.filter((task) => {
                return task.status.toLowerCase().includes(searchForm.status.toLowerCase())
            })
            setUserTasks(filteredTasks)
        }

        if (searchForm.category !== '' && searchForm.category !== 'All') {
            filteredTasks = filteredTasks.filter((task) => {
                return task.category.toLowerCase().includes(searchForm.category.toLowerCase())
            })
            setUserTasks(filteredTasks)
        }

        if (searchForm.status === 'All' || searchForm.category === 'All') {
            setUserTasks(filteredTasks)
        }

        if (searchForm.search ==='' && searchForm.status === '' && searchForm.category === '') {
            setUserTasks(tasks)
        }
    }, [searchForm])

    return { userTasks, attachments }
}

const deleteTask = async (token, taskId) => {
    await axios.post('http://localhost:3500/tasks/remove-task', { taskId: taskId }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then((res) => {
        socket.emit('task deleted', { message: 'task deleted successfully' })
        return res.data
    })
    .catch((err) => {
        return err
    })
}

const useTask = (taskId, token) => {
    const [task, setTask] = useState({})
    const [attachment, setAttachment] = useState({})

    const getTask = async () => {
        axios.get(`http://localhost:3500/tasks/get-task/${taskId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            setTask(res.data.task)
            setAttachment(res.data.attachment)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        getTask()
    }, [])

    console.log('task', task);
    return { task, attachment }
}

export { useTasks, deleteTask, useTask }