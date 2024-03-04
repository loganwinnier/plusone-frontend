import {SideBarItemComponent } from "../types";
import { useContext } from "react";
import userContext from "../userContext";
import dayjs from "dayjs"
import  relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)


/**
 *  Component, Chat side bar item. Shows some details of chat.
 *
 * Props:
 *  chat: chat object to display.
 *  setChatId: function to set the active chat.
 *  active: Boolean determines if chat is active, for styling.
 * 
 * Context: 
 *  user: userContext
 * 
 * ChatSideBar -> SideBarItem(s)
 */
function SideBarItem({chat, setChatId, active}: SideBarItemComponent) {
    const currentUser = useContext(userContext)
    const otherUser = currentUser!.email === chat.userOne.email ? 
        chat.userTwo :
        chat.userOne;
    const date = chat.lastMessage ? dayjs(chat.lastMessage).fromNow() : <br />

    /** openChat: Sets chat to active chat. */
    function openChat() {
        setChatId(chat.id)
    }
    return (
        <div 
            className=
            {`flex items-center border-b-2 border-primary border-opacity-10 pl-2 py-2
            transition-all w-48 lg:w-64 ${active && " drop-shadow-lg border-y-2 border-opacity-30"}`}
            onClick={() => openChat()}>
            {
            otherUser?.profile?.images[0]?.url ?
                <img 
                    className="w-14 h-14 object-cover rounded-full border-2 
                        border-primary border-opacity-10"
                    src={`https://plus-one.s3.amazonaws.com/${otherUser?.profile?.images[0]?.url}`}
                    />:
                <img 
                    className="min-w-14 min-h-14 w-14 h-14 object-cover rounded-full border-2 
                        border-primary border-opacity-10 bg-base-100"
                    src={`./guy.png`}
                />
            }
            <div className="ml-2">
                <h1 className="truncate font-semibold">
                    {otherUser.firstName} {otherUser.lastName}
                </h1>
                <h2 
                    className={`truncate opacity-70 ${!chat.lastMessageContent && "text-accent"}`}>
                    {chat.lastMessageContent || "message to start chat"}</h2>
                <h2 className="opacity-50">{date}</h2>
            </div>
        </div>
    )
}

export default SideBarItem;