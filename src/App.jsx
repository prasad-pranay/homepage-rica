import { useEffect, useRef, useState } from 'react'
import React from 'react';
import Background from './component/Background'
import Hero from './pages/Hero'
import Notification from './component/Notification'
import Todo from './pages/Todo';
import Bookmark from './pages/Bookmark';
import Setting from './pages/Setting';

function firstTimer(){
  localStorage.clear();
  localStorage.setItem("name","user")
  localStorage.setItem("wallpaper","")
  // for weather
  localStorage.setItem("lat","28.7041")
  localStorage.setItem("lon","77.1025")
  // search engine ["Google,"Brave","Yandex","Duck Duck Go","Bing"]
  localStorage.setItem("search","Google")
  // hide buttons, 1 to show, 0 to hide
  localStorage.setItem("weather",'1')
  localStorage.setItem("bookmark",'1')
  localStorage.setItem("todo",'1')
  localStorage.setItem("setting",'1')
  // setting todos
  localStorage.setItem("todolist","")
  // setting todo password
  localStorage.setItem("todopass","")
  // if todo lock has been enabled [0,1]
  localStorage.setItem("todolock","0")
}
function App() {
  const notificationRef = useRef()
  // color ['red' , 'green' , 'white']
  const [showTodo,setShowTodo] = useState(false);
  const [showBookmark,setShowBookmark] = useState(false);
  const [showSetting,setShowSetting] = useState(false);
  const [iconsdisplay,setIconsDisplay] = useState({"none":null})
  const [background,setBackground] = useState("");

    // {"todo":true,"bookmark":true,"setting":true,"weather":true})


  useEffect(() => {
    // first time app setup if the user is not even registered
      if(localStorage.getItem("name")==null){
        firstTimer()
      }
    
      // checcking hide values on page load
    let todo = localStorage.getItem('todo')
    let weather = localStorage.getItem('weather')
    let bookmark = localStorage.getItem('bookmark')
    let setting = localStorage.getItem('setting')
    setIconsDisplay({"todo":todo=="1",
    "bookmark":bookmark=="1",
    "setting":setting=="1",
    "weather":weather=="1"})
  }, [])


  useEffect(() => {
    // this use effect is for when icon display is updated
    if("none" in iconsdisplay){
      return
    }
    localStorage.setItem('todo',iconsdisplay.todo?"1":"0")
    localStorage.setItem('weather',iconsdisplay.weather?"1":"0")
    localStorage.setItem('bookmark',iconsdisplay.bookmark?"1":"0")
    localStorage.setItem('setting',iconsdisplay.setting?"1":"0")
  }, [iconsdisplay])
  

  
  
  return (
    <>
      <Background background={background} />
      <Hero notificationRef={notificationRef} setShowBookmark={setShowBookmark} setShowTodo={setShowTodo} iconsdisplay={iconsdisplay} setShowSetting={setShowSetting} />
      <Notification  ref={notificationRef} />
      {showBookmark && <Bookmark setShowBookmark={setShowBookmark} notificationRef={notificationRef} />}
      {showTodo && <Todo setShowTodo={setShowTodo} notificationRef={notificationRef} />}
      {showSetting && <Setting setIconsDisplay={setIconsDisplay} iconsdisplay={iconsdisplay} setBackground={setBackground} setShowSetting={setShowSetting} notificationRef={notificationRef} />}
    </>
  )
}

export default App
