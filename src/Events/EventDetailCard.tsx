import {EventDetailCardComponent} from "../types";
import { MapPinIcon, CurrencyDollarIcon } from '@heroicons/react/16/solid';
import dayjs from 'dayjs'
import ImageCarousel from "../Shared/ImageCarousel";


/**
 *  Component, card that shows event details, for chat
 *
 * Props:
 *  event : event object
 *  toggleEventModal: function
 * 
 * Active Chat-> FindEventCards
 */
function EventDetailCard({event, toggleEventModal}: EventDetailCardComponent) {

  const date = dayjs(event.dateTime).format("dddd MMMM D YYYY")

  /** Closes Modal */
  function close() {
    toggleEventModal(null)
  }
  
  return (
  <div 
    className="absolute top-0 left-40 translate-x-3/4 translate-y-1/3
    card w-fill min-w-[36rem] h-fill bg-base-100 shadow-xl p-4">
      {event.images?.length ?
        <ImageCarousel images={event.images}/>
        :
        <div className="bg-neutral object-cover w-full min-h-[28rem] opacity-15"></div>  
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
      <div className="flex justify-end items-center">
          <button 
            onClick={()=> close()}
            className="btn btn-error flex justify-center items-center w-32">
            Close</button>
      </div>
    </div>
  </div>)
}

export default EventDetailCard;