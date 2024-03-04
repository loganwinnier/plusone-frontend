import { SideBarComponent } from "../types";
import SideBarItem from "./SideBarItem";

/**
 *  Component, Area for Chat sidebar items
 *
 * Props:
 * chats: Array of users chats
 * setChatId: function for setting active chat
 * activeChat: currently active chat
 * 
 * ChatSideBar -> SideBarItem
 */
function ChatSideBar({chats, setChatId, activeChat}: SideBarComponent ) {
  return (
    <div 
    className="z-30 h-full bg-base-100 flex flex-col overflow-auto min-w-64
    scroll-bar border-r-4 border-black border-opacity-10">
      {chats.map(chat => <SideBarItem
        key={chat.id} 
        active={activeChat === chat.id}
        chat={chat} 
        setChatId={setChatId}/>)}
    </div> 
  );
}

export default ChatSideBar;