import React, { useEffect, useState } from 'react'

const SearchHero = (props) => {
    const [search,setSearch] = useState('');
    const [engine,setEngine] = useState('');
    const engineUrl = {
      "Google":"https://www.google.com/search?q=",
      "Brave":"https://search.brave.com/search?q=",
      "Yandex":"https://yandex.com/search/?text=",
      "Duck Duck Go":"https://duckduckgo.com/?t=h_&q=",
      "Bing":"https://www.bing.com/search?q="
    }
    // laoding the current searhc engine
    // useEffect(() => {
    //   let a = localStorage.getItem("search")
    //   setEngine(a)
    // }, [])
    
  return (
    <form className="flex items-center text-sm h-12 px-5 w-[35vw] border-2 border-transparent z-50 hero-search" onSubmit={e=>{
      e.preventDefault()
      if(search.length<1){
        props.notificationRef.current.show("Search Value should be atlest of 1 charater long...","red",5000)
        return;
      }
      let engine = localStorage.getItem("search")
      const url = `${engineUrl[engine]}${search.replaceAll(" ","+")}`
      window.open(url,"_self")
      setSearch("")
    }}>
    <input className="px-2 w-full h-full outline-none text-white bg-transparent text-xl" id='hero-search-input' onChange={e=>setSearch(e.target.value)} value={search} type="text" autoComplete='off' placeholder="Search something here..."  />
    <button>

    <svg onClick={()=>{if(search.length<1){props.notificationRef.current.show("Search Value should be atlest of 1 charater long...","red",5000)}}} xmlns="http://www.w3.org/2000/svg" fill="none" width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.5" className="cursor-pointer transition-transform duration-200 stroke-[#6B7280] hover:scale-150 hover:strokeWhite">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
    </button>

</form>
  )
}

export default SearchHero