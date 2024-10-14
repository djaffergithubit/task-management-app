import React, { useEffect } from 'react'

const SearchForm = ({ searchForm, setSearchForm }) => {

    const handleSearchFormChange = (e) => {
        const { name, value } = e.target
        setSearchForm((prevSearchForm) => {
            return{
                ...prevSearchForm,
                [name]: value
            }
        })
    }

    const clearFilter = () => {
        setSearchForm({
            search: "",
            status: "",
            category: ""
        })
    }

    useEffect(() => {
        console.log('searchForm', searchForm);
    }, [searchForm])

  return (
    <div className=' bg-white rounded-xl px-10 py-8'>
        <h1 className=' text-2xl text-start font-medium tracking-wider text-[#333333] mb-6'>Search Form</h1>
        <form action="" className=' grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-2 place-content-center'>
            <div className=' flex flex-col mb-4 w-full'>
                <label className=' mb-4' htmlFor="search">Search</label>
                <input className=' px-4 py-2 rounded-md bg-gray-100 outline-none text-[#333333] text-sm border-[2px] border-solid border-gray-200' type="text" name="search" onChange={handleSearchFormChange} value={searchForm.search} id="" placeholder='Search Task ...' />
            </div>

            <div className=' flex flex-col mb-4 w-full'>
                <label className=' mb-4' htmlFor="status">Status</label>
                <select className='px-4 py-2 rounded-md bg-gray-100 outline-none  text-sm border-[2px] border-solid border-gray-200 font-medium textlg' name="status" onChange={handleSearchFormChange} value={searchForm.status} id="">
                    <option className=' text-black font-medium' value="All">All</option>
                    <option className=' text-black font-medium' value="To Do">To Do</option>
                    <option className='text-black font-medium' value="In Progress">In Progress</option>
                    <option className='text-black font-medium' value="Completed">Completed</option>
                </select>
            </div>

            <div className=' flex flex-col mb-4 w-full'>
                <label className=' mb-4' htmlFor="category">categories</label>
                <select className='px-4 py-2 rounded-md bg-gray-100 outline-none  text-sm border-[2px] border-solid border-gray-200 font-medium textlg' name="category" onChange={handleSearchFormChange} value={searchForm.category} id="">
                    <option className=' text-black font-medium' value="All">All</option>
                    <option className=' text-black font-medium' value="High Priority">High Priority</option>
                    <option className='text-black font-medium' value="Medium Priority">Medium Priority</option>
                    <option className='text-black font-medium' value="Low Priority">Low Priority</option>
                </select>
            </div>

            <div className='w-full flex items-end mb-4'>
                <button type='button' className=' bg-red-100 tracking-wider shadow-lg px-4 py-2 rounded-md text-rose-600 font-medium hover:bg-red-800 hover:text-white max-h-[40px] h-full w-full' onClick={clearFilter}>Clear filters</button>
            </div>
        </form>
    </div>
  )
}

export default SearchForm