import React, { useEffect, useRef, useState } from "react";

const Navbar = ({
  setShowTodo,
  setShowTodoClear,
  dragRef,
  notificationRef
}) => {
  const [lockenable, setlockenable] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const lockVal = localStorage.getItem("todolock");
    setlockenable(lockVal == "1");

    setPosition({
      x: dragRef.current.offsetLeft,
      y: dragRef.current.offsetTop
    });

    dragRef.current.style.left = dragRef.current.offsetLeft +"px"
    dragRef.current.style.top = dragRef.current.offsetTop +"px"
    dragRef.current.style.bottom = "unset"
    dragRef.current.style.right = "unset"
  }, []);
  useEffect(() => {
    localStorage.setItem("todolock", lockenable ? "1" : "0");
  }, [lockenable]);

  const handleMouseDown = (e) => {
    dragging.current = true;
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  
  const handleMouseMove = (e) => {
    if (!dragging.current) return;
    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });

    dragRef.current.style.left = e.clientX - offset.current.x +"px"
    dragRef.current.style.top = e.clientY - offset.current.y +"px"
  };

  const handleMouseUp = () => {
    dragging.current = false;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <nav className="flex items-center max-md:w-full max-md:justify-between border-slate-700 rounded-full text-white text-sm mb-8">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="group transition-transform duration-300 hover:rotate-90 cursor-grab"
        onMouseDown={handleMouseDown}
      >
        <circle
          cx="4.706"
          cy="16"
          r="4.706"
          fill="#D9D9D9"
          className="group-hover:fill-green-400 transition-fill duration 300"
        />
        <circle
          cx="16.001"
          cy="4.706"
          r="4.706"
          fill="#D9D9D9"
          className="group-hover:fill-green-400 transition-fill duration 300"
        />
        <circle
          cx="16.001"
          cy="27.294"
          r="4.706"
          fill="#D9D9D9"
          className="group-hover:fill-green-400 transition-fill duration 300"
        />
        <circle
          cx="27.294"
          cy="16"
          r="4.706"
          fill="#D9D9D9"
          className="group-hover:fill-green-400 transition-fill duration 300"
        />
      </svg>
      <div className="hidden md:flex items-center gap-6 mx-auto">
        <a
          className="relative overflow-hidden h-6 group cursor-pointer hover:text-blue-500"
          onClick={() => document.getElementById("add-todo-input").focus()}
        >
          <span className="block group-hover:-translate-y-full transition-transform duration-300">
            Add
          </span>
          <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">
            Add
          </span>
        </a>
        <a className="relative overflow-hidden h-6 group cursor-pointer hover:text-blue-500">
          <span className="block group-hover:-translate-y-full transition-transform duration-300">
            Sync
          </span>
          <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">
            Sync
          </span>
        </a>
        {/* <a className="relative overflow-hidden h-6 group cursor-pointer hover:text-blue-500">
            <span className="block group-hover:-translate-y-full transition-transform duration-300">Select</span>
            <span
                className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">Select</span>
        </a> */}
        <a
          className="relative overflow-hidden h-6 group cursor-pointer hover:text-blue-500"
          onClick={() => setShowTodoClear(true)}
        >
          <span className="block group-hover:-translate-y-full transition-transform duration-300">
            Clear
          </span>
          <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">
            Clear
          </span>
        </a>
      </div>

      <div className="hidden md:flex items-center gap-4">
        {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="h-5 transition-transform hover:scale-120 duration-150 cursor-pointer ml-3 mr-1">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
</svg> */}
        <svg
          onClick={() => {
            setlockenable((prev) => !prev);
            notificationRef.current.show(!lockenable ? "Todo Lock Enabled" : "Todo Lock Disabled","white","2000")
          }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="white"
          className="h-5 transition-transform hover:scale-120 duration-150 cursor-pointer mr-3"
        >
          {lockenable ? (
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          )}
        </svg>

        <button className="border border-slate-600 hover:bg-red-500 cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition" onClick={()=>setShowTodo(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
</svg>

        </button>

        {/* <button
            className="bg-white hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition duration-300">
            Get Started
        </button> */}
      </div>


    </nav>
  );
};

{
  /* <script>
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    menuToggle.addEventListener('click', () => {
        if (mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex');
        } else {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
        }
    });
</script> */
}

export default Navbar;
