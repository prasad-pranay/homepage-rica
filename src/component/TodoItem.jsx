import  { useState , Component} from 'react'

// const TodoItem = ({index,setTodoCheckList,todoCheckList}) => {
//     // const [check,setCheck] = useState(false);
//   return (
//     <div className={`flex items-center select-none ${todoCheckList[index] && "opacity-50"}`} >
//         <label className="flex gap-3 items-center cursor-pointer">
//         <input type="checkbox" className="hidden peer" checked={todoCheckList[index]} disabled={todoCheckList[index]} onClick={e=>setTodoCheckList(prev=>({...prev,[index]:!prev[index]}))} />
//         <span className="w-5 h-5 border border-slate-300 rounded relative flex items-center justify-center peer-checked:border-blue-600 peer-checked:bg-blue-600">
//             <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="m10.092.952-.005-.006-.006-.005A.45.45 0 0 0 9.43.939L4.162 6.23 1.585 3.636a.45.45 0 0 0-.652 0 .47.47 0 0 0 0 .657l.002.002L3.58 6.958a.8.8 0 0 0 .567.242.78.78 0 0 0 .567-.242l5.333-5.356a.474.474 0 0 0 .044-.65Zm-5.86 5.349V6.3Z" fill="#F5F7FF" stroke="#F5F7FF" strokeWidth=".4"/>
//             </svg>
//         </span>
//         {/* <span className="text-gray-700 select-none">Enable Feature</span> */}
//     </label>
//         <p className='text-base text-white ml-3'>This is the item</p>
//         {!todoCheckList[index] && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" className="stroke-gray-300 ml-auto h-5 mr-5">
//   <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
// </svg>}
// <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" className={`stroke-gray-300 h-5 hover:scale-120 transition-transform duration-300 hover:stroke-red-500 ${todoCheckList[index] && "ml-auto"}`}>
//   <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
// </svg>

//     </div>
//   )
// }

// class TodoItem extends Component{
//   constructor(props){
//     super(props);
//     this.state = {check:false}
//   }

//   render(){
//     (
//     <div className={`flex items-center select-none ${this.state.check && "opacity-50"}`} >
//         <label className="flex gap-3 items-center cursor-pointer">
//         <input type="checkbox" className="hidden peer" checked={this.state.check} disabled={this.state.check} onClick={e=>this.setState(prev=>({...prev,check:!this.state.check}))} />
//         <span className="w-5 h-5 border border-slate-300 rounded relative flex items-center justify-center peer-checked:border-blue-600 peer-checked:bg-blue-600">
//             <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="m10.092.952-.005-.006-.006-.005A.45.45 0 0 0 9.43.939L4.162 6.23 1.585 3.636a.45.45 0 0 0-.652 0 .47.47 0 0 0 0 .657l.002.002L3.58 6.958a.8.8 0 0 0 .567.242.78.78 0 0 0 .567-.242l5.333-5.356a.474.474 0 0 0 .044-.65Zm-5.86 5.349V6.3Z" fill="#F5F7FF" stroke="#F5F7FF" strokeWidth=".4"/>
//             </svg>
//         </span>
//         {/* <span className="text-gray-700 select-none">Enable Feature</span> */}
//     </label>
//         <p className='text-base text-white ml-3'>This is the item</p>
//         {!this.state.check && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" className="stroke-gray-300 ml-auto h-5 mr-5">
//   <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
// </svg>}
// <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" className={`stroke-gray-300 h-5 hover:scale-120 transition-transform duration-300 hover:stroke-red-500 ${this.state.check && "ml-auto"}`}>
//   <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
// </svg>

//     </div>
//   )
//   }
// }

export default TodoItem