import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { AddTaskMessage } from '../state'
import { nanoid } from '@reduxjs/toolkit'

const Register = () => {
    
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [newUser, setNewUser] = useState({
        username: "",
        email: "",
        password: "", 
        confirmPassword: "",
        image: null
    })

    const onUserChange = (e) => {
        const {name, value, type} = e.target
        setNewUser((prevUser) => {
            return {
                ...prevUser,
                [name]: type === 'file' ? e.target.files[0] : value
            }
        })
    }

    const Navigate = useNavigate()

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const formData = new FormData()
        formData.append('username', newUser.username)
        formData.append('email', newUser.email)
        formData.append('password', newUser.password)
        formData.append('image', newUser.image)

        if (newUser.password === newUser.confirmPassword && newUser.password !== '' && newUser.username !== '' && newUser.email !== '') {
            await axios.post('http://localhost:3500/users/register', formData)
            .then((res) => {
                console.log(res.data.message);
                dispatch(AddTaskMessage({
                    id: nanoid(),
                    type: 'Success',
                    message: 'new user has been registered'
                }))
                Navigate('/login')
            }).catch((err) => {
                dispatch(AddTaskMessage({
                    id: nanoid(),
                    type: 'Error',
                    message: 'Something went wrong!'
                }))
                console.log(err);
            })
        }
        else if (newUser.password !== newUser.confirmPassword) {
            dispatch(AddTaskMessage({
                id: nanoid(),
                type: "Error",
                message: "Password not match"
            }))            
        }else{
            dispatch(AddTaskMessage({
                id: nanoid(),
                type: "Warning",
                message: "Please fill out all fields"
            }))
        }

        setIsLoading(false)
    }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#" encType='multipart/form-data' onSubmit={handleFormSubmit}>
                  <div>
                      <label for="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">username</label>
                      <input type="text" name="username" id="username" onChange={onUserChange} value={newUser.username} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                  </div>
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" onChange={onUserChange} value={newUser.email} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                  </div>
                  <div className=' flex items-center gap-3'>
                    <div className=' w-full'>
                        <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" name="password" id="password" onChange={onUserChange} value={newUser.password} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                    </div>
                    <div className=' w-full'>
                        <label for="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" onChange={onUserChange} value={newUser.confirmPassword} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                    </div>
                    
                  </div>
                  <div className=' w-full'>
                        <label for="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Image</label>
                        <input type="file" name="image" id="image" onChange={onUserChange} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                    </div>
                  <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{isLoading ? 'Loading...' : 'Create an account'}</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <Link to={'/login'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
  )
}

export default Register