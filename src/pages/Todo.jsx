import {useState,useEffect, useRef} from 'react'
import Navbar from '../component/Navbar'
import CreateTodo from '../component/CreateTodo'
import TodoList from '../component/TodoList'
import TodoContext from '../component/TodoContext'
import TodoConfirm from '../component/TodoConfirm'
import Locked from '../component/Locked'

const Blank=()=>{
  return <div className="w-[100%] h-[100%] fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] rounded-lg">

  </div>
}

const Todo = ({setShowTodo,notificationRef}) => {

  const [showTodoContext,setShowTodoContext] = useState(-1)
  const [showTodoClear,setShowTodoClear] = useState(false)
  const dragRef = useRef()
  const [items,setItems] = useState([]); 
  // const [showLocked,setShowLocked] = useState(false);
  const [showLocked, setShowLocked] = useState(() => {
  return localStorage.getItem("todolock") === "1";
});

  useEffect(() => {
    let a = localStorage.getItem("todolist").split("{-|-}")
    let list = []
    // value:   "isThisChecked[0,1]  ;:;  creation date and time  ;:;  value"
    a.map((value)=>{
      if(value.length>3){
        list.push(value.split(";:;"))
      }
    })
      setItems(list);
  }, [])
  

  useEffect(() => {
    let s = ""
    items.map((value,index)=>{
      value.map(val=>{if(val.length>0)s+=val+";:;"})
      s+="{-|-}"
    })
    localStorage.setItem("todolist",s)
  }, [items])


  // localStorage.setItem("todolist","0;:;11:35|21 August;:;My first Todo{-|-}")

  return (
    <section ref={dragRef} className='fixed bottom-2 right-2 backdrop-blur-sm bg-[#101010] min-h-[433px] min-w-[553px] p-5 px-6 rounded-lg z-[1100] border-2 border-gray-500 overflow-hidden'>
        {showLocked ? <Locked setShowLocked={setShowLocked} /> :
          <>
          <Navbar setShowTodo={setShowTodo} setShowTodoClear={setShowTodoClear} notificationRef={notificationRef} dragRef={dragRef} />
        <CreateTodo setItems={setItems} notificationRef={notificationRef} />
        <TodoList setShowTodoContext={setShowTodoContext} setItems={setItems} items={items} />
        <TodoContext showTodoContext={showTodoContext} setShowTodoContext={setShowTodoContext} setItems={setItems} items={items}   />
        {(showTodoContext!=-1 || showTodoClear ) && <Blank />}
        {showTodoClear && <TodoConfirm setShowTodoClear={setShowTodoClear} />}
          </>
        }
    </section>
  )
}

export default Todo