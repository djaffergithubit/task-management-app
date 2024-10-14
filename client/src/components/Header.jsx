import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AddTaskMessage, selectUser, setToken, setUser } from '../state';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import { nanoid } from '@reduxjs/toolkit';
import { useState } from 'react';
import profileImg from "../assets/profile.png"

const Header = ({setState, state}) => {

  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  const [showLogout, setShowLogout] = useState(false)

  const logout = () => {
    axios.post('http://localhost:3500/users/logout')
    .then((res) => {
        dispatch(setToken(''))
        dispatch(setUser({}))
        dispatch(AddTaskMessage({
            id: nanoid(),
            type: 'Success',
            message: 'User logged out'
        }))
        Navigate('/login')
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

  return (
      <nav className=" sticky top-0 bg-white w-full border-b-[2px] border-solid border-gray-200">
          <div className="flex items-center px-4 max-w-screen-xl mx-auto md:px-8 relative">
              <div className="flex items-center justify-between py-2 md:py-3 md:block">
                  <div className="">
                      <button className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
                          onClick={() => setState(!state)}
                      >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                                  </svg>
                      </button>
                  </div>
              </div>
              <div className={`flex-1 justify-self-center pb-3 md:block md:pb-0`}>
                  <h1 className=' text-center text-[#333333] font-bold text-2xl py-6 tracking-wider'>Tasks</h1>
              </div>
              <div>
                <div className="" onClick={() => setShowLogout(!showLogout)}>
                    <a href="javascript:void(0)" className="py-1 px-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow flex items-center">
                        <img className=' w-[40px] h-[40px] rounded-full mr-1.5' src={user.profileImage ? `http://localhost:3500/uploads/${user.profileImage}` : profileImg } alt="" />
                        {user.username}
                        <FaChevronDown className='ml-1.5'/>
                    </a>
                </div>
                {showLogout && <div className=' w-[130px] h-10 bg-[#dbeafe] absolute -bottom-8 rounded-lg shadow-lg text-lg font-md text-blue-600 flex justify-center items-center cursor-pointer' onClick={logout}>
                    Logout
                </div>}
              </div>
          </div>
      </nav>
  )
}

export default Header