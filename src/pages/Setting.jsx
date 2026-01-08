import React, { useEffect, useState } from "react";
import { openDB } from "idb";
import { AnimatePresence, motion } from "framer-motion";
const SettingHideButton = ({svgPath,title,val, iconsdisplay, setIconsDisplay})=>{
    return <div className="flex py-2 gap-2 items-center mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
  <path strokeLinecap="round" strokeLinejoin="round" d={svgPath} />
</svg>
<p className="text-base">{title}</p>
<label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3 ml-auto">
        <input type="checkbox" className="sr-only peer" checked={iconsdisplay[val]}  onChange={(e)=>setIconsDisplay(prev=>({...prev,[val]:e.target.checked}))} />
        <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-indigo-600 transition-colors duration-200"></div>
        <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
    </label>
    </div>

}


const CitySearch = ({setLatLon}) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Fetch suggestions from Nominatim
  const fetchSuggestions = async (cityName) => {
    if (!cityName) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          cityName
        )}&format=json&limit=3`
      );
      const data = await response.json();

      // Map results to a simple format
      const formatted = data.map((item) => ({
        name: item.display_name,
        lat: item.lat,
        lon: item.lon,
      }));

      setSuggestions(formatted);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    fetchSuggestions(value);
  };

  const current = localStorage.getItem("city")

  return (
    <section>

   
    <div className="flex flex-col">
      <h2 className="text-lg mb-3">Search City</h2>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Type a city name..."
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginBottom: "10px",
          fontSize: "16px",
        }}
      />

      {suggestions.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            border: "1px solid #ccc",
            borderRadius: "5px",
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {suggestions.map((city, index) => (
            <li
              key={index}
              style={{
                padding: "10px",
                borderBottom: index < suggestions.length - 1 ? "1px solid #eee" : "none",
                cursor: "pointer",
              }}
              onClick={() => {
                setQuery(city.name);
                setSuggestions([]);
                setLatLon([city.lat,city.lon])
                localStorage.setItem("city",city.name)
              }}
            >
              {city.name}
            </li>
          ))}
        </ul>
      )}
    </div>


    <div className="mt-5">
      <h1 className="text-lg">Current Place</h1>
      <p className="text-sm">{current}</p>
    </div>

     </section>
  );
};



const Setting = ({iconsdisplay,setIconsDisplay,setBackground,setShowSetting, notificationRef,showSetting}) => {
  const [name, setName] = useState("");
  const [tab, setTab] = useState(0);
  const [currSearch,setCurrSearch] = useState(-1);
  const [city,setCity] = useState("");
  const searchList = ["Google","Brave","Yandex","Duck Duck Go","Bing"]
  const [todoPass,setTodoPass] = useState(() => {
  return localStorage.getItem("todopass");
});
  const [latLon,setLatLon] = useState([])
  useEffect(() => {
    // Loading current Search engine
    var a = localStorage.getItem("search")
    let index = searchList.indexOf(a)
    setCurrSearch(index)
    // loading user name
    a = localStorage.getItem("name");
    setName(a)
    // loading latitude and longitude
    let lat = localStorage.getItem("lat")
    let lon = localStorage.getItem("lon")
    setLatLon([lat,lon])
  }, [])

//   for search engine choosing and updating
  useEffect(() => {
    if(currSearch==-1){
        return
    }
    localStorage.setItem("search",searchList[currSearch])
  }, [currSearch])

//   For updating latitude and longitude
  useEffect(() => {
    if(latLon==[]){
        return
    }
    localStorage.setItem("lat",latLon[0])
    localStorage.setItem("lon",latLon[1])
  }, [latLon])

//   For chaigning name
  useEffect(() => {
    if(name==""){
        return
    }
    localStorage.setItem("name",name)
  }, [name])

  useEffect(() => {
    localStorage.setItem("todopass",todoPass)
  }, [todoPass])
  

  const [db, setDb] = useState(null);
  const [images, setImages] = useState([]);

  // 1️⃣ Initialize IndexedDB
  useEffect(() => {
    const initDB = async () => {
      const database = await openDB("ImagesDB", 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains("images")) {
            db.createObjectStore("images", { keyPath: "id", autoIncrement: true });
          }
        },
      });
      setDb(database);
      loadImages(database);
    };
    initDB();
  }, []);
  // 2️⃣ Load all images from IndexedDB
  const loadImages = async (database) => {
    const tx = database.transaction("images", "readonly");
    const store = tx.objectStore("images");
    const allImages = await store.getAll();
    setImages([{ id: -1, image: "/bg2.jpg" },{id: -2, image: "/bg.jpg"},{id: -6, image: "/bg1.jpg"},{id: -3, image: "/bg3.jpg"},{id: -4, image: "/bg5.jpg"},{id: -5, image: "/bg4.jpg"}, ...allImages]);
  };
  // 3️⃣ Handle file upload
  const handleUpload = async (files) => {
    if (!files.length) return;

    for (let file of files) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageData = e.target.result; // Base64 string
        const tx = db.transaction("images", "readwrite");
        const store = tx.objectStore("images");
        await store.add({ image: imageData, name: file.name }); // save name too
        await tx.done;
        loadImages(db); // refresh displayed images
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteImage = async (id) => {
  if (!db) return; // Make sure DB is initialized
  const tx = db.transaction("images", "readwrite");
  const store = tx.objectStore("images");
  
  await store.delete(id);  // Delete by ID
  await tx.done;

  // Update state to remove image from UI
  setImages((prev) => prev.filter((img) => img.id !== id));
  console.log(`Image with id ${id} deleted`);
};

  
  const dashboardicon = (
    <svg
      className="w-6 h-6"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Zm16 14a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2ZM4 13a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6Zm16-2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6Z"
      />
    </svg>
  );

  const searchEngine = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
      />
    </svg>
  );
  const hideIcon = (
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
        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    </svg>
  );

  const credIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
<path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>

    // <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    //     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 9h5m3 0h2M7 12h2m3 0h5M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.616a1 1 0 0 0-.67.257l-2.88 2.592A.5.5 0 0 1 8 18.477V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
    // </svg>
  );
  const locationIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
      />
    </svg>

    // <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    //     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 9h5m3 0h2M7 12h2m3 0h5M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.616a1 1 0 0 0-.67.257l-2.88 2.592A.5.5 0 0 1 8 18.477V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
    // </svg>
  );

  const wallpaperIcon = (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>
)

  const sidebarLinks = [
    { name: "Dashboard", icon: dashboardicon },
    { name: "Wallapaper", icon: wallpaperIcon },
    // { name: "Engine", icon: searchEngine },
    { name: "Widget", icon: hideIcon },
    { name: "Location", icon: locationIcon },
    { name: "Credential", icon: credIcon },
  ];

  const searchEngineList = [
    ["Google","/google.webp"],
    ["Brave","/brave.png"],
    ["Yandex","/yandex.png"],
    ["Duck Duck Go","/duckduckgo.webp"],
    ["Bing","/bing.png"],
  ]

  const [currentImageContext,setCurrentImageContext] = useState(null);
  

  return <>
  <div onClick={()=>setShowSetting(false)} className={`fixed top-0 left-0 h-screen w-screen bg-black/1 ${showSetting ? "scale-100":"scale-0"}`}></div>
    <section className={`${showSetting ? "scale-100 translate-x-0 translate-y-0" : "scale-0 -translate-x-[50%] translate-y-[50%]"} transition duration-300 fixed bottom-3 left-3 bg-gay-900 backdrop-blur-sm bg-black/20 z-[1500]`}>

      <div className="flex items-center px-4 md:px-8 border-b border-gray-500 py-4 transition-all duration-300">
        <p className="text-indigo-500 font-semibold text-3xl mr-2">Hi, </p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-indigo-500 font-semibold text-3xl outline-none mr-auto capitalize"
        />
        <div className="flex items-center gap-5 text-gray-500">
          {/* <p>Hi! Admin</p> */}
          <button className="rounded text-sm py-1 cursor-pointer group" onClick={()=>{setShowSetting(false)
            notificationRef.current.show("Changes Updated!","white","1000")
          }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="white"
              className="size-7 group-hover:stroke-red-500 transition-stroke duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
              />
            </svg>
          </button>
        </div>
      </div>
      <aside className="flex">
        {/* left side navigation tabs */}
        <div className="w-max border-r h-auto text-base border-gray-500 py-4 flex flex-col transition-all duration-300">
          {sidebarLinks.map((item, index) => (
            <a
              key={index}
              onClick={() => setTab(index)}
              className={`flex items-center py-4 px-4 pr-15 gap-3 cursor-pointer border-r-4 transition duration-100 group
                                ${
                                  index == tab
                                    ? "border-r-4 md:border-r-[6px] bg-indigo-500/10 border-indigo-500 text-indigo-500"
                                    : "hover:bg-indigo-500/10 border-white text-gray-500 border-r-transparent"
                                }`}
            >
              {item.icon}
              <p className="md:block hidden text-center group-active:scale-85 transition duration-100">{item.name}</p>
            </a>
          ))}
        </div>
        {/* right side setting pages */}
        <div className="text-gray-400 px-5 py-3 h-[310px] w-[370px] overflow-y-scroll scroll-customize">
            {tab==0 && <>
          <div className="grid grid-cols-[auto_1fr] gap-2 mb-7 items-center">
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
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            <p className="text-base">Name</p>
            <input
              type="text"
              placeholder="Enter Your Name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-2 border-2 border-gray-600 p-2 rounded outline-none text-base"
            />
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-2">
            <label
              htmlFor="fileInput"
              className="border rounded-md text-sm w-80 border-indigo-600/60 p-8 flex flex-col col-span-2 items-center gap-4  cursor-pointer hover:border-indigo-500 transition"
              >
              <svg
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                  d="M25.665 3.667H11a3.667 3.667 0 0 0-3.667 3.666v29.334A3.667 3.667 0 0 0 11 40.333h22a3.667 3.667 0 0 0 3.666-3.666v-22m-11-11 11 11m-11-11v11h11m-7.333 9.166H14.665m14.667 7.334H14.665M18.332 16.5h-3.667"
                  stroke="#2563EB"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  />
              </svg>
              <p className="text-gray-500">Drag & drop your files here</p>
              <p className="text-gray-400">
                Or <span className="text-indigo-500 underline">click</span> to
                upload
              </p>
              <input id="fileInput" type="file" accept="image/*" className="hidden" onChange={e=>{
                const file = e.target.files[0];
                if (file) {
                  const url = URL.createObjectURL(file);
                  setBackground(url);
                }
                handleUpload(e.target.files)
              }} />
            </label>
            {/* <button className="col-span-2 flex items-center border-2 border-red-600 p-2 justify-center gap-2 text-red-500 cursor-pointer">
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
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              Load Default Wallpaper
            </button> */}
          </div>
                  </>}
            {tab==1 && 
            <div className="grid grid-cols-[1fr_1fr] gap-6 pb-10 h-[100%] py-2">

            {images.map((img) => (
              <div onContextMenu={(e)=>{e.preventDefault();if(currentImageContext==img.id){setCurrentImageContext(null)}else if(img.id>0){setCurrentImageContext(img.id)}}} key={img.id} onClick={()=>{if(currentImageContext==img.id){setCurrentImageContext(null)}else{setBackground(img.image)}}} className="relative cursor-pointer hover:scale-105 active:scale-95 transition duration-150 h-max">
            <img src={img.image} className="w-full w-max rounded-sm" />
                <AnimatePresence>
            {currentImageContext==img.id && <motion.div onClick={()=>{if(img.id>0){deleteImage(img.id)}}} className="absolute left-0 top-0 flex items-center h-full w-full justify-center bg-black/30 backdrop-blur-xs" initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0}}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="size-8 bg-red-600 p-1 rounded-lg stroke-white">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

            </motion.div>}
            </AnimatePresence>
          </div>
        ))}
            </div>}
            {/* {tab==2 && 
            <div className="grid grid grid-cols-[1fr_1fr_1fr] gap-6 justify-center items-center h-[100%] py-5">
            {searchEngineList.map((value,index)=>(
                <button key={index} className="flex flex-col items-center gap-2 relative cursor-pointer" onClick={()=>setCurrSearch(index)}>
                    {index==currSearch && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white"  className="size-8 absolute top-[-10px] right-[-10px]">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

}
                    <img src={value[1]} alt={value[0]} className={`size-10 ${index==currSearch && "scale-110"}`} />
                    <p className={`text-xs ${index==currSearch && "text-white"}`}>{value[0]}</p>
                </button>
            ))}
            </div>} */}
            {tab==2 && <div className="py-4">
                <SettingHideButton iconsdisplay={iconsdisplay} setIconsDisplay={setIconsDisplay} val="weather" title="Weather" svgPath="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
                <SettingHideButton iconsdisplay={iconsdisplay} setIconsDisplay={setIconsDisplay} val="bookmark" title="Bookmark" svgPath="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                <SettingHideButton iconsdisplay={iconsdisplay} setIconsDisplay={setIconsDisplay} val="todo" title="Todo Button" svgPath="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                <SettingHideButton iconsdisplay={iconsdisplay} setIconsDisplay={setIconsDisplay} val="setting" title="Setting Icon" svgPath="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
            </div>}
            {/* {tab==3 && <div>
                <div className="grid grid-cols-[1fr_1fr] gap-y-3 mb-9 gap-x-5 py-8">
                    <p className="flex items-center gap-2 text-base"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
</svg>
Latitude</p>
                    <p className="flex items-center gap-2 text-base"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
</svg>
Logitude</p>
                    <input type="number" placeholder="e.g. 28.7041" className="w-[100%] outline-none border-b-2 text-base" value={latLon[0]} onChange={e=>setLatLon(prev=>[e.target.value,prev[1]])} />
                    <input type="number" placeholder="e.g. 77.1025" className="w-[100%] outline-none border-b-2 text-base" value={latLon[1]} onChange={e=>setLatLon(prev=>[prev[0],e.target.value])} />
                </div>
                <div>
                    <p className="flex items-center gap-2 text-lg mb-3"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
</svg>
Search By City Name</p>
<label htmlFor="city-name" className="flex">
<input id="city-name" type="text" placeholder="Enter City name..." value={city} onChange={e=>setCity(e.target.value)} className="w-[100%] outline-none border-b-2 mt-2 text-base" />
<button className="bg-blue-700 px-2 rounded cursor-pointer" onClick={()=>{
    window.open(`https://www.google.com/search?q=latitude+and+longitude+of+${city.replace(" ","+")}`,"_blank")
    setCity("")
}}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
</svg>
</button>
</label>
                </div>
            </div>} */}
            {tab==3 && <CitySearch setLatLon={setLatLon} />}
            {tab==4 && <div>
              <p className="text-xl text-gray-200 mb-2">Todo Password</p>
              <input type="text" placeholder="Enter the password" value={todoPass} onChange={e=>setTodoPass(e.target.value)} className="text-gray-300 text-base outline-none border-b-2 w-[100%] px-2 py-3" />
              </div>}
        </div>
      </aside>
    </section>
  </>;
};

export default Setting;












