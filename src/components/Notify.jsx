import React, { useState,useEffect } from 'react'
import {FiUser,FiUsers} from 'react-icons/fi'
import {AiOutlineSend} from 'react-icons/ai'
import {HiPlus} from 'react-icons/hi'
import { FaCheck,FaTimes } from 'react-icons/fa'
import {TbWorldWww} from 'react-icons/tb'
import Loading from './Loading'
import axios from 'axios'



function Notify() {
  const [loading,setLoading] = useState(false);
  const [nick,setNick] = useState("");
  const [res,setRes] = useState([]);
  const [resMulti,setMulti] = useState([]);
  const [group,setGroup] = useState("");
  const [url,setUrl] = useState("");
  const [urls,setUrls] = useState("");


  useEffect(()=>{  
    document.title = `${import.meta.env.VITE_SITE_NAME} - Notify`
    axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
  },[])

  const sendNotify = ()=>{
    setRes([]);

    setLoading(true);
    axios.post(`${import.meta.env.VITE_APP_URL}/notify`,
    {
      "data":{
      "zone_nick": nick,
      "zone_group": group,
      "zone_url": url
      }
    })
    .then(res => { setRes(res.data); })
    .finally(()=>{setLoading(false) })
  }

  const multiNotify = ()=>{
    setMulti([]);
    setLoading(true);
    axios.post(`${import.meta.env.VITE_APP_URL}/multinotify`,
    {
      "data":{
      "zone_nick": nick,
      "zone_group": group,
      "zone_urls": typeof urls == "string" ? urls.split('\n') : null
      }
    })
    .then(res => { setMulti(res.data); })
    .finally(()=>{setLoading(false) })
  }
  return (
    <div className='w-full gap-2 flex sm:flex-col'>
    <div className="bg-[#0e1726] w-1/2 sm:w-full min-w-[315px] mt-4 p-2 rounded-[8px]">
        <h1 className="block p-2 text-3xl font-bold w-full text-white border-b border-[rgba(255,255,255,.1)] ">Notify</h1>
        <div className='mt-4 flex flex-1 rounded-[8px] flex-row-reverse gap-2 justify-between items-center p-1 px-3 bg-[#1b2e4b]'>
          <input className='flex-1 text-white bg-transparent outline-none' value={nick}  onChange={(e) => { setNick(e.target.value);}} type="text" />
          <label className='text-white border-r-[1px] p-1 border-[rgba(255,255,255,0.1)] flex items-center gap-2' htmlFor=""><FiUser size={20}/> Nick:</label>
        </div>

        <div className='mt-4 flex flex-1  rounded-[8px] flex-row-reverse gap-2 justify-between items-center p-1 px-3 bg-[#1b2e4b]'>
          <input className='flex-1 text-white bg-transparent outline-none' value={group}  onChange={(e) => { setGroup(e.target.value);}} type="text" />
          <label className='text-white border-r-[1px] p-1 border-[rgba(255,255,255,0.1)] flex items-center gap-2' htmlFor=""><FiUsers size={20}/> Group:</label>
        </div>

        <div className='mt-4 flex flex-1 rounded-[8px] flex-row-reverse gap-2 justify-between items-center p-1 px-3 bg-[#1b2e4b]'>
          <input className='flex-1 text-white bg-transparent outline-none' value={url}  onChange={(e) => { setUrl(e.target.value);}} type="text" />
          <label className='text-white border-r-[1px] p-1 border-[rgba(255,255,255,0.1)] flex items-center gap-2' htmlFor=""><TbWorldWww size={20}/> Web Url :</label>
        </div>
        {loading == true ? <Loading message="Processing..."/> : null}
        {res["status_code"] == 1 ? <div className='w-full h-[48px] bg-[#1b2e4b] mt-2 my-4 text-white p-2 flex items-center rounded-[8px] gap-2'><FaCheck size={20} color='#009688'/> Success.Zone have been added</div> : null }
        {res["status_code"] == 0 ? <div className='w-full h-[48px] bg-[#1b2e4b] mt-2 my-4 text-white p-2 flex items-center rounded-[8px] gap-2'><FaTimes size={20} color='#009688'/>Error!A error have been seemed</div> : null}
        <button onClick={() => {sendNotify()}} className='notify mt-4 h-[50px] bg-[#1b55e2] rounded-[8px] p-2 w-full text-center flex items-center justify-center gap-2 text-white font-semibold'><HiPlus size={20}/> Notify!</button>
      </div>
      
    <div className="bg-[#0e1726] w-1/2 sm:w-full min-w-[315px]  mt-4  p-2 rounded-[8px]">
        <h1 className="block p-2 text-3xl font-bold w-full text-white border-b border-[rgba(255,255,255,.1)] ">Multi Notify</h1>
        <div className='mt-4 flex rounded-[8px] flex-1 flex-row-reverse gap-2 justify-between items-center p-1 px-3 bg-[#1b2e4b]'>
          <input className='flex-1 text-white bg-transparent outline-none' value={nick}  onChange={(e) => { setNick(e.target.value);}}  type="text" />
          <label className='text-white border-r-[1px] p-1 border-[rgba(255,255,255,0.1)] flex items-center gap-2' htmlFor=""><FiUser size={20}/> Nick:</label>
        </div>

        <div className='mt-4 flex flex-1 rounded-[8px] flex-row-reverse gap-2 justify-between items-center p-1 px-3 bg-[#1b2e4b]'>
          <input className='flex-1 text-white bg-transparent outline-none' value={group}  onChange={(e) => { setGroup(e.target.value);}}  type="text" />
          <label className='text-white border-r-[1px] p-1 border-[rgba(255,255,255,0.1)] flex items-center gap-2' htmlFor=""><FiUsers size={20}/> Group:</label>
        </div>

        <div className='mt-4 flex flex-1 rounded-[8px] flex-row-reverse gap-2 justify-between items-center p-1 px-3 bg-[#1b2e4b]'>
        <textarea className='flex-1 min-h-[100px] text-white bg-transparent outline-none' value={urls}  onChange={(e) => { setUrls(e.target.value);}}  type="text" />
          <label className='text-white min-h-[100px] border-r-[1px] p-1 border-[rgba(255,255,255,0.1)] flex items-center gap-2' htmlFor=""><TbWorldWww size={20}/> Web Urls:</label>
        </div>
        {loading == true ? <Loading message="Processing..."/> : null}
        {resMulti["status_code"] == 1 ? <div className='w-full h-[48px] bg-[#1b2e4b] mt-2 my-4 text-white p-2 flex items-center rounded-[8px] gap-2'><FaCheck size={20} color='#009688'/> Success.Zone have been added</div> : null }
        {resMulti["status_code"] == 0 ? <div className='w-full h-[48px] bg-[#1b2e4b] mt-2 my-4 text-white p-2 flex items-center rounded-[8px] gap-2'><FaTimes size={20} color='#009688'/>Error!A error have been seemed</div> : null}

        <button onClick={() => {multiNotify()}} className='notify mt-4 h-[50px] rounded-[8px] bg-[#1b55e2] p-2 w-full text-center flex items-center justify-center gap-2 text-white font-semibold'><HiPlus size={20}/> Notify!</button>
      </div>
      </div>
  )
}

export default Notify