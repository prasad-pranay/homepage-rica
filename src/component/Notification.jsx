import React, { useEffect } from "react";

class Notification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      text: "no text",
      color: "",
      icon: "",
      timeout: null,
    };

    this.color = {
      green: "bg-green-900/10 text-green-900",
      red: "bg-red-600/10 text-red-600",
      white: "bg-gray-600/10 text-gray-600",
    };
    this.notificationIcon = {
      green: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
      red: "M10 14.167q.354 0 .593-.24.24-.24.24-.594a.8.8 0 0 0-.24-.593.8.8 0 0 0-.594-.24.8.8 0 0 0-.593.24.8.8 0 0 0-.24.593q0 .354.24.594t.593.24m-.834-3.334h1.667v-5H9.166zm.833 7.5a8.1 8.1 0 0 1-3.25-.656 8.4 8.4 0 0 1-2.645-1.781 8.4 8.4 0 0 1-1.782-2.646A8.1 8.1 0 0 1 1.666 10q0-1.73.656-3.25a8.4 8.4 0 0 1 1.782-2.646 8.4 8.4 0 0 1 2.645-1.781A8.1 8.1 0 0 1 10 1.667q1.73 0 3.25.656a8.4 8.4 0 0 1 2.646 1.781 8.4 8.4 0 0 1 1.781 2.646 8.1 8.1 0 0 1 .657 3.25 8.1 8.1 0 0 1-.657 3.25 8.4 8.4 0 0 1-1.78 2.646 8.4 8.4 0 0 1-2.647 1.781 8.1 8.1 0 0 1-3.25.656",
      white:
        "m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z",
    };
  }

  show(text, color, timeout = 3000) {
    let duration = 0;
    if (this.state.show) {
      // means a notifcation is already on display
      // so hide current one then displahy this
      clearTimeout(this.state.timeout);
      this.setState((prev) => ({ ...prev, show: false }));
      duration = 500;
    }
    setTimeout(() => {
      this.setState((prev) => ({
        ...prev,
        show: true,
        text: text,
        color: this.color[color],
        icon: this.notificationIcon[color],
      }));
      this.state.timeout = setTimeout(() => {
        this.setState((prev) => ({ ...prev, show: false }));
      }, timeout);
    }, duration);
  }

  render() {
    return (
      <div
        id="notiication"
        className={`${
          this.state.show ? "translate-x-0" : "translate-x-[150%]"
        } ${
          this.state.color
        } z-500 border-1 border-gay-600 backdrop-blur-sm transition-transform duration-500 flex items-center justify-between max-w-80 w-full p-5 py-7 h-10 rounded-sm fixed bottom-10 right-10`}
      >
        <div className="flex items-center">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-7"
          >
            <path d={this.state.icon} />
          </svg>
          <p className="text-sm ml-5 font-bold text-white">{this.state.text}</p>
        </div>
        <button
          type="button"
          aria-label="close"
          className="active:scale-90 transition-all ml-2"
          onClick={() => {
            this.setState((prev) => ({ ...prev, show: false }));
            clearTimeout(this.state.timeout);
          }}
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-200 hover:scale-150 cursor-pointer ml-1"
          >
            <path
              d="M15 5 5 15M5 5l10 10"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    );
  }
}
// const Notification = ({showNoti,setShow,value}) => {

//     const notificationIcon = {
//         "green": "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" ,
//         "red": "M10 14.167q.354 0 .593-.24.24-.24.24-.594a.8.8 0 0 0-.24-.593.8.8 0 0 0-.594-.24.8.8 0 0 0-.593.24.8.8 0 0 0-.24.593q0 .354.24.594t.593.24m-.834-3.334h1.667v-5H9.166zm.833 7.5a8.1 8.1 0 0 1-3.25-.656 8.4 8.4 0 0 1-2.645-1.781 8.4 8.4 0 0 1-1.782-2.646A8.1 8.1 0 0 1 1.666 10q0-1.73.656-3.25a8.4 8.4 0 0 1 1.782-2.646 8.4 8.4 0 0 1 2.645-1.781A8.1 8.1 0 0 1 10 1.667q1.73 0 3.25.656a8.4 8.4 0 0 1 2.646 1.781 8.4 8.4 0 0 1 1.781 2.646 8.1 8.1 0 0 1 .657 3.25 8.1 8.1 0 0 1-.657 3.25 8.4 8.4 0 0 1-1.78 2.646 8.4 8.4 0 0 1-2.647 1.781 8.1 8.1 0 0 1-3.25.656",
//         "white": "m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
//     }
//     const color = {
//         "green" : "bg-green-600/20 text-green-900",
//         "red" : "bg-red-600/20 text-red-600",
//         "white" : "bg-gray-400/20 text-gray-900",
//     }
//   return (
//     // <div className={`${show ? "translate-x-0" : "translate-x-[150%]"} ${""} transition-transform duration-500 flex items-center justify-between max-w-80 w-full p-5 py-7 h-10 rounded-sm fixed bottom-10 right-10`}>
//     <div id="notiication" className={`transition-transform duration-500 flex items-center justify-between max-w-80 w-full p-5 py-7 h-10 rounded-sm fixed bottom-10 right-10`}>
//     <div className="flex items-center">
//         <svg width="40" height="40" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d={""} fill="currentColor"/>
//         </svg>
//         <p className="text-sm ml-5 font-bold text-white">"{value}" - "{showNoti}" -hey there</p>
//     </div>
//     <button type="button" aria-label="close" className="active:scale-90 transition-all ml-2" onClick={()=>{
//         setShow(false);
//     }}>
//         <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className='transition-transform duration-200 hover:scale-150 cursor-pointer ml-1'>
//             <path d="M15 5 5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
//         </svg>
//     </button>
// </div>
//   )
// }

export default Notification;
