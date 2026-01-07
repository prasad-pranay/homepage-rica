import { motion, scale } from 'framer-motion';
import React, { useState } from 'react'

const ToggleView = ({ gridView, setGridView, fullScreen }) => {
  return (
    <div
      className={`flex space-x-2 bg-gry-800 bg-black/10 backdrop-blur-sm p-1 border border-gray-500/50 rounded-full text-sm ${
        fullScreen ? "top-[140px] right-[90px]" : "top-[100px] right-[20px]"
      }`}
    >
      <div className="flex items-center active:scale-85 transition duration-100" onClick={() => setGridView(true)}>
        <input
          type="radio"
          name="options"
          id="html"
          className="hidden peer"
          checked={gridView}
        />
        <label
          htmlFor="html"
          className="cursor-pointer rounded-full py-2 px-9 text-gray-500 transition-colors duration-200 peer-checked:bg-indigo-600 peer-checked:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
            />
          </svg>
        </label>
      </div>
      <div className="flex items-center active:scale-85 transition duration-100" onClick={() => setGridView(false)}>
        <input
          type="radio"
          name="options"
          id="css"
          className="hidden peer"
          checked={!gridView}
        />
        <label
          htmlFor="css"
          className="cursor-pointer rounded-full py-2 px-9 text-gray-500 transition-colors duration-200 peer-checked:bg-indigo-600 peer-checked:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        </label>
      </div>
    </div>
  );
};

const ControlButton = ({svgPath,color,click,text})=>{
    return (<button className='bg-gry-800 px-5 py-2 rounded h-12 group cursor-pointer relative bg-black/10 backdrop-blur-sm' onClick={click}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={color} className="size-6 transition-transform duration-200 group-hover:scale-115">
  <path strokeLinecap="round" strokeLinejoin="round" d={svgPath} />
</svg>
        <p className='absolute text-gray-300 px-2 text-sm translate-x-[-50%] left-[50%] hidden group-hover:block mt-3'>{text}</p>

        </button>)
}

