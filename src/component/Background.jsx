import React, { useEffect, useState } from 'react'

const Background = ({background}) => {
  const [bg,setBg] = useState("/bg2.jpg")

  useEffect(() => {
    const defaultbg = localStorage.getItem("background");
    if(defaultbg!=null && defaultbg!="undefined" && defaultbg!=undefined){
      setBg(defaultbg)
    }
  }, [])
  

  return (
    <div className='fixed h-screen w-screen object-fit z-[-1]'>
        <img src={background || bg} alt="background image" className='w-full h-full object-cover'/>
      </div>
  )
}

export default Background