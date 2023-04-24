import axios from 'axios'
import React,{ useEffect,useState } from 'react'
import { BiCalendar,BiWorld } from 'react-icons/bi';
import {FaUsers, FaEye, FaChartArea} from 'react-icons/fa';
import Loading from './Loading';
import Pagination from './Pagination';
import { Link, useParams,useNavigate } from 'react-router-dom';
import SelectLimit from './SelectLimit';

function BestHackers() {
  const [prevLimit,setPrevLimit] = useState(20);
  const [temp,setTemp] = useState(0);
  const [limit,setLimit] = useState(20);
  const {page} = useParams();
  const currentPage = page == undefined ? 1 : page;
  const [groups,setGroups] = useState([]);
  const [loading,setLoading] = useState();
  const [count,setCount] = useState(0);
  const navigate = useNavigate();

  useEffect(()=>{
    document.title = `${import.meta.env.VITE_SITE_NAME}  - Best Groups - ${currentPage}`
  },[])

  useEffect(()=>{
    if(currentPage != 1){navigate("/best-groups");}
    setTemp(temp+1)

  },[limit])

  useEffect(()=>{
    setLoading(true);
    axios.get(`${import.meta.env.VITE_APP_URL}/best-groups/${currentPage}/${limit}`)
    .then(async res => { await setGroups(res.data); })
    .catch(err => { console.log(err);})
    .finally(()=>{setLoading(false) })
  },[temp,limit])

  useEffect(()=>{
    setLoading(true);
    axios.get(`${import.meta.env.VITE_APP_URL}/groupCount`)
    .then(async res => { await setCount(Math.ceil(res.data["count"] / limit)) })
    .catch(err => { console.log(err);})
    .finally(()=>{setLoading(false) })
  },[groups])

  return (
    <div className="w-full mt-4 rounded-[8px] p-2 bg-[#0e1726]">
      <div className='p-4'>
        {loading != true  ? 
        <>
        {groups.length != 0 ? 
        <>
        <SelectLimit setPrevLimit={setPrevLimit} setLimit={setLimit} limit={limit}/>
        <table className='table w-full'>
          <thead className='border-y-[1px] border-[rgba(255,255,255,0.1)] transition-all duration-300 p-2 text-[rgba(255,255,255,0.8)] h-[40px]'>
            <tr className='text-uppercase text-[#009688] text-[13px]'>
              <th className='duration-300 transition cursor-pointer'><div className='flex justify-center items-center gap-1'><FaUsers size={20}/>GROUP NAME</div></th>
              <th className='duration-300 transition cursor-pointer'><div className='flex justify-center items-center gap-1'><FaChartArea size={20}/>ATTACK COUNT</div></th>
              <th className='duration-300 transition cursor-pointer'><div className='flex justify-center items-center gap-1'><FaEye size={20}/>DETAILS</div></th>
            </tr>
          </thead>
          <tbody className='text-[#e5e5e5] text-[15px] '>
          { groups.length != 0 ? groups.map((group,index) => {
          return (
            <tr key={index} className='border-b-[1px] border-[rgba(255,255,255,0.1)] h-[60px]'>
              <td className='text-center hover:text-white duration-300 transition cursor-pointer'><Link to={`/group/${group.group_name}`}>{group.group_name.slice(0,20)}</Link></td>
              <td className='text-center  p-2 hover:text-white duration-300 transition cursor-pointer'>{group.zone_count}</td>
              <td className='text-center w-[130px]'><Link to={`/group/${group.group_name}`} className='inline-block text-[#1b55e2] border-[1px] border-[#1b55e2] hover:bg-[#1b55e2] hover:text-white transition-all duration-300 w-[100px] font-semibold p-2 rounded-[8px]'>Details</Link></td>
            </tr>
            )
          }) : null}
          </tbody>
        </table>
        <Pagination setTemp={setTemp} temp={temp} refer={`/best-groups`} page={count} active={currentPage}/>
        </>
        : <div className='w-full bg-[#1b2e4b] text-[#009688] p-2 flex items-center'>No groups found!!</div>}
        </>
        : <Loading message="Loading..."/>}
      </div>
      

    </div>
  )
}

export default BestHackers