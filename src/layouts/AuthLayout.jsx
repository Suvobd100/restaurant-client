import React from 'react'
import { Outlet } from 'react-router'
import Footer from '../components/Footer'
import AuthNav from '../components/AuthNav'

const AuthLayout = () => {
  return (
    <div>
    <header>
      <AuthNav/>
      {/* <h2>Auth NAV</h2> */}
    </header>
    <main className='min-h-[calc(100vh-413px)] container mx-auto'>
        <Outlet/>
    </main>
    <footer><Footer/></footer>
</div>
  )
}

export default AuthLayout