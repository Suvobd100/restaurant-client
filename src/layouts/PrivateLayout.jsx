import React from 'react'
import AuthNav from '../components/AuthNav'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

const PrivateLayout = () => {
  return (
    <div>
        <header><AuthNav/></header>
        <main className="min-h-[calc(100vh-336px)] p-24 container mx-auto">
            <Outlet/>
        </main>
        <footer><Footer/></footer>

    </div>
  )
}

export default PrivateLayout