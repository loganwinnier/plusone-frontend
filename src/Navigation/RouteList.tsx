import { Route, Routes, Navigate } from 'react-router-dom';
import { RouteComponent } from '../types';
import { useContext } from "react";
import { User } from '../types';
import userContext from "../userContext";

import SignupForm from '../Authentication/Signup';
import Login from '../Authentication/Login';
import HomePage from '../HomePage';
import ProfileForm from '../Profile/ProfileForm';
import Profile from '../Profile/Profile';
import UserEditForm from '../Authentication/EditUserForm';
import MyEvents from '../Events/MyEvents';
import NotFoundPage from './NotFoundPage';
import FindEventsArea from '../Events/FindEventArea';
import EventForm from '../Events/EventForm';
import FindUsersArea from '../Users/FindUsersArea';
import ChatArea from '../Chats/ChatArea';

/**
 *  RouteList
 * 
 * App-> RouteList -> Rest of components
 */
function RouteList({ 
  signup, 
  login, 
  updateUser,
  deleteUser, 
  createProfile, 
  updateProfile, 
  createEvent,
  deleteEvent,
  getChats
  } : RouteComponent) {
  const user = useContext<User | null>(userContext);

  const routesLoggedIn =
    (
      <>
        {user?.profile === null  ?
        <>
          <Route element={<ProfileForm updateOrCreate={createProfile} editing={false} />} path="/create-profile" />
          <Route element={<Navigate to="/create-profile" />} path="*" />
        </>
        : 
        <>
          <Route element={<MyEvents  deleteEvent={deleteEvent} />}path="/my-events" />
          <Route element={<EventForm updateOrCreate={createEvent}/>} path="/events/create" />
          <Route element={<FindEventsArea/>} path="/events" />
          <Route element={<FindUsersArea/>} path="/users/:eventId" />
          <Route element={<Profile/>} path="/profile/:email" />
          <Route element={<ChatArea getChats={getChats}/>} path={"chats"}/>
          <Route element={<UserEditForm 
            updateUser={updateUser} 
            deleteUser={deleteUser}/>} path="/edit-user" />
          <Route element={<ProfileForm  updateOrCreate={updateProfile} editing={true}/>} path="/edit-profile" />
          <Route element={<NotFoundPage/>} path="/404" />
          <Route element={<Navigate to="/404" />} path="*" />
        </>
        }
      </>
    );

  const routesLoggedOut =
    (
      <>
        <Route element={<HomePage />} path="/" />
        <Route element={<SignupForm signup={signup} />} path="/signup" />
        <Route element={<Login login={login} />} path="/login" />
        <Route element={<Navigate to="/" />} path="*" />
      </>
    );

  return (
    <Routes>
      {user ? routesLoggedIn : routesLoggedOut};
    </Routes>
  );
}

export default RouteList;