
import { useContext, useEffect, useState, FormEvent } from "react";
import userContext from "../userContext";
import FindEventCard from "./FindEventCard";
import { Event, } from "../types";
import PlusOneApi from "../api";
import LoadingScreen from "../Shared/LoadingScreen";
import { Link } from "react-router-dom";


/**
 * Component, Displays stack of event Cards.
 *
 * State: 
 *  events: Array of Event objects.
 *  isLoading: Loading state to display loading page while events are being fetched.
 *  position: Current position in the event stack.
 * 
 * Context: 
 *  user: userContext
 * 
 * FindEventArea-> FindEventCards
 */
function FindEventsArea() {
  const user = useContext(userContext);
  const [events, setEvents] = useState<null | Event[]>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [position, setPosition] = useState<number>(0)

  /** UseEffect for fetching Events. */
  useEffect(function () {
    async function fetchEvents() {
      setIsLoading(true);
      if (!events) {
        try {
          const events = await PlusOneApi.getEvents({range:user?.profile.range})
          setEvents(events);
        } catch (err) {
          console.log(err)
        }
      } else {
        setEvents((prev) => prev?.slice(1) || null)
      }
      setIsLoading(false);
      } 
      fetchEvents();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);
  
  /** like: Moves position in stack and posts like to api.  */
  async function like(eventId:string) {
    setPosition((prevPosition) => prevPosition + 1)
    const newLike = await PlusOneApi.postLike(eventId)
    console.log(newLike)
  }
  
  /** pass: Moves position in stack.  */
  function pass() {
    setPosition((prevPosition) => prevPosition + 1)
  }
  
  /** resetEvents: resets stacks and displays unliked Events again. */
  function resetEvents(evt: FormEvent<HTMLFormElement>){
    evt.preventDefault()
    setPosition(0)
    setEvents(null)
  }
  
  return (isLoading) ? <LoadingScreen/> : (
    <div className="flex flex-col justify-center items-center mb-32 mt-12">
      {events?.length ?
        <div className="stack max-w-xl min-w-xl h-full items-stretch">
            {events!.map(event => <FindEventCard  
              key={event.eventId} 
              event={event} 
              like={like}
              pass={pass}/>)}
        </div>
        :
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 
            className="text-4xl font-bold">
            Looks like there is no events in your area.
          </h1>
          <img 
            className="w-full m-12 rounded-xl" 
            aria-placeholder="Plus OneImage" 
            src="./greet.svg" />
          <h2 className="text-4xl font-bold">Time to make some more.</h2>
          <div className="flex justify-between gap-4">
            <Link 
              className="btn btn-primary btn-lg w-60" 
              to={"/events/create"}>
              Create New Event
            </Link> 
            <form onSubmit={(evt) => resetEvents(evt)}>
              <button 
              className="btn btn-outline btn-primary btn-lg w-60 ">
              Look at events again</button>
            </form>

          </div>
        </div>
      }
    </div>
  );
}

export default FindEventsArea;