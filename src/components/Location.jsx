import axios from 'axios'
import Flag from 'react-world-flags'
import Moment from 'moment/moment';
import React,{ useEffect,useState } from 'react'
import { BiCalendar,BiWorld } from 'react-icons/bi';
import {FaUser, FaUsers, FaEye, FaFlag} from 'react-icons/fa';
import Loading from './Loading';
import Pagination from './Pagination';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SelectLimit from './SelectLimit';


function Location() {
  const [prevLimit,setPrevLimit] = useState(20);
  const [temp,setTemp] = useState(0);
  const [limit,setLimit] = useState(20);
  const {page,location} = useParams();
  const currentPage = page == undefined ? 1 : page;
  const [zones,setZones] = useState([]);
  const [loading,setLoading] = useState();
  const [count,setCount] = useState(0);
  const navigate = useNavigate();

  useEffect(()=>{
    document.title = `${import.meta.env.VITE_SITE_NAME} - ${location} zones - ${currentPage}`
  },[])

  useEffect(()=>{
    if(currentPage != 1){navigate(`/location/${location}`);}
    setTemp(temp+1)
  },[limit])

  useEffect(()=>{
    setLoading(true);
    axios.get(`${import.meta.env.VITE_APP_URL}/location/${location}/${currentPage}/${limit}`)
    .then(async res => { await setZones(res.data); })
    .catch(err => { console.log(err);})
    .finally(()=>{setLoading(false) })
  },[temp,limit])

  useEffect(()=>{
    setLoading(true);
    axios.get(`${import.meta.env.VITE_APP_URL}/locationCount/${location}`)
    .then(async res => { await setCount(Math.ceil(res.data["count"] / limit)) })
    .catch(err => { console.log(err);})
    .finally(()=>{setLoading(false) })
  },[zones])

  return (
    <div className="w-full mt-4 rounded-[8px] p-2 bg-[#0e1726]">
    <div className='p-4'>
      {loading != true  ? 
      <>
      {zones.length != 0 ? 
      <>
      <SelectLimit setPrevLimit={setPrevLimit} setLimit={setLimit} limit={limit}/>
      <table className='table w-full'>
        <thead className='border-y-[1px] border-[rgba(255,255,255,0.1)] transition-all duration-300 p-2 text-[rgba(255,255,255,0.8)] h-[40px]'>
          <tr className='text-uppercase text-[#009688] text-[13px]'>
            <th className='text-[#009688] duration-300 transition cursor-pointer'><div className='flex justify-center items-center gap-1'>ID</div></th>
            <th className='duration-300 transition cursor-pointer'><div className='flex justify-center items-center gap-1'><FaFlag size={15}/>LOCATION</div></th>
            <th className='duration-300 transition cursor-pointer'><div className='flex justify-center items-center gap-1'><BiCalendar size={20}/>DATE</div></th>
            <th className='duration-300 transition cursor-pointer'><div className='flex justify-center items-center gap-1'><FaUsers size={20}/>GROUP</div></th>
            <th className='duration-300 transition cursor-pointer'><div className='flex justify-center items-center gap-1'><FaUser size={15}/>ATTACKER NAME</div></th>
            <th className='duration-300 transition cursor-pointer'><div className='flex justify-center items-center gap-1'><BiWorld size={20}/>WEB URL</div></th>
            <th className='duration-300 transition cursor-pointer'><div className='flex justify-center items-center gap-1'>SERVER IP</div></th>
            <th className='duration-300 transition cursor-pointer'><div className='flex justify-center items-center gap-1'><FaEye size={20}/>DETAILS</div></th>
          </tr>
        </thead>
        <tbody className='text-[#e5e5e5] text-[15px] '>
        { zones.length != 0 ? zones.map((zone,index) => {
        return (
            <tr key={index} className='border-b-[1px] border-[rgba(255,255,255,0.1)] h-[40px]'>
              <td className='text-center hover:text-white duration-300 transition cursor-pointer'>{zone.zone_id}</td>
              <td className='text-center hover:text-white duration-300 transition cursor-pointer'><span className='flex items-center gap-2 ml-4'><Link className="flex gap-2 items-center" to={`/location/${zone.zone_countryCode}`}> <Flag alt={zone.zone_country} fallback={ <span className='text-[#009688]'>Unknown</span> } height='18' width='40' code={ zone.zone_countryCode }  />{zone.zone_countryCode}</Link></span></td>
              <td className='p-2'>{Moment(zone.zone_date).format("D MMMM yyyy")}<br/>{Moment(zone.zone_date).format("HH:mm")}</td>
              <td className='hover:text-white duration-300 transition cursor-pointer'><Link to={`/group/${zone.zone_group}`}> {zone.zone_group.slice(0,20)}</Link></td>
              <td className='hover:text-white duration-300 transition cursor-pointer'><Link to={`/hacker/${zone.zone_nick}`}> {zone.zone_nick.slice(0,20)}</Link></td>
              <td className='text-red-800 hover:text-red-600 underline duration-300 transition cursor-pointer'><a href={zone.zone_url}>{zone.zone_url.slice(0,40)}</a></td>
              <td className='text-[#009688] opacity-[70%] hover:opacity-100 hover:underline duration-300 transition cursor-pointer'>{zone.zone_serverIp !== "" ? zone.zone_serverIp : <span className='text-[#009688] no-underline	'>Unknown</span>}</td>
              <td className='text-center w-[130px]'><Link to={`/mirror/${zone.zone_id}`} className='inline-block text-[#1b55e2] border-[1px] border-[#1b55e2] hover:bg-[#1b55e2] hover:text-white transition-all duration-300 w-[100px] font-semibold p-2 rounded-[8px]'>Details</Link></td>
            </tr>
          )
        }) : null}
        </tbody>
      </table>
      <Pagination setTemp={setTemp} temp={temp} refer={`/location/${location}`} page={count} active={currentPage}/>
      </>
      : <div className='w-full bg-[#1b2e4b] text-[#009688] p-2 flex items-center'>No mirrors found!!</div>}
      </>
      : <Loading message="Loading..."/>}
    </div>
    

  </div>
  )
}

export default Location