import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import AddTask from './pages/AddTask'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import { useDispatch, useSelector } from 'react-redux'
import { clearTaskMessages, selectTaskMessages, selectToken } from './state'
import { getCurrentUser } from './api/user'
import EditTask from './pages/EditTask'
import PdfViewer from './pages/PdfViewer'
import SuccessAlert from './components/Alerts/SuccessAlert'
import ErrorAlert from './components/Alerts/ErrorAlert'
import WarningAlert from './components/Alerts/WarningAlert'

const App = () => {

  const taskMessages = useSelector(selectTaskMessages)
  const [state, setState] = useState(true)
  const token = useSelector(selectToken)
  const dispatch = useDispatch()

  getCurrentUser(token)

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(clearTaskMessages())
    }, 3000); 

    return () => clearTimeout(timer); 
  }, [taskMessages]);

  return (
    <div className='flex bg-gray-100'>
      {token && <Sidebar state={state} setState={setState}/> }
      <div className='w-full'>
        <Router>
          {token && <Header setState={setState} state={state} />}
          {taskMessages && 
            taskMessages.map((message, index) => (
              message.type === 'Success' ? 
              <SuccessAlert key={index} successMessage={message.message} messageId={message.id} /> 
              : 
              message.type === 'Error' ? 
              <ErrorAlert key={index} errorMessage={message.message} messageId={message.id} />
              :
              <WarningAlert key={index} warningMessage={message.message} />

            ))
          }
          <div className=' border-l-[2px] border-solid border-gray-200'>
            <Routes>
              <Route path='/' element={token ? <Home/> : <Navigate to={'/login'}/>} />
              <Route path='/add-task' element={token ? <AddTask/> : <Navigate to={'/login'}/>} />
              <Route path='/edit-task/:taskId' element={token ? <EditTask/> : <Navigate to={'/login'}/>} />
              <Route path='/profile' element={token ? <Profile/> : <Navigate to={'/login'}/>} />
              <Route path='/pdf/:pdfInfo' element={token ? <PdfViewer/> : <Navigate to={'/login'}/>} />
              <Route path='/login' element={!token ? <Login/> : <Navigate to={'/'} />} />
              <Route path='/register' element={!token ? <Register/> : <Navigate to={'/'} />} />
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  )
}

export default App