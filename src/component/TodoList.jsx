import React from 'react'
import AnimatedList from '../reactbit/AnimatedList/AnimatedList'

const TodoList = ({setShowTodoContext,items,setItems}) => {
  return (
    <aside>
        <AnimatedList
          items={items}
          onItemSelect={(item, index) => console.log(item, index)}
          showGradients={true}
          enableArrowNavigation={true}
          displayScrollbar={true}
          setShowTodoContext={setShowTodoContext}
          setItems={setItems}
        />
        {items.length==0 && <div className='flex flex-col items-center justify-center max-h-[30vh] overflow-y-auto'>
          <img src="/empty.gif" alt="empty" className='size-25 mb-3' />
          <h1 className='text-white text-4xl mb-3'>Todo is feeling Lonely</h1>
          <p className='text-gray-500 text-sm mb-3'>Make it happier by creating your first Todo!!</p>
          </div>}
    </aside>
  )
}

export default TodoList