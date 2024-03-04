import { FindUserCardComponent } from "../types";
import { MapPinIcon } from '@heroicons/react/16/solid';
import { FormEvent } from "react";
import ImageCarousel from "../Shared/ImageCarousel";


/**
 * Presentation component, shows info about a user.
 *
 * Props:
 *   user: An user object to display.
 *   like: Likes an user.
 *   pass: Passes on an user.
 * 
 * 
 * FindUsersArea --> FindUserCard
 */
function FindUserCard({ user, like, pass}: FindUserCardComponent) {

  /** handleLike: Handles click of like button. */
  async function handleLike(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault()
    await like(user.email)
  }

  /** handlePass: Handles click of pass button. */
  async function handlePass(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault()
    pass()
  }

  return (
    <div className="card w-fill min-w-[36rem] h-fill bg-base-100 shadow-xl p-4">
      {user.profile?.images?.length ?
        <ImageCarousel images={user.profile.images}/>
        :
        <div className="bg-neutral object-cover w-full h-52 opacity-15"></div>  
      }  
      <div className="card-body gap-4">
        <div className="flex justify-between items-center">
          <h4 className="card-title">{user!.firstName} {user!.lastName}</h4>
          <div className="flex items-center">
              <MapPinIcon className='w-4'/>
            <p className="card-text">{user.profile?.city}, {user.profile?.state}</p>
          </div>
        </div>
        <p>{user.profile?.gender}</p>
        <p>{user.profile?.bio}</p>

        <div className="flex justify-between items-center">
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

export default FindUserCard;