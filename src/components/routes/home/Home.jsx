import React from 'react'
import { Outlet } from 'react-router-dom'
import { categories } from '../../../data-categories'
import Directory from '../../directory/Directory'






const Home = () => {
  return (
    <div>
         <Outlet />
        <Directory categories={categories}/>
    </div>
  )
}

export default Home