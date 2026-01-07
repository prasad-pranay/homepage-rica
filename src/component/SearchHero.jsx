import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'

const EngineButton = ({image,currentEngine,setCurrentEngine,endClass})=>{
       return <motion.img initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0}} onClick={()=>setCurrentEngine(image)} src={image} alt=""  className={`cursor-pointer hover:scale-120 transition duration-150 absolute h-12 rounded-full p-2 bg-black/20 backdrop-blur-xs ${currentEngine==image && "bg-teal-300/20"} ${endClass}`} /> 
}


const SearchHero = (props) => {
    const [search,setSearch] = useState('');
    const [currentEngine,setCurrentEngine] = useState('/google.webp');
    const engineUrl = {
      "/duckduckgo.webp": "https://duckduckgo.com/?t=h_&q=" ,
      "/yandex.png": "https://yandex.com/search/?text=",
      "/google.webp":"https://www.google.com/search?q=" ,
      "/youtube.webp":"https://www.youtube.com/results?search_query=",
      "/brave.png":"https://search.brave.com/search?q=",
      "/bing.png":"https://www.bing.com/search?q="
    }

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


//     const sampleHistoryData = [
//   {
//     id: "1",
//     url: "https://www.google.com/",
//     title: "Google",
//     lastVisitTime: 1704631200000,
//     visitCount: 45,
//     typedCount: 20
//   },
//   {
//     id: "2",
//     url: "https://www.youtube.com/",
//     title: "YouTube",
//     lastVisitTime: 1704708600000,
//     visitCount: 120,
//     typedCount: 5
//   },
//   {
//     id: "3",
//     url: "https://github.com/",
//     title: "GitHub: Where the world builds software",
//     lastVisitTime: 1704723000000,
//     visitCount: 60,
//     typedCount: 15
//   },
//   {
//     id: "4",
//     url: "https://stackoverflow.com/",
//     title: "Stack Overflow - Where Developers Learn",
//     lastVisitTime: 1704719400000,
//     visitCount: 80,
//     typedCount: 2
//   },
//   {
//     id: "5",
//     url: "https://chat.openai.com/",
//     title: "ChatGPT",
//     lastVisitTime: 1704726600000,
//     visitCount: 30,
//     typedCount: 10
//   }
// ];


const [history,setHistoy] = useState([]);
useEffect(() => {
  if(chrome.runtime == undefined){
    return
  }
 chrome.runtime.sendMessage(
  { type: "GET_HISTORY", query: search },
  (results) => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError.message);
      return;
    }
    setHistoy(results)
  }
);
}, [search])



  return (<>
  <AnimatePresence>

     {props.showSearchEngine && <motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0}} onClick={()=>props.setShowSearchEngine(false)} className="fixed left-0 top-0 bg-black/10 h-screen w-screen z-[1800] backdrop-blur-xs"></motion.div>}
  </AnimatePresence>
      <section className='relative'>

      
    <form className={`flex items-center text-sm h-12 px-5 w-[30vw] min-w-[400px] border-2 relative border-transparent ${props.showSearchEngine ? "z-[2000]" : "z-[1000]"} bg-black/10 rounded-4xl backdrop-blur-xs`} onSubmit={e=>{
      e.preventDefault()
      if(search.length<1){
        props.notificationRef.current.show("Search Value should be atlest of 1 charater long...","red",5000)
        return;
      }
      // let engine = localStorage.getItem("search")
      // const url = `${engineUrl[engine]}${search.replaceAll(" ","+")}`
      const url = engineUrl[currentEngine] + search;
      window.open(url,"_self")
      setSearch("")
    }}>
      <div className='mr-2 relative z-[2000]'>
      <img onClick={()=>props.setShowSearchEngine(true)} src={currentEngine} alt="" className='h-4 cursor-pointer active:scale-80 transition duration-150' />

      <AnimatePresence>

      {props.showSearchEngine && <>
      <div onClick={()=>props.setShowSearchEngine(false)} className="absolute w-45 h-45 -translate-x-1/2 -translate-y-1/2 z-[2000]">
        <EngineButton image="/duckduckgo.webp" currentEngine={currentEngine} setCurrentEngine={setCurrentEngine} endClass="top-0 left-1/2 -translate-x-1/2" />
        <EngineButton image="/yandex.png" currentEngine={currentEngine} setCurrentEngine={setCurrentEngine} endClass="top-1/4 left-0 -translate-y-1/4" />
        <EngineButton image="/google.webp" currentEngine={currentEngine} setCurrentEngine={setCurrentEngine} endClass="bottom-1/4 left-0 translate-y-1/4" />
        <EngineButton image="/youtube.webp" currentEngine={currentEngine} setCurrentEngine={setCurrentEngine} endClass="bottom-0 left-1/2 -translate-x-1/2" />
        <EngineButton image="/brave.png" currentEngine={currentEngine} setCurrentEngine={setCurrentEngine} endClass="top-1/4 right-0 -translate-y-1/4" />
        <EngineButton image="/bing.png" currentEngine={currentEngine} setCurrentEngine={setCurrentEngine} endClass="bottom-1/4 right-0 translate-y-1/4" />
      </div>
      </>}
      </AnimatePresence>
      </div>
    <input className="px-2 w-full h-full outline-none text-white font-thin bg-transparent text-lg" id='hero-search-input' onChange={e=>setSearch(e.target.value)} value={search} type="text" autoComplete='off' placeholder="Search something here..."  />
    <button>

    <svg onClick={()=>{if(search.length<1){props.notificationRef.current.show("Search Value should be atlest of 1 charater long...","red",5000)}}} xmlns="http://www.w3.org/2000/svg" fill="none" width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.5" className="cursor-pointer transition-transform duration-200 stroke-[#6B7280] hover:scale-150 hover:strokeWhite">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
    </button>
        

        

</form>
{search.length>0 && <article className="absolute top-14 left-0 w-full flex flex-col gap-2 text-white max-h-45 overflow-y-scroll z-[2000] pr-2 scroll-customize">
  {/* show history here */}
  {history.map((value) => {
    const date = new Date(value.lastVisitTime);

    return (
      <motion.div
      onClick={()=>window.open(value.url,"_self")}
      initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0}}
        key={value.id}
        className="bg-black/10 backdrop-blur-sm px-10 py-2 rounded-2xl"
      >
        <p className='text-base'>{value.title}</p>

        <div className="flex gap-2 items-center text-[9px]">
          {/* Calendar icon */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-3">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
</svg>


          <span>
            {daysOfWeek[date.getDay()]},{" "}
            {date.getDate()} {monthsOfYear[date.getMonth()]},{" "}
            {date.getFullYear()}
          </span>

          {/* Visit count */}
          <p className="ml-auto flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-3">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
</svg>

            {value.visitCount}
          </p>
        </div>
      </motion.div>
    );
  })}
</article>}

</section>





      </>
  )
}

export default SearchHero