import React from 'react'

function SelectLimit({limit,setLimit,setPrevLimit}) {
  return (
    <div className='w-full'>
        <div className=''>
            <select onChange={(e)=>{setPrevLimit(limit);setLimit(e.target.value)}} className='bg-[#1b2e4b] p-2 w-[80px] rounded-[8px] shadow text-[#ccc] mb-2' name="" id="">
                <option className='text-[#009688]' value="10" selected={limit == 10 ? true : false} >10</option>
                <option className='text-[#009688]' value="20" selected={limit == 20 ? true : false} >20</option>
                <option className='text-[#009688]' value="30" selected={limit == 30 ? true : false}>30</option>
                <option className='text-[#009688]' value="40" selected={limit == 40 ? true : false}>40</option>
            </select>
        </div>
    </div>
  )
}

export default SelectLimit