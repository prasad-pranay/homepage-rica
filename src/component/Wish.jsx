import React, { useEffect, useState } from 'react'

const Wish = () => {
  // const [name,setName] = useState("")
  // useEffect(() => {
  //   let a = localStorage.getItem("name")
  //   setName(a)
  // }, [])

  const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const monthsOfYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];


const date = new Date;
  
  return (
    <div className='text-white text-2xl font-thin mb-10 text-shadow'>
        {/* <p className='capitalize'>Good Morning, {name}!</p> */}
        <p className='capitalize'>{daysOfWeek[date.getDay()]},&nbsp;&nbsp;{monthsOfYear[date.getMonth()]} {date.getDate()}</p>
    </div>
  )
}

export default Wish