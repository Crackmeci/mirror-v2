import React from 'react'

function Container({children,style}) {
  return (
    <div className='container w-[95%] m-auto' style={style}>
        {children}
    </div>
  )
}

export default Container