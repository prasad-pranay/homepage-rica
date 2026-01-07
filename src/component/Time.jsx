import React, { useEffect, useState } from 'react';
import Counter from '../reactbit/Counter/Counter';
import { motion } from 'framer-motion';

const Time = () => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);

  useEffect(() => {
    let hourTarget = 0;
    let minuteTarget = 0;
    let animationFrame;

    const updateTime = () => {
      const now = new Date();
      hourTarget = now.getHours();
      minuteTarget = now.getMinutes();

      const animate = () => {
        setHour(prev => Math.min(prev + 1, hourTarget));
        setMinute(prev => Math.min(prev + 1, minuteTarget));

        if (hour < hourTarget || minute < minuteTarget) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animate();
    };

    updateTime();

    const interval = setInterval(updateTime, 60000); // update every minute

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animationFrame);
    };
  }, [hour, minute]);

  return (
    <h1 className='text-[100px] text-white font-extrabold mt-10 text-shadow flex items-center'>
      <Counter value={hour} places={[10, 1]} fontSize={100} textColor="white" />
      <motion.span initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className='mb-7' >:</motion.span>
      <Counter value={minute} places={[10, 1]} fontSize={100} textColor="white" />
    </h1>
  );
};

export default Time;


// import React, { useEffect, useState } from 'react'
// import Counter from '../reactbit/Counter/Counter'

// const Time = () => {
//     const [hour,setHour] = useState(0);
//     const [minute,setMinute] = useState(0);
//     function timeMaker() {
//         const now = new Date()
//         const currentHour = now.getHours()
//         const currentMinute = now.getMinutes()

//         const hourInterval = setInterval(() => {
//           setHour(prev=>{
//             if(prev == currentHour || prev > currentHour){
//               clearInterval(hourInterval);
//               setHour(currentHour)
//             }
//             return prev+1;
//           })
//         }, 50); 

//         const minInterval = setInterval(() => {
//           setMinute(prev=>{
//             if(prev == currentMinute || prev > currentMinute){
//               clearInterval(minInterval);
//               setMinute(currentMinute)
//             }
//             return prev+1;
//           })
//         }, 10); 
        
//     }

//     useEffect(() => {
//       timeMaker()
//       const interval = setInterval(() => {
//         timeMaker()
//       }, 30000);
        
//     }, [])
    
//   return (
//     <h1 className='text-[110px] text-white mb-15 font-extrabold mt-10 text-shadow flex items-center'>
//     <Counter
//   value={hour}
//   places={[10, 1]}
//   fontSize={110}
//   textColor="white"
// /> <span>:</span>
// <Counter
//   value={minute}
//   places={[10, 1]}
//   fontSize={110}
//   textColor="white"
// />
//   </h1>
//   )
// }

// export default Time