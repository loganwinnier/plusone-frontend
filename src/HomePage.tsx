import { Link} from "react-router-dom";


/**
 * Display Component, Displays Homepage when logged out
 *
 * RouteList -> HomePage
 */
function HomePage() {
  return (
    <div className="hero h-screen w-screen pt-20 flex flex-col">
        <div className="flex flex-col gap-4 justify-start items-center text-center">
          <h1 className="text-8xl font-venice font-bold">Plus One</h1>
          <h2 className="text-4xl">Events are better with a friend to bring along</h2>
          <img className="w-2/4 p-4 pb-0 border-4 border-neutral rounded-xl" 
            aria-placeholder="Plus One logo" src="./friends.png" />
          <div className="flex items-center justify-between gap-16">
            <Link className="btn btn-square btn-primary text-2xl w-64 h-14" 
              to={`/signup`}>SignUp</Link>
            <Link className="btn btn-outline btn-primary text-2xl w-64 h-14" 
              to={`/login`}>Login</Link>
          </div>
        </div>
    </div>
  );
}

export default HomePage;