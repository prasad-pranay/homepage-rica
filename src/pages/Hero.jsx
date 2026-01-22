import React, { useRef, useState } from 'react'
import Time from '../component/Time'
import Wish from '../component/Wish'
import SearchHero from '../component/SearchHero'
// import Quote from '../component/quote'
import Sparkle from '../component/Sparkle'
import Context from '../component/Context'
import TodoButton from '../tabs/TodoButton'
import BookmarkButton from '../tabs/BookmarkButton'
// import Website from '../tabs/Website'
import Weather from '../component/Weather'
import SettingButton from '../tabs/SettingButton'
import { motion } from 'framer-motion'
// import TodoConfirm from '../component/TodoConfirm'

const ShortCut = ({img,link})=>{ 
  return <motion.div onClick={()=>window.open(link,"_self")} className='px-3 py-3 backdrop-blur-sm bg-black/10 rounded-xl overflow-hidden transition duration-100 hover:scale-120 active:scale-80 cursor-pointer'>
    <img src={img} alt="" className='h-6' />
  </motion.div>
}

const Hero = (props) => {
  const contextRef = useRef(null);
  const [showContext,setShowContext] = useState(false)
  const [contextPos,setContextPos] = useState([0,0]);
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
const [showSearchEngine,setShowSearchEngine] = useState(false);
  return (
    <section className='flex flex-col justify-center items-center align-center h-screen w-screen' onContextMenu={e=>{
      e.preventDefault();
      setShowContext(prev=>true)
      setContextPos(prev=>[(e.pageX+250>screenWidth)? e.pageX-250 : e.pageX,(e.pageY+300>screenHeight)? e.pageY-300 : e.pageY])
    }}
     onClick={(e)=>{
      if (contextRef.current && contextRef.current.contains(e.target)) {
        // console.log('Clicked INSIDE the container');
      } else {
        // console.log('Clicked OUTSIDE the container');
        setShowContext(false);
      }
    }}
    >
        <Time />
        <Wish />
        <SearchHero notificationRef={props.notificationRef} showSearchEngine={showSearchEngine} setShowSearchEngine={setShowSearchEngine}/>
        {/* shortcuts */}
        <section className='flex gap-x-5 mt-5 relative z-[100]'>
          <ShortCut img="/gmail.webp" link="https://mail.google.com/mail/u/0/" />
          <ShortCut img="/youtube.webp" link="https://www.youtube.com/" />
          <ShortCut img="/linkedin.png" link="https://www.linkedin.com/" />
          <ShortCut img="/office.webp" link="https://m365.cloud.microsoft/" />
          <ShortCut img="/chatgpt.png" link="https://chatgpt.com/" />
        </section>

        {/* {showSearchEngine && <div onClick={()=>setShowSearchEngine(false)} className="fixed left-0 top-0 bg-black/10 h-screen w-screen z-[1800] backdrop-blur-xs"></div>} */}
        {/* <Quote /> */}
        <Sparkle />
        <Context contextRef={contextRef} showContext={showContext} setShowContext={setShowContext} position={contextPos} setShowTodo={props.setShowTodo} setShowBookmark={props.setShowBookmark} setShowSetting={props.setShowSetting}/>
        {props.iconsdisplay.weather && <Weather />}
        <aside className='absolute top-10 left-10 flex gap-10 select-none'>
          {props.iconsdisplay.todo && <TodoButton setShowTodo={props.setShowTodo} />}
          {props.iconsdisplay.bookmark && <BookmarkButton setShowBookmark={props.setShowBookmark} />}
        </aside>
        {props.iconsdisplay.setting && <SettingButton setShowSetting={props.setShowSetting} />}
    </section>
  )
}

export default Hero