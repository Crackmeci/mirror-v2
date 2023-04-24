import React from 'react'
import {ColorRing} from 'react-loader-spinner';

function Loading({message}) {
  return (
    <div className='w-full mt-2 rounded-[8px] bg-[#1b2e4b] text-[#009688] p-2 flex items-center'>
        <ColorRing
        visible={true}
        height="32"
        width="32"
        style={{background:'#009688'}}
        ariaLabel="loading"
        colors={['#009688','#009688','#009688','#009688','#009688']}
        />
        <span>{message}</span>
        </div>
  )
}

export default Loading