/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { Chat, ChatAreaComponent } from "../types";
import ChatSideBar from "./ChatSideBar";
import { useEffect } from "react";
import {Link} from "react-router-dom"
import LoadingScreen from "../Shared/LoadingScreen";
import ActiveChat from "./ActiveChat";
import socket from "../socket";
import UnselectedChat from "./UnselectedChat";



/**
 *  Component, Entire Chat section of application.
 *
 * Props:
 *  getChats: gets all chats for user.
 * 
 * State: 
 *  chats: array of chat objects
 *  isLoading: loading state to display loading page while chats are being fetched.
 *  currentChatId: id of chat currently being displayed.
 * 
 * ChatArea -> ActiveChat | UnselectedChat, ChatSideBar
 */
function ChatArea({getChats}: ChatAreaComponent) {
  const [chats, setChats] = useState<Chat[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)

  /** useEffect: Fetches info for chats associated with user */
  useEffect(function ():any {

    async function fetchChats() {
      setIsLoading(true);
      try {
        const res : any= await getChats()
        if(Array.isArray(res)) {
            setChats(res);
        }
        setCurrentChatId(res[0]?.id)
      } catch (err) {
        console.log(err)
      }
      setIsLoading(false);
    } 
    fetchChats();
  } ,[]);

  /** setChatId: Sets id for the active chat.
  *  Used in SideBarItem to change chat rendered 
  */
  function setChatId(id: string) {
    setCurrentChatId(id)
  }

   /** UseEffect for socket connect/disconnect and chat update*/
  useEffect(function () {
    socket.connect()
    socket.on("connect", () => {})

    socket.on("connected-message", message => 
      console.log(message))

    socket.on("chat-update", (chat) => {
      setChats(prev => prev.map(function(oldChat) {
        return oldChat.id === chat.id ? chat : oldChat
      }))
    })
    
    return () => {
      socket.off("Disconnected Message");
      socket.disconnect()}
  },[])

    return isLoading? <LoadingScreen/> : chats?.length ?(
      <div className="bg-base-200 w-screen flex items-stretch justify-stretch h-full">
        <ChatSideBar chats={chats} activeChat={currentChatId} setChatId={setChatId}/>
        {currentChatId ? 
        <ActiveChat id={currentChatId} key={currentChatId}/> : 
        <UnselectedChat/>}
      </div>
    ) : 
   ( 
    <div 
      className="flex flex-col justify-center items-center m-64 mt-40">
        <h1 className="text-4xl font-bold">No chats here!.</h1>
        <img 
          className="w-fill m-12 rounded-xl" 
          aria-placeholder="Plus One 404 Image" 
          src="./greet.svg" />
        <h2 className="text-4xl font-bold">
          Get out there and match with some events or create your own.</h2>
        <div className="flex gap-4">
          <Link 
            className="btn btn-primary btn-lg w-60 mt-8" 
            to={"/events"}>
            Find Events
          </Link> 
          <Link 
            className="btn btn-primary btn-outline btn-lg w-60 mt-8" 
            to={"/events/create"}>
            Create event
          </Link> 
        </div>
    </div>)
}


export default ChatArea;