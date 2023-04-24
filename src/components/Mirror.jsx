import React,{useState,useEffect} from 'react'
import { useParams,Link } from 'react-router-dom'
import axios from 'axios'
import { FaUser,FaCalendar,FaLink,FaGlobe,FaUsers,FaDesktop,FaChartArea } from 'react-icons/fa'
import Flag from 'react-world-flags'
import Moment from 'moment/moment';
import Loading from './Loading'

function Mirror() {
    const {id} = useParams();
    const [zone,setZone] = useState([]);
    const [loading,setLoading] = useState();
    const [count,setCount] = useState(0);
    useEffect(()=>{
      setLoading(true);
      Moment.locale('tr');
      axios.get(`${import.meta.env.VITE_APP_URL}/mirror/${id.toString()}`)
      .then(async res => { await setZone(res.data[0]);setLoading(false); })
      .catch(err => { console.log(err);})
      .finally(()=>{setLoading(false) })
    },[])

    useEffect(()=>{
        document.title = `${import.meta.env.VITE_SITE_NAME} - Mirror ${id}`
      },[])
    

    useEffect(()=>{
        setLoading(true);
        if(zone != []){
            axios.get(`${import.meta.env.VITE_APP_URL}/hackerZoneCount/${zone.zone_nick}`)
            .then(async res => { await setCount(res.data);setLoading(false); })
            .catch(err => { console.log(err);})
            .finally(()=>{setLoading(false) })
        }
      },[zone])

  return (
    <div className="w-full mt-4 rounded-[8px] p-8 bg-[#0e1726] flex flex-col">
        {loading != true ? <>
        <div className='w-full flex '>
            <div className='p-4 flex flex-col text-white font-semibold w-1/2 gap-2 text-[14px]'>
                <span className='flex gap-1'><p className='font-normal text-white flex items-center gap-1'><FaUser/>Hacker:</p><Link className='hover:underline hover:opacity-75' to={`/hacker/${zone.zone_nick}`}>{zone.zone_nick}</Link></span>
                <span className='flex gap-1'><p className='font-normal text-white flex items-center gap-1'><FaUsers/>Group:</p><Link className='hover:underline hover:opacity-75' to={`/group/${zone.zone_group}`}>{zone.zone_group}</Link></span>
                <span className='flex gap-1'><p className='font-normal text-white flex items-center gap-1'><FaCalendar/>Date:</p>{Moment(zone.zone_date).format("D MMMM yyyy")} {Moment(zone.zone_date).format("HH:mm")}</span>
                <span className='flex gap-1'><p className='font-normal text-white flex items-center gap-1'><FaDesktop/>Mode:</p><Link className='hover:opacity-75 hover:underline' to={`${import.meta.env.VITE_APP_URL}/fullscreen/${zone.zone_id}`}>Full Screen</Link></span>
            </div>
            <div className='p-4 flex flex-col text-white font-semibold w-1/2 gap-2 text-[14px]'>
                <span className='flex gap-1'><p className='font-normal text-white flex items-center gap-1'><FaLink/>Web Url:</p><a className='underline hover:opacity-75' href={zone.zone_url}>{zone.zone_url}</a></span>
                <span className='flex gap-1'><p className='font-normal text-white flex items-center gap-1'><FaGlobe/>Location:</p><span className='flex items-center gap-1'><Flag alt={zone.zone_country} fallback={ <span className='text-[#009688]'>Unknown</span> } height='14' width='30' code={ zone.zone_countryCode }  />{zone.zone_countryCode}</span></span>
                <span className='flex gap-1'><p className='font-normal text-white flex items-center gap-1'><FaCalendar/>Server Ip:</p>{zone.zone_serverIp}</span>      
                <span className='flex gap-1'><p className='font-normal text-white flex items-center gap-1'><FaChartArea/>Attacker Zone Count:</p><Link className='hover:underline hover:opacity-75' to={`/hacker/${zone.zone_nick}`}>{count.count}</Link></span>      
            </div>
        </div>
        <div className='w-full border-2 border-[#ccc] h-[480px]'>
            <iframe className='w-full h-full' src={`${import.meta.env.VITE_APP_URL}/fullscreen/${zone.zone_id}`}></iframe>
        </div>
        </> : <Loading message="Loading..."/>}
    </div>
  )
}

export default Mirror