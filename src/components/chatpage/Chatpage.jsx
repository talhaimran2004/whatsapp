import ChatContainer from "../chat-container/ChatContainer"
import Sidebar from "../sidebar/Sidebar"

const Chatpage = ({ signOutFunc, currentUser }) => {
  return (
    <div className="block sm:flex bg-[#ece5dd]">

      {/* sdebar */}
      <div className="w-full hidden sm:visible">
        <Sidebar signOutFunc={signOutFunc} currentUser={currentUser} />
      </div>

      {/* Chat Container */}
      <ChatContainer currentUser={currentUser} />

    </div>
  )
}

export default Chatpage
