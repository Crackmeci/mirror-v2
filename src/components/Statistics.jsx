import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaChartArea,FaUsers,FaUser } from 'react-icons/fa';
import Loading from './Loading';
import { Link } from 'react-router-dom';

function Statistics() {
  const [stats,setStats] = useState([]);
  const [loading,setLoading] = useState(false);
  useEffect(()=>{  
    document.title = `${import.meta.env.VITE_SITE_NAME} - Statistics`
    setLoading(true);
    axios.get(`${import.meta.env.VITE_APP_URL}/stats`)
    .then(res => { setStats(res.data); })
    .catch(err => { console.log(err) })
    .finally(()=> { setLoading(false); })
  },[])
  return (
    <div className=" flex flex-wrap gap-2 w-full mt-4 p-2 rounded-[8px]">
        <div className='flex flex-col w-full gap-2'>
          {loading != true ? 
          <>
          {stats != [] ? 
          <>
          <div className='gap-8 sm:flex-col  flex justify-center mb-6'>
              <div className='w-1/4 sm:w-full bg-[#0e1726] shadow min-w-[200px] p-4 flex flex-col rounded-[8px] h-[140px]'>
                  <div className='w-full text-white flex rounded-full mb-2'>
                    <div className='w-[32px] h-[32px] mt-2 bg-[#1b55e2] rounded-full flex items-center justify-center p-2'>
                    <FaChartArea size={18}/>
                    </div>
                  </div>
                  <div className='w-full flex flex-col justify-center'>
                    <p className='text-[#ccc] font-bold text-[21px]'><Link to="/archive">{stats.zone_count != "" ? stats.zone_count : 0 }</Link></p>
                    <span className='text-[#888ea8] font-semibold text-[15px]'>Zone Count</span>
                  </div>
              </div>

              <div className='w-1/4 sm:w-full bg-[#0e1726] shadow min-w-[200px] p-4 flex flex-col rounded-[8px] h-[140px]'>
                  <div className='w-full text-white flex rounded-full mb-2'>
                    <div className='w-[32px] h-[32px] mt-2 bg-[#1b55e2] rounded-full flex items-center justify-center p-2'>
                    <FaChartArea size={18}/>
                    </div>
                  </div>
                  <div className='w-full flex flex-col justify-center'>
                    <p className='text-[#ccc] font-bold text-[21px]'><Link to="/todays">{stats.todayZone_count != "" ? stats.todayZone_count : 0}</Link></p>
                    <span className='text-[#888ea8] font-semibold text-[15px]'>Today's Zone Count</span>
                  </div>
              </div>

              <div className='w-1/4 sm:w-full bg-[#0e1726] shadow min-w-[200px] p-4 flex flex-col rounded-[8px] h-[140px]'>
                  <div className='w-full text-white flex rounded-full mb-2'>
                    <div className='w-[32px] h-[32px] mt-2 bg-[#1b55e2] rounded-full flex items-center justify-center p-2'>
                    <FaUsers size={18}/>
                    </div>
                  </div>
                  <div className='w-full flex flex-col justify-center'>
                    <p className='text-[#ccc] font-bold text-[21px]'><Link to="/best-groups">{stats.group_count != "" ? stats.group_count : 0 }</Link></p>
                    <span className='text-[#888ea8] font-semibold text-[15px]'>Group Count</span>
                  </div>
              </div>

              <div className='w-1/4 sm:w-full bg-[#0e1726] shadow min-w-[200px] p-4 flex flex-col rounded-[8px] h-[140px]'>
                  <div className='w-full text-white flex rounded-full mb-2'>
                    <div className='w-[32px] h-[32px] mt-2 bg-[#1b55e2] rounded-full flex items-center justify-center p-2'>
                    <FaUser size={12}/>
                    </div>
                  </div>
                  <div className='w-full flex flex-col justify-center'>
                    <p className='text-[#ccc] font-bold text-[21px]'><Link to="/best-hackers">{stats.hacker_count != "" ? stats.hacker_count : 0}</Link></p>
                    <span className='text-[#888ea8] font-semibold text-[15px]'>Hacker Count</span>
                  </div>
              </div>

            </div>
            <div className='w-full flex items-center justify-center p-2 bg-[#0e1726] rounded-[8px] text-[#ccc] hover:text-white transition-all duration-300 font-semibold'>
            <span>We thanks to <Link className='text-red-500 underline font-normal' to={`/hacker/${stats.hasOwnProperty("best_hacker") ? stats.best_hacker.hacker_name : null}`}>{stats.hasOwnProperty("best_hacker") ? stats.best_hacker.hacker_name : null}</Link> for being the best hacker with {stats.hasOwnProperty("best_hacker") ? stats.best_hacker.zone_count : null} zone count.</span>
            </div>
            </> : null}

            </>
        : <Loading message="Loading..." />}
        </div>

      </div>
  )
}

export default Statistics