import React from 'react'

const TodoContext = ({showTodoContext,setShowTodoContext,setItems,items}) => {
  return (
    <div className={`text-sm w-64 p-3 bg-gray-800 border border-gray-500/30 text-gray-200/80 rounded-md font-medium fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50  ${showTodoContext==-1 && "hidden"}`}>
    <ul className="flex flex-col gap-px">
        <li className="flex items-center justify-between gap-3 hover:bg-gray-500/20 cursor-pointer px-3 py-2 rounded hover:bg-gray-500/20 transition">
            <a>Info</a>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="m8.997.667 2.575 5.216 5.759.842-4.167 4.058.983 5.734-5.15-2.709-5.15 2.709.984-5.734L.664 6.725l5.758-.842z" stroke="#fff" stroke-opacity="0.8" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </li>
        <li className="flex items-center justify-between gap-2 cursor-pointer px-3 py-2 rounded hover:bg-gray-500/20 transition">
            <a className="-mr-px">Edit</a>
            <svg width="23" height="23" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.672 6.763 5.58 15.854l-.166 2.995 2.995-.166L17.5 9.59m-2.828-2.828 1.348-1.349a2 2 0 1 1 2.829 2.829L17.5 9.59m-2.828-2.828L17.5 9.591" stroke="#fff" strokeWidth=".96" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </li>
        <div className="w-full h-px bg-gray-300/70 my-2"></div>
        {/* <li className="flex items-center justify-between gap-3 cursor-pointer px-3 py-2 rounded hover:bg-gray-500/20 transition">
            <a>Mark Undone</a>
            <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="m6.669 13.167 3.333 3.333m0 0 3.334-3.333M10.002 16.5V9m7.4 5.075a4.166 4.166 0 0 0-2.4-7.575h-1.05a6.667 6.667 0 1 0-11.45 6.075" stroke="#1F2937" stroke-opacity="0.8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </li>
        <li className="flex items-center justify-between gap-3 cursor-pointer px-3 py-2 rounded hover:bg-gray-500/20 transition">
            <a>Duplicate</a>
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.167 1.667H2.5a.833.833 0 0 0-.833.833v11.667a.833.833 0 0 1-1.667 0V2.5A2.5 2.5 0 0 1 2.5 0h11.667a.833.833 0 0 1 0 1.667M10 8.333a.833.833 0 1 1 1.667 0V10h1.666a.833.833 0 1 1 0 1.667h-1.666v1.666a.833.833 0 1 1-1.667 0v-1.666H8.333a.833.833 0 0 1 0-1.667H10z" fill="#1F2937" fill-opacity=".8"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.836 3.333a2.5 2.5 0 0 1 2.5 2.5v10a2.5 2.5 0 0 1-2.5 2.5h-10a2.5 2.5 0 0 1-2.5-2.5v-10a2.5 2.5 0 0 1 2.5-2.5zm0 1.667c.46 0 .833.373.833.833v10c0 .46-.373.834-.833.834h-10a.833.833 0 0 1-.833-.834v-10c0-.46.373-.833.833-.833z" fill="#1F2937" fill-opacity=".8"/>
            </svg>
        </li>
        <li className="flex items-center justify-between gap-3 cursor-pointer px-3 py-2 rounded hover:bg-gray-500/20 transition">
        <a>Analytics</a>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5.25H.25V16.5a1.25 1.25 0 0 0 1.25 1.25h16.25V16.5H1.5z" fill="#1F2937" fill-opacity=".8"/>
        <path d="M17.75 4.625h-4.375v1.25h2.244l-4.744 4.744L8.194 7.93a.625.625 0 0 0-.888 0L2.75 12.494l.881.881L7.75 9.256l2.681 2.688a.626.626 0 0 0 .888 0L16.5 6.756V9h1.25z" fill="#1F2937" fill-opacity=".8"/>
        </svg>
        </li> */}
        <li className="flex items-center justify-between gap-3 cursor-pointer px-3 py-2 rounded hover:bg-gray-500/20 transition" onClick={()=>{setShowTodoContext(-1);setItems(prev => prev.map((item, i) => i === showTodoContext ? [item[0]=='1'?'0':'1',item[1],item[2]] : item))}}>
            <a>Mark {items[showTodoContext]?.[0] == '1' ? "Undone" : "Done"}{}</a>
            <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.836 1.5v15m8.333 0v-15M6.336 14l-2.5 2.5-2.5-2.5M9.672 4l2.5-2.5 2.5 2.5" stroke="#fff" stroke-opacity=".8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </li>
        {/* <li className="flex items-center justify-between gap-3 cursor-pointer px-3 py-2 rounded hover:bg-gray-500/20 transition">
            <a>Project Settings</a>
            <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" stroke="#1F2937" stroke-opacity=".8" strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1.664 9.733V8.267c0-.867.708-1.584 1.583-1.584 1.509 0 2.125-1.066 1.367-2.375a1.583 1.583 0 0 1 .583-2.158l1.442-.825c.658-.392 1.508-.158 1.9.5l.092.158c.75 1.309 1.983 1.309 2.741 0l.092-.158c.392-.658 1.242-.892 1.9-.5l1.442.825a1.583 1.583 0 0 1 .583 2.158c-.758 1.309-.142 2.375 1.367 2.375.866 0 1.583.709 1.583 1.584v1.466c0 .867-.708 1.583-1.583 1.583-1.509 0-2.125 1.067-1.367 2.375a1.58 1.58 0 0 1-.583 2.159l-1.442.825c-.658.392-1.508.158-1.9-.5l-.092-.159c-.75-1.308-1.983-1.308-2.741 0l-.092.159c-.392.658-1.242.892-1.9.5l-1.442-.825a1.583 1.583 0 0 1-.583-2.158c.758-1.309.142-2.376-1.367-2.376a1.59 1.59 0 0 1-1.583-1.583" stroke="#1F2937" stroke-opacity=".8" strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </li> */}
        <li className="flex items-center justify-between gap-3 cursor-pointer px-3 py-2 rounded hover:bg-gray-500/20 transition" onClick={()=>setShowTodoContext(-1)}>
            <a>Cancel</a>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>
        </li>
        <div className="w-full h-px bg-gray-300/50 my-2"></div>
        <li className="flex items-center text-red-600/80 justify-between gap-3 cursor-pointer px-3 py-2 rounded hover:bg-red-600/20 transition">
            <a>Delete Todo</a>
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 3.833h17m-4.25 0-.287-.766c-.28-.744-.419-1.115-.677-1.39a2.1 2.1 0 0 0-.852-.546C11.559 1 11.118 1 10.237 1H8.763c-.881 0-1.322 0-1.697.131a2.1 2.1 0 0 0-.852.546c-.258.275-.398.646-.676 1.39l-.288.766m10.625 0v9.634c0 1.586 0 2.38-.347 2.986a3.04 3.04 0 0 1-1.393 1.238c-.682.309-1.575.309-3.36.309h-2.55c-1.785 0-2.678 0-3.36-.309a3.04 3.04 0 0 1-1.393-1.238c-.347-.606-.347-1.4-.347-2.986V3.833m8.5 3.778v6.611m-4.25-6.61v6.61" stroke="#DC2626" stroke-opacity=".8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </li>
    </ul>
</div>
  )
}

export default TodoContext