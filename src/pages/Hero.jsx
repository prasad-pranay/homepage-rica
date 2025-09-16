import React, { useRef, useState } from 'react'
import Time from '../component/Time'
import Wish from '../component/Wish'
import SearchHero from '../component/SearchHero'
import Quote from '../component/quote'
import Sparkle from '../component/Sparkle'
import Context from '../component/Context'
import TodoButton from '../tabs/TodoButton'
import BookmarkButton from '../tabs/BookmarkButton'
import Website from '../tabs/Website'
import Weather from '../component/Weather'
import SettingButton from '../tabs/SettingButton'

const Hero = (props) => {
  const contextRef = useRef(null);
  const [showContext,setShowContext] = useState(false)
  const [contextPos,setContextPos] = useState([0,0]);
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

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
        <SearchHero notificationRef={props.notificationRef}/>
        <Quote />
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