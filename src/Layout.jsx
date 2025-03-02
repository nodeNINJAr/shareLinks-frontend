import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './components/navbar/Navbar'

const Layout = () => {
  return (
       <div>
        {/* navbar */}
          <Navbar/>
          {/* main */}
          <main>
              <Outlet/>
          </main>
       </div>
  )
}

export default Layout