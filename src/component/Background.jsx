import React from 'react'

const Background = ({background}) => {
  return (
    <div className='fixed h-screen w-screen object-fit z-[-1]'>
        <img src={background || "/bg2.jpg"} alt="background image" className='w-full h-full object-cover'/>
      </div>
  )
}

export default Background