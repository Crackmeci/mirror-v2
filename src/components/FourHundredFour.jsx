import React,{useEffect} from 'react'
import {TbMoodSadDizzy} from 'react-icons/tb';
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
function ForHundredFor() {
  
  useEffect(()=>{
    document.title = `${import.meta.env.VITE_SITE_NAME} - 404 Not Found`
  },[])

  const navigate = useNavigate();

  return (
    <div className="w-full flex items-center justify-center mt-4 rounded-[8px] p-2 bg-[#0e1726]">
        <span className='text-uppercase text-white font-bold flex flex-col items-center gap-2 text-8xl text-center'>
          <TbMoodSadDizzy size={300}/>
          <p>404 NOT FOUND!</p>
          <span className='text-[#ccc] text-[14px]'>This page isn't exist! Please go home.</span>
          <button onClick={()=>{navigate("/")}} className='notify mt-4 h-[50px] bg-[#1b55e2] rounded-[8px] p-2 w-full text-center flex items-center text-[13px] justify-center gap-2 text-white font-semibold'><FaHome size={20}/> Go Home!</button>
        </span>
    </div>
  )
}

export default ForHundredFor