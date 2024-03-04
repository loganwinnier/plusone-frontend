import { useContext, useState, useEffect} from "react";
import MyEventCard from "./MyEventCard";
import userContext from "../userContext";
import { Link } from "react-router-dom";
import  Alert from "../Shared/Alert";
import { MyEventsComponent } from "../types";

/**
 *  Component, Area for users events.
 *
 * Props:
 * deleteEvent: Function, handles deletion of event.
 * 
 * State: 
 *  errors: Array of errors for display of deletion errors.
 *  showSuccess: Boolean for showing success message on deletion.
 *  toBeDeleted: Sets event that is attempted to be deleted by user. 
 * 
 * Context: 
 *  user: userContext
 * 
 * RoutesList -> MyEvents
 */
function MyEvents({deleteEvent}: MyEventsComponent) {
  const user = useContext(userContext);
  const [errors, setErrors] = useState<null | Array<string>>(null);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [toBeDeleted, setToBeDeleted] = useState<string|null>(null)

  /** UseEffect for displaying success message. */
  useEffect(() => {
    if(showSuccess){
      console.log("In show success")
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)
    } 

  }, [showSuccess]);


  /** handleDelete: handles click of deletion button in modal.  */
  async function handleDelete(evt : React.FormEvent<HTMLFormElement>, eventId:string) {
    evt.preventDefault()
    try {
      await deleteEvent(eventId);
      toggleModal(evt)
      setShowSuccess(true)
      } catch (err) {
        console.warn(err)
        if (err instanceof Array) {  
          setErrors(err);
        }   
      }
  }

  /** toggleModal: handles click of delete button on card.  */
  function toggleModal(evt : React.FormEvent<HTMLFormElement>, eventId?:string) {
    evt.preventDefault()
      if(toBeDeleted) {
        setToBeDeleted(null)
    } else {
       setToBeDeleted(eventId!)
    }
    }

  return (
    <div className="h-fill bg-base-200 bg-bg-texture  scroll-bar">
      {user?.events.length ?
        <>
        <Link 
          className="btn btn-secondary border-1.5 z-20 transition-all ease-in-out
          fixed right-10 bottom-10 lg:bottom-full lg:top-20 w-48" 
          to={"/events/create"}>
          Create New Event
        </Link> 
      <div className="flex flex-col justify-evenly items-center mx-24 pt-16 mb-4" >
        <div 
          className="
            h-fill w-fill
            grid gap-56 auto-cols-auto xl:grid-cols-2 auto-rows-auto my-4 
            justify-center items-stretch justify-items-center">
          {(errors && errors!.length) && (
          <div className="flex justify-center w-full absolute">
            <Alert alerts={errors!} type="warning" />
          </div>)}
          {(showSuccess) && (
          <div className="flex justify-center w-full absolute">
             <Alert alerts={["Deleted event."]} type="success" />
          </div>)}

          {user!.events.map(event => <MyEventCard
            toggleModal={toggleModal} 
            key={event.eventId} 
            event={event} />)}
        </div>
      </div>
      </>
      : <div 
      className="flex flex-col justify-center items-center gap-4 mt-20 m-80 text-center">
          <h1 className="text-4xl font-bold">Looks like you have no events.</h1>
          <img 
            className="w-fit m-12 rounded-xl" 
            aria-placeholder="Plus One 404 Image" 
            src="./guy.png" />
          <h2 className="text-4xl font-bold">Time to make some more.</h2>
          <Link 
          className="btn btn-primary btn-lg w-60 mt-8" 
          to={"/events/create"}>
          Create New Event
        </Link> 
        </div>}

    <div className={`modal ${toBeDeleted ? "opacity-100 pointer-events-auto" : ""}`}>
            <div className="modal-box">
                <h3 className="font-bold text-lg">You've entered the danger zone!</h3>
                <p className="py-4">Deleting an event is permanent.</p>
                <p>All matches for event will be lost.</p>
                <div className="modal-action justify-between">
                    <form onSubmit={(evt) => handleDelete(evt, toBeDeleted!)}> 
                        <button className="btn btn-error">Delete Event</button>
                    </form>
                    <form method="dialog" onSubmit={(evt) => toggleModal(evt)}>
                        <button className="btn w-40">Close</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
}

export default MyEvents;