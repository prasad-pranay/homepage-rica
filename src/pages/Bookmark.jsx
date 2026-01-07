import React, { useEffect, useState } from "react";
import Navbar from "./Bookmark/Navbar";
import Folder from "../reactbit/Folder/Folder";
import offlineWebImage from "../assets/web.png";
import { motion } from "framer-motion";



const WebFile = ({ link, title, dateAdded, setContext, id }) => {
  const date = new Date(dateAdded);

        const minutes = date.getMinutes().toString().padStart(2, "0");
        const hours = date.getHours().toString().padStart(2, "0");
        const day = date.getDate();
        const monthName = date.toLocaleString("default", { month: "short" });
        const year = date.getFullYear();
  return (
    <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}}
      id={`bookmark-id-${id}`}
      className="oveflow-hidden hover:bg-black/20 hover:backdrop-blur-lg transition-bg duration-100 cursor-pointer p-3 rounded"
      onClick={() => window.open(link)}
      onContextMenu={(e) => {
        e.preventDefault();
        
        // type,title,time,date,url
        setContext([
          "Web Link",
          title,
          `${hours}:${minutes}`,
          `${day}/${monthName}/${year}`,
          link,
          id,
        ]);
      }}
    >
      <img
        src={`https://www.google.com/s2/favicons?domain=${link}`}
        className="h-[15vh] min-h-[50px] w-max mb-2 mx-auto"
        onError={(e) => {
          e.target.onerror = null; // Prevent infinite loop
          e.target.src = offlineWebImage;
        }}
        style={{ height: "50px", borderRadius: "10px" }}
      />
      <p className="text-white text-xs overflow-hidden h-[35px] overflow-hidden text-ellipsis">{title}</p>
      <p className="flex gap-2 items-center text-xs mt-1 text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
</svg>
<span>{`${day}/${monthName}/${year}`}</span></p>
    </motion.div>
  );
};

function getAllBookmarks(data, searchval) {
  const results = [];

  function recurse(node) {
    if (Array.isArray(node)) {
      node.forEach(recurse);
    } else if (
      node.url &&
      node.title &&
      (node.title.includes(searchval) || node.url.includes(searchval))
    ) {
      results.push({ title: node.title, url: node.url });
    } else if (node.children) {
      recurse(node.children);
    }
  }

  recurse(data);
  return results;
}

