import { useContext } from "react";
import { Link } from "react-router-dom";
import userContext from "../userContext";
import { NavBarComponent } from "../types";

/**
 * Renders different Nav bar Links depending on if user is logged in
 *
 * Context: 
 *  user: userContext
 * 
 * App -> Navbar -> {Link,...}
 */
function NavBar({ logout}: NavBarComponent) {

  const user = useContext(userContext);
  function navUserLoggedIn() {
    return (
      <>
        <Link className="navbar-start text-2xl font-venice font-bold" to={`/events`}>plusOne</Link>
        <ul className="flex-0 menu menu-horizontal navbar-center gap-2">
          <li>
            <Link className="" aria-current="page" to={`/events`}>Find Events</Link>
          </li>
          <li>
            <Link className="" aria-current="page" to={`/my-events`}>My Events</Link>
          </li>
          <li>
            <Link className="" aria-current="page" to={`/chats`}>Chats</Link>
          </li>
        </ul>
        <ul className="flex-0 menu menu-horizontal navbar-end gap-2">
          <li>
            <Link 
            className="" 
            to={"/events/create"}>
            New Event
            </Link> 
          </li>
          <li>
            <Link className="" aria-current="page" to={`/profile/${user!.email}`}>Profile</Link>
          </li>
          <li>
            <Link onClick={logout} aria-current="page" to={`/`}>Sign Out</Link>
          </li>
        </ul>
      </>
    );
  }


  /**Returns JSX for nav bar links if a user is not logged in */
  function navUserLoggedOut() {
    return (
      <>
      <div className="navbar-start"></div>
      <Link className="navbar-center text-2xl font-venice font-bold" to={`/`}>plusOne</Link>
      <div className="navbar-end"></div>
      </>
    )
  }

  return (
    <nav className="navbar fixed bg-base-100 px-8 drop-shadow-md z-40 ">
        {user && user.profile ? navUserLoggedIn() : navUserLoggedOut()}
    </nav>
  );
}

export default NavBar;