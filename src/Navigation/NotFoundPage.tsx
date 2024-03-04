import { Link} from "react-router-dom";

/**
 *  Component, Not found page. Renders if invalid route
 * 
 * RouteList -> NotFoundPage
 */
function NotFoundPage() {
  return (
    <div className="hero h-screen bg-base-200 w-screen mt-20 flex flex-col">
        <div className="flex flex-col gap-4 items-center text-center">
            <h1 className="text-8xl font-venice font-bold">Plus One</h1>
             <img className="w-2/4 p-4 pb-0 rounded-xl" aria-placeholder="Plus One 404 Image" src="./Lost2.svg" />
            <h2 className="text-3xl font-bold">Hi! <br />Looks like you're a bit lost, let's get you home</h2>
            <Link className="btn btn-primary text-2xl w-64 h-14 mt-4" to={`/`}>Home</Link>

        </div>
    </div>
  );
}

export default NotFoundPage;