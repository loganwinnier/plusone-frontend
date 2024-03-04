import { useEffect, useState } from "react";
import PlusOneApi from "./api";
import {jwtDecode } from 'jwt-decode';
import { 
  CreateOrEditEvent,
  InitialProfile,
  LoginForm,
  Profile,
  RegisterUser, 
  TokenDecoded, 
  UpdateUser, 
  User,
  Event} from "./types";
import { BrowserRouter } from "react-router-dom";
import userContext from "./userContext";
import NavBar from "./Navigation/NavBar";
import RouteList from "./Navigation/RouteList";
import LoadingScreen from "./Shared/LoadingScreen";
import { ConfigProvider } from "antd";

/**
 * App Controller Component.
 *
 * State: 
 *  user: userState used in context.
 *  token: Active session token for user. 
 *  isLoading: Loading state to display while User is being fetched.
 * 
 * Context Provider: 
 *  user: userContext
 * 
 * App
 */
function App() {

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /** UseEffect for setting token and user.. */
  useEffect(function () {
    async function fetchUserInfo() {
      setIsLoading(true);

      if (token) {
        localStorage.setItem("token", token);
        PlusOneApi.token = token;
        try {
          const decodedToken = jwtDecode<TokenDecoded>(token);
          const user = await PlusOneApi.getUserInfo(decodedToken!.email);
          setUser(user);
        } catch (err) {
          console.error(err);
          localStorage.clear();
          setToken(null)
          setUser(null);
        }
      } else {
        localStorage.clear();
        setUser(null);
      }
      setIsLoading(false);
      }
    fetchUserInfo();
  }, [token]);

  /** signup: Signup  user. Passed formData. Sets token. */
  async function signup(formData : RegisterUser) {
    const res = await PlusOneApi.signup(formData);
    setToken(res.token)
  }

  /** login: Login user. Passed formData. Sets token. */
  async function login(formData: LoginForm) {
    const res = await PlusOneApi.login(formData);
    setToken(res.token)
  }

  /** updateUser: Update an user's details. 
  * Passed formData. Updates user state and in turn context. 
  */
  async function updateUser(formData : UpdateUser) {
    delete formData.repeatNewPassword
    const oldData = user;
    const newData = await PlusOneApi.updateUser(formData, user!.email);
    setUser(newData);
    return { newData, oldData };
  }

  /** deleteUser: Deletes a user. Clears token*/
  async function deleteUser() {
    const newData = await PlusOneApi.deleteUser(user!.email);
    setToken("");
    return { newData };
  } 

  /** updateProfile: Update an user's profile details. 
  * Passed formData. Updates user state and in turn context.
  */
  async function updateProfile(formData : InitialProfile) {
    try {
      const newData : {profile: Profile} = await PlusOneApi.updateProfile(formData, user!.email);
      setUser((userData) => ({...userData!, profile: newData.profile}))
      return {newData} 
    }catch(err) {
      console.warn(err)
      throw err
    }
  }

  
  /** createProfile: Create an user's profile details. 
  * Passed formData. Updates user state and in turn context.
  */
  async function createProfile(formData: Profile) {
     try {
      const newData : {profile: Profile} = await PlusOneApi.createProfile(formData);
      setUser((userData) => ({...userData!, profile: newData.profile}))
      return {newData} 
    }catch(err) {
      console.warn(err)
    }
  }

    /** createEvent: Create an event. 
  *   Passed formData. Updates user state and in turn context.
  */
  async function createEvent(formData: CreateOrEditEvent) {
    try {
    const newData : {event: Event} = await PlusOneApi.createEvent(formData);
    setUser((userData) => ({...userData!, events: [...user!.events, newData.event ]}))
    return {newData} 
  }catch(err) {
    console.warn(err)
    throw err
  }
  }

  /** deleteEvent: Deletes an event. 
  *   Passed formData. Updates user state and in turn context.
  */
  async function deleteEvent(eventId: string) {
    const newData = await PlusOneApi.deleteEvent(eventId);
    setUser((userData) => ({...userData!, events: newData.events}))
    return { newData };
  } 

  /** getChats: Gets all chats for user. 
  *   Updates user current chat in state and in turn context.
  */
  async function getChats() {
    const res = await PlusOneApi.getChats()
    setUser((userData) => ({...userData!, chats: res}))
    return res
  }

  /** logout: Sets token to null, logging out the user.
  *   Updates user current chat in state and in turn context.
  */
  function logout() {
    setToken(null);
  }

  return (isLoading || (!user && token) ? <LoadingScreen/>
  : (
    <>
      <userContext.Provider value={user}>
      <ConfigProvider
    theme={{
      components: {
          Button: {
            colorTextLightSolid: "#000000",
            algorithm: true, // Enable algorithm
          }
        },
      token: {
        colorPrimary: '#1d6bc7',
        borderRadius: 2, 
        colorBgContainer: '#f6ffed',
      },
    }}
  >

      <BrowserRouter>
      <div className="flex flex-col h-screen items-stretch justify-stretch bg-bg-texture-2">
        <NavBar logout={logout}/>
        <div className="pt-16 min-h-full max-h-full bg-base-200 bg-bg-texture-2">
            <RouteList 
              signup={signup}
              login={login} 
              updateUser={updateUser}
              deleteUser={deleteUser}
              createProfile={createProfile}
              updateProfile={updateProfile}
              createEvent={createEvent}
              deleteEvent={deleteEvent}
              getChats={getChats}
              />
        </div>
      </div>
      </BrowserRouter>
      </ConfigProvider>
      </userContext.Provider>
    </>
   ) )
}

export default App
