import React, { useState,useEffect } from 'react'
const Locked = ({setShowLocked}) => {
    const [input,setInput]= useState("");
    const [visible,setVisible]= useState(false);
    const [wrong,setWrong] = useState(0);
    const [currPass,setCurrPass] = useState("");
    useEffect(() => {
      const a = localStorage.getItem("todopass")
      setCurrPass(a)
    }, [])
    
  return (
    <div className='min-h-[35vh] relative min-w-[30vw] flex flex-col items-center'>
        <img src="/pass.png" alt="password image" className='h-50 mb-3' />
        <h1 className='text-white text-4xl mb-4'>Enter Password</h1>
        <span className={`text-red-400 mb-3 text-sm ${wrong==0 && "opacity-0"}`}>Incorrect Attempt {wrong}</span>
        <label htmlFor="" className='border-b-2 border-white w-[80%] text-lg flex gap-2 items-center mb-3'>
            <svg onClick={()=>setVisible(prev=>!prev)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="size-8 cursor-pointer mx-2">
  {!visible ? <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
  : <> <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </>
}
</svg>
            <input type={visible?"text" :"password"} id="todo-pass-input" value={input} onChange={e=>setInput(e.target.value)} className='text-white w-[100%] tracking-widest text-center outline-none px-3 py-2 block' placeholder='Your Pass Key' />
           <button onClick={()=>{
            if(input==currPass){
                // success
                setShowLocked(false)
            }else{
                setWrong(prev=>prev+1)
            }
           }} className='bg-blue-700 px-4 rounded cursor-pointer hover:bg-blue-600 py-3'>
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
</svg>
           </button>

        </label>
    </div>
  )
}

export default Locked