import React, { useState } from 'react'
import { BiCategory } from "react-icons/bi"
import { FaFileAlt } from "react-icons/fa"
import { BsCalendar2DateFill } from "react-icons/bs";
import { deleteTask } from '../api/task';
import { useSelector } from 'react-redux';
import { selectToken } from '../state';
import { useNavigate } from 'react-router-dom';
import PdfViewer from '../pages/PdfViewer';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
  ).toString();

const SingleTask = ({taskId, title, description, category, file, date, status }) => {

    const [pdfFile, setPdfFile] = useState(null)
    const [showViewer, setShowViewer] = useState(false)
    const [showImage, setShowImage] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const token = useSelector(selectToken)
    const Navigate = useNavigate()

    const showPdf = async () => {
        if (file.name.includes('.pdf')) {
            setPdfFile(`http://localhost:3500/uploads/${file.name}`)
            setShowViewer(true)
        }else{
            setShowImage(true)
        }
    } 

  return (
    <div className=' bg-white rounded-md w-full'>
    <div className=' w-full flex items-center border-b-[1px] border-solid border-gray-200 px-6 py-4'>
        <div className=' bg-blue-500 px-5.5 py-2.5 text-2xl font-semibold text-white text-center w-[60px] h-[50px]'>{title.substring(0, 1).toUpperCase()}</div>
        <div className=' ml-4'>
            <h3 className=' text-lg tracking-wider font-medium text-[#333333]'>{title}</h3>
            <p className=' text-md text-gray-400 tracking-wider'>{description.length > 30 ? description.substring(0, 15) + "..." : description}</p>
        </div>
    </div>

    <div className=' xl:flex items-center xl:gap-6 px-6 py-6'>
        <div className=' w-full flex flex-col xl:gap-y-4 xl:mb-0 mb-2'>
            <div className=' flex items-center xl:mb-0 mb-2'>
                <BiCategory className=' text-xl text-gray-600 mr-3' />
                <span className=' text-lg text-[#333333] tracking-wider'>{category}</span>
            </div>

            <div className=' flex items-center' onClick={showPdf} >
                <FaFileAlt className=' text-xl text-gray-600 mr-3' />
                <span className='text-lg text-[#333333] tracking-wider cursor-pointer'>{!file ? 'No file added':  file.name.length > 13 ? file.name.substring(0, 10) + "..." + file.name.slice(-4) : file.name}</span>
            </div>
        </div>
        <div className=' w-full flex flex-col xl:gap-y-4'>
            <div className=' flex items-center xl:mb-0 mb-4'>
                <BsCalendar2DateFill className=' text-xl text-gray-600 mr-3' />
                <span className=' text-lg text-[#333333] tracking-wider'>{(new Date(date)).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
            </div>
            <div className=''>
                <span className={`px-3 py-1 rounded-md text-lg ${status === 'Completed' ? 'bg-gray-200 text-indigo-600' : status === 'In Progress' ? 'text-yellow-500 bg-yellow-100' : 'bg-red-100 text-rose-600'}`}>{status}</span>
            </div>
        </div>

    </div>

    <div className=' px-6 pb-6 flex items-center gap-2'>
        <button className=' px-2 py-1 rounded-lg text white bg-green-200 text-green-500 tracking-wider shadow-lg' onClick={()=>Navigate(`/edit-task/${taskId}`)}>Edit</button>
        <button className=' px-2 py-1 rounded-lg text white bg-red-100 text-rose-600 tracking-wider shadow-lg' onClick={()=>{setIsLoading(true); deleteTask(token, taskId); setIsLoading(false)}}>
                {isLoading ? 'Loading...' : 'Delete'}
        </button>
    </div>

    {showViewer && <div className=' bg-black bg-opacity-60 xl:max-w-[1000px] max-w-[1076px] w-full fixed top-0 z-[6000] right-0 h-full overflow-y-auto cursor-pointer' onClick={()=>setShowViewer(false)}>
        <PdfViewer pdfFile={pdfFile}/>
    </div> }

    {showImage && <div className='bg-black bg-opacity-60 xl:max-w-[1000px] max-w-[1076px] w-full fixed top-0 z-[6000] right-0 h-full overflow-y-auto cursor-pointer flex justify-center items-center' onClick={() => setShowImage(false)}>
        <img className=' w-[500px] h-[350px] rounded-lg object-cover mx-3' src={`http://localhost:3500/uploads/${file.name}`} alt="" />
    </div>}

</div>
  )
}

export default SingleTask