
import { useContext, useEffect, useState, FormEvent } from "react";
import userContext from "../userContext";
import {  User, } from "../types";
import PlusOneApi from "../api";
import LoadingScreen from "../Shared/LoadingScreen";
import { useParams } from "react-router-dom";
import FindUserCard from "./FindUserCard";


/**
 * Component, Displays stack of User Cards.
 *
 * State: 
 *  users: Array of User objects.
 *  isLoading: Loading state to display loading page while users are being fetched.
 *  position: Current position in the user stack.
 * 
 * Params: 
 *  eventId: Event Id finding users for. 
 * 
 * Context: 
 *  user: userContext
 * 
 * FindUserArea-> FindUserCards
 */
function FindUsersArea() {
  const user = useContext(userContext);
  const [users, setUsers] = useState<null | User[]>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [position, setPosition] = useState<number>(0)
  const  {eventId}= useParams()

    /** UseEffect for fetching Users. */
  useEffect(function () {
    async function fetchUsers() {
      setIsLoading(true);
      if (!users) {
        try {
          const res = await PlusOneApi.getUsers({range:user?.profile.range, eventId})
          setUsers(res);
        } catch (err) {
          console.warn(err)
        }
      } else {
        setUsers((prev) => prev?.slice(1) || null)
      }
      setIsLoading(false);
      } 
      fetchUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);
  
  /** like: Moves position in stack and posts like to api.  */
  async function like(email:string) {
    setPosition((prevPosition) => prevPosition + 1)
    if(eventId){
      const newLike = await PlusOneApi.postLike(email, {eventId})
      console.log(newLike)
    }
  }

  /** pass: Moves position in stack.  */
  function pass() {
    setPosition((prevPosition) => prevPosition + 1)
  }

  /** resetUsers: resets stacks and displays unliked Users again. */
  function resetUsers(evt: FormEvent<HTMLFormElement>){
    evt.preventDefault()
    setPosition(0)
    setUsers(null)
  }

return (isLoading) ? <LoadingScreen/> : (
    <div 
    className="flex flex-col justify-center items-center mx-8 mb-32 mt-12">
      {users?.length ?
        <div className="stack max-w-xl min-w-xl h-full items-stretch">
            {users!.map(user => <FindUserCard  
              key={user?.email} 
              user={user} 
              like={like}
              pass={pass}/>)}
        </div>
        :
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 
            className="text-4xl font-bold text-center">
            Looks like there is no users in your area.
          </h1>
          <img 
            className="w-96 m-12 rounded-xl" 
            aria-placeholder="Plus One Image" 
            src="../guy.png" />
          <h2 
            className="text-4xl font-bold text-center">
            Try expanding your range to find more.</h2>
          <div className="flex justify-between gap-4">
            <form onSubmit={(evt) => resetUsers(evt)}>
              <button 
              className="btn btn-outline btn-primary btn-lg w-60 mt-4">
              Look at users again</button>
            </form>
          </div>
        </div>
      }
    </div>
  );
}

export default FindUsersArea;