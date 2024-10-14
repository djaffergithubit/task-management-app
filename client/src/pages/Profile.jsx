import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddTaskMessage, selectToken, selectUser } from '../state'
import { socket } from '../socket/socket'
import { nanoid } from '@reduxjs/toolkit'
import profileImg from "../assets/profile.png"

const Profile = () => {

    const token = useSelector(selectToken)
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        image: null,
        password: ''
    })

    const handleUserChange = (e) => {
        const { name, value, type } = e.target
        setNewUser((prevUser) => {
            return{
                ...prevUser,
                [name]: type === 'file' ? e.target.files[0] : value
            }
        })
    }

    const clearFields = () => {
        setNewUser({
            username: '',
            image: null,
            email: '',
            password: ''
        })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const formData = new FormData()
        formData.append('username', newUser.username)
        formData.append('email', newUser.email)
        formData.append('image', newUser.image)
        formData.append('password', newUser.password)

        if (newUser.username !== '' && newUser.email !== '') {
            await axios.post('http://localhost:3500/users/edit-user', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => {
            socket.emit('edit profile', { message: 'user updated' })
            dispatch(AddTaskMessage({
            id: nanoid(),
            type: 'Success',
            message: 'user updated'
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
                message: "Please fill all the fields!"
            }))
        }

        setIsLoading(false)
    }

    useEffect(() => {
      setNewUser({
        username: user.username,
        email: user.email,
        password: '' 
      })
    }, [user])

  return (
    <div className=' px-8 py-10'>
        <div className=' bg-white rounded-xl px-10 py-8 '>
            <div className=' flex items-center mb-6'>
              <img className={`w-[70px] h-[70px] rounded-full mr-3 ${user.profileImage ? 'w-[70px] h-[70px]' : 'w-[80px] h-[70px]' }`} src={user.profileImage ? `http://localhost:3500/uploads/${user.profileImage}` : profileImg } alt="" />
              <h1 className=' text-2xl text-start font-medium tracking-wider text-[#333333]'>Profile</h1>
            </div>
            <form action="" className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-2 place-content-center' encType='multipart/form-data' onSubmit={handleFormSubmit}>
                    <div className=' flex flex-col mb-4 w-full'>
                        <label className=' mb-4' htmlFor="username">username</label>
                        <input className=' px-4 py-2 rounded-md bg-gray-100 outline-none text-[#333333] text-sm border-[2px] border-solid border-gray-200' type="text" name="username" onChange={handleUserChange} value={newUser.username} id="" placeholder='username ...' />
                    </div>

                    <div className=' flex flex-col mb-4 w-full'>
                        <label className=' mb-4' htmlFor="email">email</label>
                        <input className=' px-4 py-2 rounded-md bg-gray-100 outline-none text-[#333333] text-sm border-[2px] border-solid border-gray-200' type="email" name="email" onChange={handleUserChange} value={newUser.email} id="" placeholder='Email Address ...' />
                    </div>

                    <div className=' flex flex-col mb-4 w-full'>
                        <label className=' mb-4' htmlFor="image">image</label>
                        <input className=' px-4 py-2 rounded-md bg-gray-100 outline-none text-[#333333] text-sm border-[2px] border-solid border-gray-200' type="file" name="image" onChange={handleUserChange} id="" />
                    </div>

                    <div className=' flex items-end mb-4'>
                      <button type='submit' className=' flex-4 bg-blue-500 tracking-wider shadow-lg px-4 py-2 rounded-md text-white font-medium max-h-[40px] h-full'>{isLoading ? 'Loading...' : 'Edit Profile'}</button>
                    </div>
                    <button type='button' className=' mb-4 flex-4 bg-blue-950 tracking-wider shadow-lg px-4 py-2 rounded-md text-white font-medium' onClick={clearFields}>Clear</button>
            </form>
        </div>
    </div>
  )
}

export default Profile