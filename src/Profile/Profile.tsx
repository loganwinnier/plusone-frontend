/* eslint-disable react-hooks/exhaustive-deps */
import { Cog6ToothIcon } from '@heroicons/react/24/solid'
import { MapPinIcon } from '@heroicons/react/16/solid';
import { useContext, useState } from "react";
import userContext from "../userContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import { UserProfile } from '../types';
import PlusOneApi from '../api';
import { useEffect } from 'react';
import LoadingScreen from '../Shared/LoadingScreen';
import DisplayImages from '../Shared/DisplayImages';

/**
 *  Component, Profile Page.
 * 
 * State: 
 *  user: Active user object.
 *  ownProfile: Boolean, your profile or not
 *  isLoading: Loading state to display loading page while chat is being fetched.
 * 
 * Context: 
 *  self: userContext
 * 
 * Params: 
 *  email: email of profile
 * 
 * ActiveChat-> ChatHeader, ChatDisplay, MessageBar
 */
 function Profile() {
   const [user, setUser] = useState<null | UserProfile>(null)
   const [ownProfile, setOwn] = useState<boolean>(false)
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const {email} = useParams()
   const self = useContext(userContext)!;
   const navigate = useNavigate()

  /** UseEffect for fetching users profile if not self. */
  useEffect( function () {
    async function fetchUserInfo() {
      setIsLoading(true)
      if (email === self.email) {
        setUser(self)
        setOwn(true)
      } else {
         try {
              const res = await PlusOneApi.getUserInfo(email!);
              setUser(res);
            } catch (err) {
              console.error(err);
              navigate("/");
            } 
      }
      setIsLoading(false);
    }
    fetchUserInfo();
  }, []);
  
  return (isLoading 
    ? <LoadingScreen/> 
    : (
    <div >
      <div className="flex md:flex-row-reverse md:h-screen sm:h-max  justify-center m-16 lg:my-4 items-start gap-12 bg-base-200">
        <DisplayImages images={user!.profile!.images}/>
        <div className="flex flex-col gap-2 ">
          <div className="flex items-end gap-2 ">
              <h1 className="text-4xl font-semibold">{user!.firstName} {user!.lastName}</h1>
            { ownProfile && <Link to="/edit-user"><Cog6ToothIcon className='w-8'/></Link>}
          </div>
            {ownProfile && <h4 className="text-xl">{email}</h4>}
            {ownProfile && <Link 
              className="btn btn-outline border-2 border-secondary hover:bg-secondary
              hover:border-secondary w-52" to="/edit-profile">
            Edit Profile</Link>}

            <div  className="flex  gap-2">
              <MapPinIcon className='w-6'/>
              <p>{user!.profile!.city}, {user!.profile!.state}</p>
            </div>
            {ownProfile && user!.phoneNumber && <h4 className="text-lg">{user!.phoneNumber}</h4>}     
            <h4 className="text-lg">{user!.profile!.gender}</h4> 
            <h4 className="text-lg"></h4>
            <p className='max-w-52 lg:max-w-96 text-wrap break-words'>{user!.profile!.bio}</p>
          </div>
        </div>
  </div>
))
}

export default Profile;