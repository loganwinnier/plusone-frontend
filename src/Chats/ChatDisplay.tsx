import { ReactNode, useContext, useEffect, useRef } from "react";
import { Chat, Image } from "../types";
import userContext from "../userContext";
import { Link } from "react-router-dom";
import MessageBubble from "./MessageBubble";

/**
 *  Component, Area for Active chat.
 *
 * Props:
 * chat: Chat object to be displayed.
 * 
 * Context: 
 *  user: userContext
 * 
 * ChatDisplay-> MessageBubble
 */
function ChatDisplay({chat}: {chat: Chat}) {
  const user = useContext(userContext)
  let otherUser : null | {email: string, profile: {images: Image[]}} = null
  let imageUrl: string | null = null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const messagesEndRef = useRef<any>(null)

  if (chat) {
    otherUser = user!.email === chat.userOneEmail ?
    {email: chat.userTwoEmail, profile: chat.userTwo.profile} : 
    {email: chat.userOneEmail, profile:chat.userOne.profile}
    imageUrl = otherUser?.profile?.images[0]?.url
    }

  /** scrollToBottom: scrolls to bottom of chat on new message.*/ 
  function scrollToBottom () {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" })
  }

  /** useEffect to call scroll to bottom on message update*/ 
  useEffect(() => {
    scrollToBottom()
  }, [chat.messages]);

  
    /** Renders if messages*/ 
  function withMessages() : ReactNode {
    return (
      <div 
        className="w-full p-4 tracking-wide overflow-y-auto scroll-bar"
        key={chat.id}> 
        {chat.messages.map((message) => (   
            <MessageBubble 
              message={message} 
              imageUrl={message.sender === otherUser?.email? imageUrl: null} 
              otherUserEmail={message.sender === otherUser?.email ? otherUser?.email : null}
              key={message.messageId}/>
        ))}
        <div ref={messagesEndRef} />
      </div> 
      )
    } 

    /** Renders no Messages*/ 
    function noMessages() : ReactNode{
      return ( 
      <Link 
        to={`/profile/${otherUser!.email}`} 
        className="flex flex-col items-center justify-center mb-40 gap-12">
        {imageUrl ?
        <img 
          className="w-52 h-52 object-cover rounded-full border-2 border-black 
            border-opacity-5 hover:scale-110 transition-all active:scale-90"
          src={`https://plus-one.s3.amazonaws.com/${imageUrl}`}/>:
        <img 
          className="w-52 h-52 object-cover rounded-full border-2 border-black 
            border-opacity-5 hover:scale-110 transition-all active:scale-90"
          src={`./guy.png`}/>}
        <h1 className="font-semibold text-center opacity-60">
          No messages yet
          <br />
          Send a message to start the chat
        </h1>
      </Link>)
    }

  if(chat) {
    return chat.messages.length ? withMessages() : noMessages()
  }
  return (<div></div>)
}


export default ChatDisplay;