import React from 'react'
import { Outlet } from 'react-router'
import Footer from '../components/Footer'
import AuthNav from '../components/AuthNav'

const AuthLayout = () => {
  return (
    <div>
    <header>
      <AuthNav/>
     
    </header>
    <main className='min-h-[calc(100vh-380px)] container mx-auto'>
        <Outlet/>
    </main>
    <footer><Footer/></footer>
</div>
  )
}

export default AuthLayout