import { ChatHeaderComponent } from "../types";

/**
 *  Component, Header for Active Chat
 *
 * Props:
 *  chat: chat object to be displayed
 *  toggleEventModal: function to open Event detail modal
 * 
 * ActiveChat-> ChatHeader
 */
function ChatHeader({ chat, toggleEventModal}: ChatHeaderComponent) {

    return (
      <div className="z-20 absolute my-2 bg-base-100 w-full h-32 border-b-4 border-black
        border-opacity-15 top-14 right-0 flex items-center  justify-end px-20" >
            <div className="flex flex-col items-center font-semibold gap-2">
                <h2>Events</h2>
                { chat.associatedEvents.length ?
                <div className="flex gap-20">
                    {chat.associatedEvents.map(event =>  event.images.length ? 
                        <img 
                            key={event.eventId}
                            onClick={() => toggleEventModal(event)}
                            className="w-20 h-20 object-cover mb-2 rounded-full 
                            hover:scale-110 transition-all hover:opacity-85"
                            src={`https://plus-one.s3.amazonaws.com/${event.images[0].url}`}/>:
                        <div 
                            key={event.eventId}  
                            onClick={() => toggleEventModal(event)}
                            className="w-20 h-20 mb-2 rounded-full bg-secondary 
                            hover:scale-110 transition-all hover:opacity-85"></div>)}
                </div> :
                <h2 className="text-center font-medium">
                    Looks Like all the events are over. 
                    <br /> Feel free to keep chatting.</h2>
                }

            </div>
      </div>);
}

export default ChatHeader;