const Bookmark = ({ setShowBookmark, notificationRef, showBookmark }) => {
  const [gridView, setGridView] = useState(true);
  const [history, setHistory] = useState([]);
  const [dict, setDict] = useState([{}]);
  const [histTitle, setHistTitle] = useState([]);
  const [fullScreen, setFullScreen] = useState(true);
  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState([]);
  // type,title,time,date,url,id
  const [context, setContext] = useState([]);
  const [book, setBook] = useState([]);
  const [runnable, setRunnable] = useState(true);

  useEffect(() => {
    if (chrome?.bookmarks) {
      chrome.bookmarks.getTree((bookmarkTreeNodes) => {
        setBook(bookmarkTreeNodes[0].children);
      });
    } else {
      setRunnable(false);
      console.warn(
        "Bookmark API not available. Are you running as an extension?"
      );
    }
  }, []);

  useEffect(() => {
    if (search.length < 2) {
      setSearchList([]);
      return;
    }
    const links = getAllBookmarks(book, search);
    setSearchList(links);
  }, [search]);

  useEffect(() => {
    if (history.length == 0) {
      setDict(book);
      setHistTitle((prev) => []);
      return;
    }
    let val = book;
    let title = [];
    history.map((value) => {
      title.push(val[value].title);
      val = val[value].children;
    });
    setHistTitle((prev) => title);
    setDict(val);
  }, [history]);

  useEffect(() => {
    if (book.length == 0) {
      return;
    }
    setDict(book);
    setHistTitle((prev) => []);
  }, [book]);

  const ListFolder = ({ folderName, index, setHistory, dateAdded, id }) => {
    const date = new Date(dateAdded);

    const minutes = date.getMinutes().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const day = date.getDate();
    const monthName = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return (
      <div
        id={`bookmark-id-${id}`}
        className="text-white flex gap-3 py-2 items-center px-2 mb-2 cursor-pointer hover:bg-gray-800"
        onClick={() => {
          setHistory((prev) => [...prev, index]);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#5227FF"
          class="size-7"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
          />
        </svg>
        <p>{folderName}</p>
        <h2 className="text-white text-xs ml-auto flex items-center w-[170px]">
          <span className="mr-4 flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            {`${hours}:${minutes}`}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-4 mr-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
            />
          </svg>
          {`${day}/${monthName}/${year}`}
        </h2>
        <button
          className="ml-3 cursor-pointer group"
          onClick={() => {
            removeBookmark(id, title);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6 stroke-red-400 group-hover:stroke-red-500 group-hover:scale-120 transition-transform duration-200"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </div>
    );
  };
  const ListWeb = ({ title, link, dateAdded, id }) => {
    const date = new Date(dateAdded);

    const minutes = date.getMinutes().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const day = date.getDate();
    const monthName = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    return (
      <div
        id={`bookmark-id-${id}`}
        className="text-white flex gap-3 py-2 items-center px-2 mb-2 cursor-pointer hover:bg-gray-800"
        onClick={() => window.open(link)}
      >
        <img
          src={`https://www.google.com/s2/favicons?domain=${link}`}
          className="size-10 mb-2"
          onerror="this.src='/file.png'"
        />
        <p>{title}</p>
        <h2 className="text-white text-xs ml-auto flex items-center w-[170px]">
          <span className="mr-4 flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            {`${minutes}:${hours}`}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-4 mr-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
            />
          </svg>
          {`${day}/${monthName}/${year}`}
        </h2>
        <button
          className="ml-3 cursor-pointer group"
          onClick={() => {
            removeBookmark(id, title);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6 stroke-red-400 group-hover:stroke-red-500 group-hover:scale-120 transition-transform duration-200"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </div>
    );
  };

  function removeBookmark(id, title) {
    try {
      chrome.bookmarks.get(id, (results) => {
        const node = results[0];
        if (node.url) {
          // ("This is a bookmark (file/link)");
          chrome.bookmarks.remove(id, () => {
            notificationRef.current.show(
              `Bookmark :: "${title}" with id=${id} is deleted`,
              "white",
              5000
            );
          });
          document.getElementById(`bookmark-id-${id}`).style.opacity = "0.2";
          document.getElementById(`bookmark-id-${id}`).style.pointerEvents =
            "none";
        } else {
          // ("This is a folder");
          chrome.bookmarks.removeTree(id, () => {
            notificationRef.current.show(
              `Bookmark :: "${title}" with id=${id} is deleted`,
              "white",
              5000
            );
          });
          document.getElementById(`bookmark-id-${id}`).style.opacity = "0.2";
          document.getElementById(`bookmark-id-${id}`).style.pointerEvents =
            "none";
        }
      });

      setContext([]);
    } catch (e) {
      // IMPORTANT TO CONSOLE HERE DO NOT DELETE
      console.log(e);
      notificationRef.current.show(
        "Unable to delete! Check console for details...",
        "red",
        4000
      );
    }

    // try{

    //   chrome.bookmarks.remove(id, () => {
    //     notificationRef.current.show(
    //       `Bookmark :: "${title}" with id=${id} is deleted`,
    //       "white",
    //       5000
    //     );
    //   });
    //   document.getElementById(`bookmark-id-${id}`).style.opacity = "0.2";
    // }catch(e){
    //   try{
    //     chrome.bookmarks.removeTree(id, () => {
    //     notificationRef.current.show(
    //       `Bookmark :: "${title}" with id=${id} is deleted`,
    //       "white",
    //       5000
    //     );
    //   });
    //   document.getElementById(`bookmark-id-${id}`).style.opacity = "0.2";
    //   }catch(e){
    //     // IMPORTANT TO CONSOLE HERE DO NOT DELETE
    //     console.log(e)
    //     notificationRef.current.show("Unable to delete! Check console for details...","red",4000)
    //   }
    // }
    // id={`bookmark-id-${id}`}
  }

  return <>
    <div onClick={()=>setShowBookmark(false)} className={` fixed top-0 left-0 h-screen w-screen bg-black/1 ${showBookmark ? "scale-100":"scale-0"}`}></div>

    <section
      onContextMenu={(e) => e.preventDefault()}
      className={`
        ${showBookmark ? "scale-100 " : "scale-0"} transition duration-300
        fixed bg-gay-900 bg-black/10 backdrop-blur-lg ${
        fullScreen
          ? "w-[90vw] h-[90vh] ml-[5vw] mt-[5vh] shadow-[0_0_0_80px_rgba(0,0,0,0.6)] border border-gray-700"
          : "w-screen h-screen"
      } top-0 left-0 z-[1500]`}
    >
      {runnable ? (
        <>
          <Navbar
            setHistory={setHistory}
            histTitle={histTitle}
            fullScreen={fullScreen}
            setFullScreen={setFullScreen}
            setShowBookmark={setShowBookmark}
            setSearch={setSearch}
            search={search}
            searchList={searchList}
            gridView={gridView}
            setGridView={setGridView}
          />
          <div
            className={`${
              gridView ? `grid [grid-template-columns:repeat(auto-fit,minmax(150px,1fr))] gap-5` : "flex flex-col"
            } px-10 py-10 h-[calc(100%-88px)] pt-15 relative overflow-y-scroll scroll-customize`}
          >
            {/* <ToggleView
              gridView={gridView}
              setGridView={setGridView}
              fullScreen={fullScreen}
            /> */}
            {gridView &&
              dict.reverse().map((value, index) => {
                if (Object.keys(value).length === 0) {
                  return (
                    <p className="text-white text-xl p-2">
                      Nothing To Display Here...
                    </p>
                  );
                } else if ("children" in value) {
                  return (
                    <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}}>

                    <Folder
                      key={dict.length - index - 1}
                      size={1}
                      color="#5227FF"
                      className="custom-folder"
                      folderName={value.title}
                      setHistory={setHistory}
                      index={dict.length - index - 1}
                      dateAdded={value.dateAdded}
                      setContext={setContext}
                      id={value.id}
                      />
                      </motion.div>
                  );
                } else {
                  return (
                    <WebFile
                      key={index}
                      link={value.url}
                      title={value.title}
                      dateAdded={value.dateAdded}
                      setContext={setContext}
                      id={value.id}
                    />
                  );
                }
              })}
            {!gridView &&
              dict.reverse().map((value, index) => {
                if ("children" in value) {
                  return (
                    <ListFolder
                      key={index}
                      folderName={value.title}
                      setHistory={setHistory}
                      index={dict.length - index - 1}
                      dateAdded={value.dateAdded}
                      id={value.id}
                    />
                  );
                } else {
                  return (
                    <ListWeb
                      key={index}
                      link={value.url}
                      title={value.title}
                      dateAdded={value.dateAdded}
                      id={value.id}
                    />
                  );
                }
              })}
          </div>
          <div
            className={`absolute top-[90px] left-0 bg-[rgba(0,0,0,0.7)] w-[100%] h-[calc(100%-90px)] ${
              context.length == 0 ? "hidden" : "block"
            }`}
          >
            <div className="bg-indigo-900 w-max text-white py-5 px-10 absolute top-[50%] left-[50%] translate-[-50%] rounded">
              <p className="flex gap-2 items-center text-sm mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                  />
                </svg>
                {context[0]}
              </p>
              <p className="text-2xl mb-5 flex gap-2 items-center">
                {context[4] != "" && (
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${context[4]}`}
                  />
                )}
                {context[1]}
              </p>
              <p
                onClick={() => {
                  window.open(context[4]);
                  setContext([]);
                }}
                className="text-blue-300 hover:text-blue-500 cursor-pointer mb-3 w-[600px] truncate"
              >
                {context[4]}
              </p>
              <div className="flex justify-around my-5">
                <p className="flex gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                    />
                  </svg>
                  {context[3]}
                </p>
                <p className="flex gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  {context[2]}
                </p>
              </div>
              <div
                className={`grid ${
                  context[0] == "Folder"
                    ? "grid-cols-[1fr_1fr]"
                    : "grid-cols-[1fr_1fr_1fr]"
                }  gap-5 mt-10`}
              >
                <button
                  onClick={() => setContext([])}
                  className="border-2 text-base flex items-center px-3 py-2 rounded gap-4 cursor-pointer hover:text-yellow-500 hover:border-yellow-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                  Cancel
                </button>
                <button
                  onClick={() => {
                    window.open(context[4]);
                  }}
                  className={`${
                    context[0] == "Folder" ? "hidden" : "block"
                  } border-2 text-base flex items-center px-3 py-2 rounded gap-4 cursor-pointer hover:text-green-500 hover:border-green-500`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                    />
                  </svg>
                  Open Link
                </button>
                <button
                  className="border-2 text-base flex items-center px-3 py-2 rounded gap-4 cursor-pointer hover:text-red-400 hover:border-red-400"
                  onClick={() => {
                    removeBookmark(context[5], context[1]);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-evenly items-center h-[100%] flex-col">
          <p className="text-white text-5xl text-center ">
            Kindly run this as a browser extension to access bookmarks.
          </p>
          <button
            onClick={() => setShowBookmark(false)}
            className="border-2 text-white text-xl px-10 rounded py-3 cursor-pointer hover:text-red-500 border-white hover:bg-white"
          >
            Close
          </button>
        </div>
      )}
    </section>
  </>;
};

export default Bookmark;
