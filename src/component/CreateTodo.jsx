import React, { useState } from 'react'

const CreateTodo = ({setItems,notificationRef}) => {
  const [input,setInput] = useState("")
  const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
  return (
    <form className="flex items-center border gap-2 bg-gray-900 border-gray-500/30 h-12 ml-[5%] w-[90%] rounded-full overflow-hidden">
    <input type="text" id='add-todo-input' value={input} onChange={e=>setInput(e.target.value)} placeholder="Your Todo Goes here..." className="w-full h-full pl-6 outline-none text-sm text-white placeholder-gray-500" required />
    <button type="submit" onClick={(e)=>{
      e.preventDefault()
      if(input.replaceAll(" ").length==0){
        notificationRef.current.show("You need to type at least two characters to add a todo.","red",3000)
        return
      }
      let now = new Date();
      setItems(prev=>[["0",`${now.getHours()}:${now.getMinutes()}|${now.getDate()} ${months[now.getMonth()]}`,input],...prev])
      setInput("")
      notificationRef.current.show("Todo created!","green",1500)
    }} className="bg-indigo-700 hover:bg-indigo-800 active:scale-95 cursor-pointer transition w-56 h-10 rounded-full text-sm text-white mr-1 flex items-center justify-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" height="5" width="5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
        Create
    </button>
</form>
  )

}

export default CreateTodo