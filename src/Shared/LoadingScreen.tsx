
//Array of possible messages for Loading screen
const messages = [
  "Getting the party started.", 
  "Grabbing the coffee.", 
  "Uncorking the fun!",
  "Downloading good vibes... please wait.",
  "Locating the best food trucks.",
  "Warming up the dance floor.",
  "Connecting you with your fellow adventurers.",
  "Gathering your event essentials.",
  "We're not just loading, we're building hype!",
  "Tuning up the fun meter.",
  "Brushing off the glitter.",
  "What will you discover next?",
  "What hidden gems await?",
  "Don't worry, your FOMO is under control (we're loading it fast).",
  "Connecting you with your event BFFs",
  "Downloading a universe of event possibilities.",
  "Finding your perfect event match.",
  "Mapping your route to unforgettable memories.",
  "Prepare to be mind-blown (metaphorically, of course).",
  "Get ready for an experience that will leave you speechless (or at least giggling)."
]

/**
 *  Component, Visual for when loading state is active.
 * 
 * Smart Components -> LoadingScreen
 */
function LoadingScreen() {

  const message = messages[Math.floor(Math.random()*messages.length)];

  return (
    <div className="hero h-screen bg-base-200 w-screen">
        <div className="flex flex-col gap-4 items-center text-center">
            <h1 className="text-8xl font-venice font-bold">Plus One</h1>
            <span className="loading loading-dots text-8xl text-primary"></span>
            <h2 className="text-4xl">{message}</h2>
        </div>
    </div>
  );
}

export default LoadingScreen;