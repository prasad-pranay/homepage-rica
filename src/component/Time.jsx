import React, { useEffect, useState } from 'react'
import Counter from '../reactbit/Counter/Counter'

const Time = () => {
    const [hour,setHour] = useState(0);
    const [minute,setMinute] = useState(0);
    function timeMaker() {
        const now = new Date()
        const currentHour = now.getHours()
        const currentMinute = now.getMinutes()

        const hourInterval = setInterval(() => {
          setHour(prev=>{
            if(prev == currentHour || prev > currentHour){
              clearInterval(hourInterval);
              setHour(currentHour)
            }
            return prev+1;
          })
        }, 100); 

        const minInterval = setInterval(() => {
          setMinute(prev=>{
            if(prev == currentMinute || prev > currentMinute){
              clearInterval(minInterval);
              setMinute(currentMinute)
            }
            return prev+1;
          })
        }, 100); 
        
    }

    useEffect(() => {
      timeMaker()
      const interval = setInterval(() => {
        timeMaker()
      }, 30000);
        
    }, [])
    
  return (
    <h1 className='text-[110px] text-white mb-8 font-extrabold mt-10 text-shadow flex items-center'>
    <Counter
  value={hour}
  places={[10, 1]}
  fontSize={110}
  textColor="white"
/> <span>:</span>
<Counter
  value={minute}
  places={[10, 1]}
  fontSize={110}
  textColor="white"
/>
  </h1>
//    <SplitText
//   text="Hello, GSAP!"
//   className="text-2xl font-semibold text-center"
//   delay={100}
//   duration={0.6}
//   ease="power3.out"
//   splitType="chars"
//   from={{ opacity: 0, y: 40 }}
//   to={{ opacity: 1, y: 0 }}
//   threshold={0.1}
//   rootMargin="-100px"
//   textAlign="center"
// />
  )
}

export default Time