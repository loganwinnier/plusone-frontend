/**
 *  Component, Replaces ActiveChat if no chats are selected.
 *  Most likely never will be rendered. Fallback component.
 * 
 * ChatArea->UnselectedChat
 */
function UnselectedChat() {
  return (
    <div className="hero h-screen bg-base-200 w-screen mt-20 flex flex-col">
        <div className="flex flex-col gap-4 justify-start items-center text-center">
          <h1 className="text-8xl font-venice font-bold">Plus One</h1>
          <h2 className="text-4xl">Click a chat to open</h2>
          <img className="w-3/4" aria-placeholder="Plus One logo" src="./guy.png" />
          <div className="flex items-center justify-between gap-16"></div>
        </div>
    </div>
  );
}

export default UnselectedChat;