import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';

function Pagination({props,page,active,refer,temp,setTemp}) {
    const [p,setP] = useState([]);

    const arrayRange = (start, stop, step) =>
    Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
    );

    useEffect(()=>{
       setP(arrayRange(1,page,1));
    },[])
  return (
    <div className='pagination flex gap-2 p-2 h-[40px] items-center mt-4'>
        {p.map((cur,index) => {
            if(cur == active){
                return <Link onClick={()=>{setTemp(temp + 1) }} key={index} className='flex border-[1px] border-[#009688] bg-[#009688] transition-all duration-300 cursor-pointer justify-center list-none p-2  min-w-[30px] text-[13px] text-white' to={`${refer}/${cur}`}>{cur}</Link>
            }else{
                return <Link onClick={()=>{setTemp(temp + 1) }} key={index} className='flex border-[1px] border-[#009688] hover:bg-[#009688] transition-all duration-300 cursor-pointer justify-center list-none p-2  min-w-[30px] text-[13px] text-white' to={`${refer}/${cur}`}>{cur}</Link>
            }
        })}
    </div>
  )
}

export default Pagination