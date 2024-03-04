import { FindEventCardComponent } from "../types";
import { MapPinIcon, CurrencyDollarIcon } from '@heroicons/react/16/solid';
import dayjs from 'dayjs'
import { FormEvent } from "react";
import { Link } from "react-router-dom";
import ImageCarousel from "../Shared/ImageCarousel";


/**
 * Display component, shows info about a event.
 *
 * Props:
 * event: Event object to display. 
 * like: Function to like an event.
 * pass: Function to pass an event.
 * 
 * FindEventArea --> FindEventCard(s)
 */
function FindEventCard({ event, like, pass}: FindEventCardComponent) {

  const date = dayjs(event.dateTime).format("dddd MMMM D YYYY")

  
  /** handleLike: Handles click of like button. */
  async function handleLike(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault()
    await like(event.eventId)
  }

  /** handlePass: Handles click of pass button. */
  async function handlePass(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault()
    pass()
  }

  return (
    <div className="card w-fill min-w-[36rem] h-fill bg-base-100 shadow-xl p-4">
      {event.images?.length ?
        <ImageCarousel images={event.images}/>
        :
        <div className="bg-neutral object-cover w-full 
        min-h-[28rem] max-h-[28rem] min-w-[32rem] max-w-[32rem]
        opacity-15"></div>  
      }  
      <div className="card-body gap-4">
        <div className="flex justify-between items-center">
          <h4 className="card-title">{event.title}</h4>
          <div className="flex items-center">
              <MapPinIcon className='w-4'/>
            <p className="card-text">{event.city}, {event.state}</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p>When: {date}</p>

          <Link
            className="flex items-center gap-4 hover:scale-105 transition-all" 
            to={`/profile/${event.host.email}`}>
            <h2 className="font-bold">{event.host.firstName} {event.host.lastName}</h2>
            <img className="w-16 h-16 rounded-full mb-2 border-2 border-neutral object-cover"
              src={`https://plus-one.s3.amazonaws.com/${event.host.profile.images[0].url || "null"}`}
            />
          </Link>
        </div>
        <p>{event.description}</p>
        <div className="flex justify-between items-center">
          <div>
            {event.payment 
              ? <CurrencyDollarIcon className="w-4"/>
              : <></>}
            <p className="">{event.payment 
              ? `Salary: $${ event.payment }` 
              : ""}</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <form onSubmit={(evt)=> handlePass(evt)}>
            <button 
              type="submit"
              className="btn btn-error flex justify-center items-center w-32">
              Pass</button>
          </form>
          <form onSubmit={(evt) => handleLike(evt)}>
          <button 
            className="btn btn-primary flex justify-center items-center w-32 ">
            Like</button>
          </form>
        </div>
      </div>
    </div>
  );

}

export default FindEventCard;