/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState } from "react";
import { ActiveChatComponent, Chat, Message, Event} from "../types";
import { useEffect } from "react";
import LoadingScreen from "../Shared/LoadingScreen";
import PlusOneApi from "../api";
import ChatDisplay from "./ChatDisplay";
import MessageBar from "./MessageBar";
import ChatHeader from "./ChatHeader";
import socket from "../socket";
import userContext from "../userContext";
import EventDetailCard from "../Events/EventDetailCard";

/**
 *  Component, Area for Active chat.
 *
 * Props:
 * id: Chat Id for active chat.
 * 
 * State: 
 *  chat: Active chat object.
 *  isLoading: Loading state to display loading page while chat is being fetched.
 *  eventShown: Event | null renders EventDetailCard if given event or not displayed.
 * 
 * Context: 
 *  user: userContext
 * 
 * ActiveChat-> ChatHeader, ChatDisplay, MessageBar
 */
function ActiveChat({id}: ActiveChatComponent) {
    const user = useContext(userContext)
    const [chat, setChat] = useState<Chat | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [eventShown, setEventShown] = useState<Event|null>(null )

    /** UseEffect for fetching Chat. */
    useEffect(function () {
      async function fetchChat() {
        if(id) {
          setIsLoading(true);
          try {
            const res = await PlusOneApi.getChat(id)
              setChat(res);
              socket.emit("set-chat", res!.id)      
            } catch (err) {
              console.log(err)
            }
            setIsLoading(false);
          }
        } 
        fetchChat();
      }, []);

      /** UseEffect for socket handling messages.*/
      useEffect(function () {
        socket.on("receive-message", message => {
          if(message.chatId === chat?.id) {
            setChat((prev) => ({...prev!, messages: [...prev!.messages, message]}))
          }}
        )
      },[setChat])

    /** sendMessage: Sends a message to server.
     *  message: contents of message.*/
    async function sendMessage(message : string) {
        socket.emit("send-message", message, chat!, user?.email, 
        (res: {message: Message}) => {
          setChat((prev) => ({...prev!, messages: [...prev!.messages, res.message]}))}
        )
    }

    /** toggleEventModal: Toggles modal for selected event in Active Chat area.
     *  Causes Event detail card to be rendered. */
    function toggleEventModal(event : Event| null) {
      setEventShown(event)
    }

    return isLoading || !chat ? <LoadingScreen/> :  
   ( 
    <div className="flex flex-col items-stretch justify-end h-full w-full"> 
      <ChatHeader chat={chat} toggleEventModal={toggleEventModal}/>
      <ChatDisplay chat={chat} key={chat.id}/>
      <MessageBar sendMessage={sendMessage}/>
      {eventShown && <EventDetailCard 
        event={eventShown} 
        toggleEventModal={toggleEventModal}/>}
    </div>)
}

export default ActiveChat