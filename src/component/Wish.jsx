import React, { useEffect, useState } from 'react'

const Wish = () => {
  const [name,setName] = useState("")
  useEffect(() => {
    let a = localStorage.getItem("name")
    setName(a)
  }, [])
  
  return (
    <div className='text-white text-2xl font-semibold mb-20 text-shadow'>
        <p className='capitalize'>Good Morning, {name}!</p>
    </div>
  )
}

export default Wish