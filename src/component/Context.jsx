import React from 'react'

const Context = ({contextRef,showContext,position,setShowContext,setShowBookmark,setShowSetting,setShowTodo}) => {
  return (
    <div className={`z-90 ${showContext?"opacity-100":"opacity-0 z-[-1]"} transition-opacity transition-all duration-300 text-sm w-56 p-4 bg-gray-900 border border-gray-300/30 text-gray-500 rounded-md font-medium absolute`} style={{top:position[1],left:position[0]}} ref={contextRef}>
    <ul className="flex flex-col gap-2">
        <li className="flex items-center gap-2 hover:bg-gray-700/40 text-gray-300 cursor-pointer px-3 py-2 rounded" onClick={()=>{setShowBookmark(true);setShowContext(false)}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-[18px]">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
</svg>

            <a>BookMark</a>
        </li>
        <li className="flex items-center gap-3 cursor-pointer px-3 py-2 rounded text-gray-300 hover:bg-gray-700/40 transition" onClick={()=>{setShowTodo(prev=>!prev);setShowContext(false)}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-[18px]">
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
</svg>

            <a>Todo Tab</a>
        </li>
        <div className="w-full h-px bg-gray-300/50 my-2"></div>
        <li onClick={()=>setShowContext(false)} className="flex items-center gap-3 cursor-pointer px-3 py-2 rounded text-gray-300 hover:bg-gray-700/40 transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
</svg>

            <a>Quote</a>
        </li>
        <li onClick={()=>{setShowContext(false);document.getElementById("hero-search-input").focus()}} className="flex items-center gap-3 cursor-pointer px-3 py-2 rounded text-gray-300 hover:bg-green-500/40 hover:text-white transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-[18px]">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
        
            <a>Search</a>
        </li>
        <div className="w-full h-px bg-gray-300/50 my-2"></div>
        <li onClick={()=>{setShowSetting(prev=>!prev);setShowContext(false)}} className="flex items-center gap-3 cursor-pointer px-3 py-2 rounded text-gray-300 hover:bg-gray-700/40 transition">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.001 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4" stroke="currentColor" strokeOpacity=".9" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.935 10a1.1 1.1 0 0 0 .22 1.213l.04.04a1.332 1.332 0 0 1-.433 2.176 1.33 1.33 0 0 1-1.454-.289l-.04-.04a1.1 1.1 0 0 0-1.213-.22 1.1 1.1 0 0 0-.667 1.007V14a1.333 1.333 0 1 1-2.667 0v-.06a1.1 1.1 0 0 0-.72-1.007 1.1 1.1 0 0 0-1.213.22l-.04.04a1.334 1.334 0 1 1-1.887-1.886l.04-.04a1.1 1.1 0 0 0 .22-1.214 1.1 1.1 0 0 0-1.006-.666H2A1.333 1.333 0 0 1 2 6.72h.06A1.1 1.1 0 0 0 3.068 6a1.1 1.1 0 0 0-.22-1.213l-.04-.04A1.333 1.333 0 1 1 4.695 2.86l.04.04a1.1 1.1 0 0 0 1.213.22h.053a1.1 1.1 0 0 0 .667-1.007V2a1.333 1.333 0 1 1 2.667 0v.06A1.1 1.1 0 0 0 10 3.067a1.1 1.1 0 0 0 1.214-.22l.04-.04a1.334 1.334 0 1 1 1.886 1.886l-.04.04a1.1 1.1 0 0 0-.22 1.214V6a1.1 1.1 0 0 0 1.007.667H14a1.333 1.333 0 1 1 0 2.666h-.06a1.1 1.1 0 0 0-1.006.667" stroke="currentColor" strokeOpacity="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <a>Setting's</a>
        </li>
    </ul>
</div>
  )
}

export default Context