import { EventCardComponent } from "../types";
import { MapPinIcon, CurrencyDollarIcon } from '@heroicons/react/16/solid';
import dayjs from 'dayjs'
import { Link } from "react-router-dom";
import ImageCarousel from "../Shared/ImageCarousel";

/**
 * Presentation component, shows info about a event
 *
 * Props:
 *  event: An event object. 
 *  toggleModal: Function, handles display of deletion modal
 * 
 * MyEvents --> EventCard
 */
function MyEventCard({ event, toggleModal }: EventCardComponent) {

  const date = dayjs(event.dateTime).format("dddd MMMM D YYYY")

  return (
    <div className="card min-w-[32rem] bg-base-100 shadow-xl p-4">
      {event.images.length ?
         <ImageCarousel images={event.images}/>
        :
        <div className="bg-neutral object-cover w-full h-52 
        min-h-[28rem] max-h-[28rem] min-w-[32rem] max-w-[32rem] opacity-15"></div>  
      }  
      <div className="card-body gap-4">
        <div className="flex justify-between items-center">
          <h4 className="card-title">{event.title}</h4>
          <div className="flex items-center">
              <MapPinIcon className='w-4'/>
            <p className="card-text">{event.city},<br /> {event.state}</p>
          </div>
        </div>
        <p>When: {date}</p>
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
          <form onSubmit={(evt) => toggleModal(evt, event.eventId)}>
            <button 
              type="submit"
              className="btn btn-error w-32">
              Delete</button>
          </form>
          <Link 
              className="btn btn-primary flex justify-center items-center w-32 " 
              to={`/users/${event.eventId}`}>
            Find Matches</Link>
        </div>
      </div>
    </div>
  );

}

export default MyEventCard;