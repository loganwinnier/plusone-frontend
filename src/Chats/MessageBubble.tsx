import { MessageBubbleComponent } from "../types";
import { Link } from "react-router-dom";

/**
 *  Display Component, Message bubble for chat.
 *
 * Props:
 * message: Message object.
 * imageUrl: URL for user profile image. 
 * otherUserEmail: Email of the other user. 
 * 
 * ChatDisplay -> MessageBubble(s)
 */
function MessageBubble({message, imageUrl, otherUserEmail}: MessageBubbleComponent) {

    return message ? (
        <div 
          className={`chat my-2
          ${otherUserEmail ? "chat-start" : "chat-end" }`} 
          id={message.messageId.toString()}>
              {otherUserEmail &&
                <Link to={`/profile/${otherUserEmail}`} key={imageUrl}>    
                  { imageUrl ?
                  <img 
                    className="w-8 h-8 object-cover mb-2 rounded-full chat-image"
                    src={`https://plus-one.s3.amazonaws.com/${imageUrl}`}/>:
                  <div className="w-8 h-8 mb-2 rounded-full chat-image bg-secondary"></div>}
                </Link>
              }
              <p 
              className={`chat-bubble  drop-shadow-sm text-wrap break-words
                min-w-12 max-w-72 
                ${otherUserEmail ? "bg-slate-100 text-black": "chat-bubble-primary" }`}>
              {message.content}
              </p>
          </div>
    ) :
    (<div 
      className={
        `chat ${otherUserEmail ? "chat-start" : "chat-end" }`
        } >
        <p 
          className="chat-bubble bg-slate-100 text-black drop-shadow-sm
          text-wrap break-words min-w-12 max-w-72">
        </p>
      </div>)
}

export default MessageBubble;