const Navbar = ({setHistory,histTitle=[],fullScreen,setGridView,gridView,setFullScreen,setShowBookmark,setSearch,search,searchList}) => {
    const [isFocused, setIsFocused] = useState(false);
  return (
    <aside className='grid w-full grid-cols-[auto_auto_auto_1fr_auto_auto] items-center text-white gap-5 px-5 py-5 border-b-1 border-gray-500'>
        <ControlButton svgPath="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" color="#fa5252" click={()=>setShowBookmark(false)} text="Close" />
        {/* make small screne */}
        <ControlButton svgPath={fullScreen ?"M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" :"M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"} color="currentColor" click={()=>setFullScreen(prev=>!prev)} text={!fullScreen?"Minimise":"Maximise"}/>
        {/* Back button here */}
        <ControlButton svgPath="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" color={histTitle.length==0 ? "#555" : "currentColor"} click={()=>setHistory(prev=>prev.slice(0,-1))} text={histTitle.length==0 ? "Disabled" : "Back"} />


{/* page history here */}
<div className="flex oveflow-x-scroll whitespace-nowrap items-center space-x-2 text-sm text-gray-500 font-medium bg-gry-800 bg-black/10 backdrop-blur-sm px-5 py-2 rounded">
    <button type="button" aria-label="Home" className='relative group' onClick={()=>setHistory(prev=>[])}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className='fill-gray-400 hover:fill-gray-300 cursor-pointer'>
            <path d="M16 7.609c.352 0 .69.122.96.343l.111.1 6.25 6.25v.001a1.5 1.5 0 0 1 .445 1.071v7.5a.89.89 0 0 1-.891.891H9.125a.89.89 0 0 1-.89-.89v-7.5l.006-.149a1.5 1.5 0 0 1 .337-.813l.1-.11 6.25-6.25c.285-.285.67-.444 1.072-.444Zm5.984 7.876L16 9.5l-5.984 5.985v6.499h11.968z" fill='inherit' strokeWidth=".094"/>
        </svg>
        <p className='absolute text-gray-300 px-2 text-sm translate-x-[-50%] left-[50%] hidden group-hover:block'>Home</p>
    </button>
    {histTitle.map((value,index)=>(
        <span key={index} className='flex items-center gap-2'>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" >
        <path d="m14.413 10.663-6.25 6.25a.939.939 0 1 1-1.328-1.328L12.42 10 6.836 4.413a.939.939 0 1 1 1.328-1.328l6.25 6.25a.94.94 0 0 1-.001 1.328" fill="#CBD5E1"/>
    </svg>
        <a onClick={()=>setHistory(prev=>prev.slice(0,index+1))} className={`cursor-pointer ${index+1==histTitle.length? "text-indigo-500 hover:text-indigo-600" : "text-gray-500 hover:text-gray-400"} `}>{value}</a>
        </span>
    ))}
    {/* <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="m14.413 10.663-6.25 6.25a.939.939 0 1 1-1.328-1.328L12.42 10 6.836 4.413a.939.939 0 1 1 1.328-1.328l6.25 6.25a.94.94 0 0 1-.001 1.328" fill="#CBD5E1"/>
    </svg>
    <a className='cursor-pointer  hover:text-gray-400'>E-Commerce</a>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="m14.413 10.663-6.25 6.25a.939.939 0 1 1-1.328-1.328L12.42 10 6.836 4.413a.939.939 0 1 1 1.328-1.328l6.25 6.25a.94.94 0 0 1-.001 1.328" fill="#CBD5E1"/>
    </svg>
    <a className='cursor-pointer  hover:text-gray-400'>Product</a>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="m14.413 10.663-6.25 6.25a.939.939 0 1 1-1.328-1.328L12.42 10 6.836 4.413a.939.939 0 1 1 1.328-1.328l6.25 6.25a.94.94 0 0 1-.001 1.328" fill="#CBD5E1"/>
    </svg>
    <a className="text-indigo-500">Earphones</a> */}
</div>

{/* Search bar here */}
<div className="flex items-center gap-2 z-100 h-[46px] relative max-w-md w-full bg-gr-800 bg-black/10 backdrop-blur-sm px-5 py-2 rounded">
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="#6B7280">
        <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8"/>
    </svg>
    <input type="text" placeholder="Find links..." onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} value={search} onChange={e=>setSearch(e.target.value)} className="w-full h-full outline-none placeholder-gray-500 text-gray-500 bg-transparent text-sm" />
    {/* <button type="submit" className="bg-black backdrop-blur-sm w-32 h-9 rounded-full text-sm text-white">Search</button> */}
    <div className={`h-auto p-2 w-[100%] max-w-[100%] bg-gra-800 bg-black/20 backdrop-blur-xl absolute top-[120%] overflow-x-hidden left-0 overflow-y-scroll scroll-customize max-h-[50vh] transition duration-300 ${isFocused?"scale-100":"scale-0"}`}>
        {searchList.map((value,index)=>(
            <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} key={index} onClick={()=>window.open(value.url,"_blank")} className='flex px-2 py-2 gap-2 hover:bg-gry-700 active:scale-80 transition duration-100 hover:bg-black/10 hover:backdrop-blur-sm cursor-pointer items-center'>
                <img src={`https://www.google.com/s2/favicons?domain=${value.url}`} alt="" className='h-5 w-5'/>
                <p className='whitespace-nowrap oveflow-hidden truncate text-xs'>{value.title}</p>
            </motion.div>
        ))}
        {searchList.length == 0 && search.length>1 && <div className='flex px-2 py-2 gap-5 justify-center cursor-pointer items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>
                <p className='whitespace-nowrap oveflow-hidden truncate text-red-500 text-sm'>No Result Matching With Your Search...</p>
            </div>}
            {search.length <= 1 && <div className='flex px-2 py-2 gap-5 justify-center cursor-pointer items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="green" class="size-6 stroke-green-500">
  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
                <p className='whitespace-nowrap oveflow-hidden truncate text-white text-base'>Start Searching More...</p>
            </div>}
    </div>
</div>

<ToggleView
              gridView={gridView}
              setGridView={setGridView}
              fullScreen={fullScreen}
            />
    </aside>
  )
}

export default Navbar