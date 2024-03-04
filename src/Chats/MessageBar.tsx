import React, {useState } from "react";
import {  MessageBarComponent } from "../types";

/**
 *  Component, Form for posting message to chat.
 *
 * Props:
 * sendMessage: sends a message to the server.
 * 
 * State: 
 *  formData {message: string}: message to send to server.
 * 
 * Context: 
 *  user: userContext
 * 
 * ActiveChat-> ChatHeader, ChatDisplay, MessageBar
 */
function MessageBar({ sendMessage }: MessageBarComponent) {

  const [formData, setFormData] = useState<{message:string}>({message: ""});

  /** handleChange: Handles change of form field.*/
  function handleChange(evt : React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { value } = evt.target as HTMLInputElement
    setFormData({message:value});
  }

  /** handleSubmit: Handles submit of form.
   * Calls sendMessage and clears form field. Warns in console on error.
  */
  async function handleSubmit(evt?: React.FormEvent<HTMLFormElement > | null) {
    if(evt) evt.preventDefault();
    try {
      await sendMessage(formData.message);
      setFormData({ message: ""});
    } catch (err) {
      console.warn(err)
    }
    }

    /** handleEnter: Allows for enter to send a message when field is active.*/
    function handleEnter(evt: React.KeyboardEvent<HTMLTextAreaElement>) {
      if(evt.key === "Enter" && evt.shiftKey == false) {
        evt.preventDefault();
        handleSubmit()
      }
    }

  return (
      <form 
        className="my-2 bg-base-100 w-full border-t-4 border-black
        border-opacity-15" 
        onSubmit={handleSubmit}>
        <div className="flex gap-4 p-4 items-end">
          <div className="form-control w-full">
              <textarea
                      onKeyDown={(evt) => handleEnter(evt)}
                      maxLength={250}
                      className="textarea text input-primary resize-none overflow-auto"
                      name="message"
                      value={formData.message}
                      onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>,) => handleChange(evt)}
                      required
                  />
              <div className="label -my-2">
                  <span></span>
                  <span className="label-text">{`${250 - formData.message.length}`}</span>
              </div>
          </div>
          <button type="submit" className="btn btn-primary w-32 my-5 h-12">Send</button>

        </div>
      </form>);
}

export default MessageBar;