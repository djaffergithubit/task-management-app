import React, { useState } from 'react'
import SearchForm from '../components/SearchForm'
import AllTasks from '../components/AllTasks'

const Home = () => {
  const [searchForm, setSearchForm] = useState({
    search: '',
    status: '',
    category: ''
})
  return (
    <div className='px-8 py-10'>
        <SearchForm 
          searchForm={searchForm}
          setSearchForm={setSearchForm}
        />
        <AllTasks 
          searchForm={searchForm}
        />
    </div>
  )
}

export default Home