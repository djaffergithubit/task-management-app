import React, { useEffect } from 'react'
import SingleTask from './SingleTask'
import { useTasks } from '../api/task'
import { useSelector } from 'react-redux'
import { selectToken } from '../state'
import { socket } from '../socket/socket'
import Skeleton from './Skeleton'

const AllTasks = ({ searchForm }) => {

  const token = useSelector(selectToken)
  const { userTasks, attachments } = useTasks(token, searchForm)

  useEffect(() => {
    socket.on('connect',() => {
      console.log('client connected')
    })

  }, [])

  return (
    <div className='  py-8'>
        <h1 className=' text-2xl font-semibold text-[#333333] mb-6'>{userTasks.length} {userTasks.length > 1 ? 'tasks' : 'task'} Found</h1>
        <section className=' grid sm:grid-cols-2 sm:place-content-center gap-6'>
            {userTasks.map((task, index) => (
              (task ? <SingleTask 
                key={index}
                taskId={task.id}
                title={task.title}
                description={task.description}
                category={task.category}
                file={attachments.find(attachment => attachment.taskId == task.id )}
                date={task.DueDate}
                status={task.status}
              />
              :
              <Skeleton />
            )
            ))}
        </section>
    </div>
  )
}

export default AllTasks