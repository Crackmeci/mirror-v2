import React,{useEffect,useState} from 'react'
import {FiUser} from 'react-icons/fi'
import {AiOutlineSend} from 'react-icons/ai'
import {BsFillEnvelopeFill,BsPencil} from 'react-icons/bs';
import { FaCheck,FaTimes } from 'react-icons/fa'
import Loading from './Loading'
import axios from 'axios'

function Contact() {
  const [loading,setLoading] = useState(false);
  const [name,setName] = useState("");
  const [mail,setMail] = useState("");
  const [message,setMessage] = useState("");
  const [res,setRes] = useState([]);

  useEffect(()=>{
    document.title = `${import.meta.env.VITE_SITE_NAME}  - Contact`
    axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
  },[])


  const sendContact = ()=>{
    setRes([]);

    setLoading(true);
    axios.post(`${import.meta.env.VITE_APP_URL}/contact/add`,
    {
      "data":{
      "name": name,
      "email": mail,
      "message": message
      }
    })
    .then(res => { setRes(res.data); })
    .finally(()=>{setLoading(false) })
  }

  return (
    <div className="bg-[#0e1726] flex flex-wrap gap-2 w-full mt-4 p-2 rounded-[8px]">
      <div className='w-full min-w-[420px] p-2'>
        <h1 className="block p-2 text-3xl font-bold w-full text-white border-b border-[rgba(255,255,255,.1)] ">Contact</h1>
        <div className='mt-4 flex flex-1 rounded-[8px] flex-row-reverse gap-2 justify-between items-center p-1 px-3 bg-[#1b2e4b]'>
          <input value={name} onChange={(e) => { setName(e.target.value) }} className='flex-1 text-white bg-transparent outline-none' type="text" />
          <label className='text-white border-r-[1px] p-1 border-[rgba(255,255,255,0.1)] flex items-center gap-2' htmlFor=""><FiUser size={20}/> Name and Surname(nick):</label>
        </div>

        <div className='mt-4 flex flex-1 rounded-[8px] flex-row-reverse gap-2 justify-between items-center p-1 px-3 bg-[#1b2e4b]'>
          <input value={mail} onChange={(e) => { setMail(e.target.value) }} className='flex-1 text-white bg-transparent outline-none' type="text" />
          <label className='text-white border-r-[1px] p-1 border-[rgba(255,255,255,0.1)] flex items-center gap-2' htmlFor=""><BsFillEnvelopeFill size={20}/> E-Mail:</label>
        </div>

        <div className='mt-4 flex flex-1 flex-row-reverse gap-2 rounded-[8px] justify-between items-center p-1 px-3 bg-[#1b2e4b]'>
          <textarea value={message} onChange={(e) => { setMessage(e.target.value) }} className='flex-1 min-h-[100px] text-white bg-transparent outline-none' type="text" />
          <label className='text-white h-[100px] border-r-[1px] p-1 border-[rgba(255,255,255,0.1)] flex items-center gap-2' htmlFor=""><BsPencil size={20}/> Message:</label>
        </div>

        {loading == true ? <Loading message="Processing..."/> : null}
        {res["status_code"] == 1 ? <div className='w-full h-[48px] bg-[#1b2e4b] mt-2 my-4 text-white p-2 flex items-center rounded-[8px] gap-2'><FaCheck size={20} color='#009688'/> Success.Message have been sended</div> : null }
        {res["status_code"] == 0 ? <div className='w-full h-[48px] bg-[#1b2e4b] mt-2 my-4 text-white p-2 flex items-center rounded-[8px] gap-2'><FaTimes size={20} color='#009688'/>Error!A error have been seemed</div> : null}


        <button onClick={() => {sendContact()}} className='notify mt-4 h-[50px] rounded-[8px] bg-[#1b55e2] p-2 w-full text-center flex items-center justify-center gap-2 text-white font-semibold'><AiOutlineSend size={20}/> Send Message</button>
      </div>
  </div>
  )
}

export default Contact