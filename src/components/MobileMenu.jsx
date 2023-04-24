import React from 'react'
import { menuItems } from './MenuItems'
import { FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'
function MobileMenu({setMobile}) {
  return (
    <div className='w-full h-screen sm:fixed left-0 top-0 z-50 backdrop-blur-md select-none bg-[rgba(0,0,0,0.8)] hidden sm:flex items-center px-2'>
        <div onClick={() =>{setMobile(0)}} className='absolute right-4 top-4 text-white cursor-pointer'>
        <FaTimes size={25}/>
        </div>
        <ul className='flex flex-col items-center gap-2 h-full px-4 justify-center w-full'>
            {menuItems.map((menu,index) => {
                return(
                    <li key={index} className="text-white w-full justify-center text-[24px] p-2 flex items-center gap-2 hover:bg-blue-500 transition duration-300"> 
                        <Link onClick={() => {setMobile(0)}} to={`/${menu.url}`} className="flex items-center gap-2"> 
                            {menu.icon} <span className='mt-1'>{menu.title}</span>
                        </Link> 
                    </li>)
            } )}
        </ul>
    </div>
  )
}

export default MobileMenu