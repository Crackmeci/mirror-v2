import React from 'react'
import { FaBars } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { menuItems } from './MenuItems'

import { useState } from 'react'
import MobileMenu from './MobileMenu'


function Header() {
    const [mobile,setMobile] = useState(0);
  return (
    <div>
        <div className='flex justify-between items-center'>
            <h1 className='text-4xl text-white font-bold p-4'>{`${import.meta.env.VITE_SITE_NAME}`} </h1>
            <FaBars onClick={()=>{ setMobile(1); }} size={40} className='hidden sm:block text-white p-1 cursor-pointer border-[1px] border-[rgb(255,255,255,0.05)]'/>
        </div>
        {mobile == 1 ? <MobileMenu setMobile={setMobile} /> : null}
        <div className='bg-[#191e3a] flex items-center px-2 rounded-[8px] min-h-[50px] sm:hidden'>
            <ul className='flex items-center gap-2 lg:flex-wrap h-full px-4'>
                {menuItems.map((menu,index) => {
                    return(
                        <li key={index} className="text-white align-text-bottom text-[13px] p-2 h-full flex items-center gap-2 hover:bg-blue-500 transition duration-300"> 
                            <Link to={`/${menu.url}`} className="flex items-center gap-2"> 
                                {menu.icon} <span className='mt-1'>{menu.title}</span>
                            </Link> 
                        </li>)
                } )}
            </ul>
        </div>
    </div>
  )
}

export default Header