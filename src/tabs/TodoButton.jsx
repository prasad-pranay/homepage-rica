import React from 'react'

const TodoButton = ({setShowTodo}) => {
  return (
    <div className='group transition-transform duration 200 hover:scale-95  cursor-pointer' onClick={()=>setShowTodo(prev=>!prev)} >
        <img src="/todo.png" alt="Todo Icon" className='h-10 mb-2' />
        <p className='hidden group-hover:block text-white text-sm'>Todo's</p>
    </div>
  )
}
export default TodoButton
