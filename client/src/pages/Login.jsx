import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AddTaskMessage, setToken } from '../state'
import axios from 'axios'
import { nanoid } from '@reduxjs/toolkit'

const Login = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const onUserChange = (e) =>{
        const { name, value } = e.target
        setUser((prevUser) => {
            return{
                ...prevUser,
                [name]: value
            }
        })
    }

    const dispatch = useDispatch()
    const Navigate = useNavigate()

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        if (email !== '' && password !== '' ) {
            await axios.post('http://localhost:3500/users/login', { email: user.email, password: user.password })
            .then((res) => {
                console.log(res.data);
                dispatch(setToken(res.data.token))
                dispatch(AddTaskMessage({
                    id: nanoid(),
                    type: 'Success',
                    message: 'logged in successfully'
                }))
                Navigate('/')
            })
            .catch((err) => {
                dispatch(AddTaskMessage({
                    id: nanoid(),
                    type: 'Error',
                    message: 'Something went wrong!'
                }))
                console.log(err);
            })
            }
            setIsLoading(false)
        }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleFormSubmit}>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={onUserChange} value={user.email} placeholder="name@company.com" required="" />
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" onChange={onUserChange} value={user.password} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>
                  <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{isLoading ? 'Loading' : 'Sign in'}</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <Link to={"/register"} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
  )
}

export default Login