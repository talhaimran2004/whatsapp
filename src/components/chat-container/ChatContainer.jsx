import { MdMoreVert, MdOutlineEmojiEmotions, MdSend } from 'react-icons/md'
import { ImAttachment } from 'react-icons/im'
import ChatMessage from '../chat-message/ChatMessage'
import { useEffect, useRef, useState } from 'react'
import EmojiPicker from 'emoji-picker-react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, Timestamp, setDoc, collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase';



const ChatContainer = ({ currentUser }) => {

  const [message, setMessage] = useState('')
  const [toggleEmoji, setToggleEmoji] = useState(false)

  const { emailID } = useParams();
  const [chatUser, setChatUser] = useState({})

  const [chatMessages, setChatMessages] = useState([])
  const chatBox = useRef(null)

  useEffect(() => {
    let getUser = async () => {
      const docRef = await doc(db, "users", emailID);
      const docSnap = await getDoc(docRef);
      let user = docSnap.data()
      setChatUser(user)

    }

    let getMessages = async () => {

      const msgRef = await collection(db, "chats", emailID, 'messages');
      const q = await query(msgRef, orderBy("time", "asc"));

      onSnapshot(q, snap => {

        let WaMessage = snap.docs.map(elem => elem.data())

        let filteredMessages = WaMessage.filter(msgWA => (
          msgWA.senderEmail === (currentUser.email || emailID)
          ||
          msgWA.receiverEmail === (currentUser.email || emailID)
        )
        )

        setChatMessages(filteredMessages)

      })
    }

    getMessages();
    getUser();
  }, [emailID])

  useEffect(() => {
    chatBox.current.addEventListener('DOMNodeInserted', (event) => {
      const { currentTarget: target } = event;
      target.scroll({ top: target.scrollHeight, behavior: 'smooth' })
    })
  }, [chatMessages])


  let send = async (e) => {
    e.preventDefault();

    let payload = {
      text: message,
      senderEmail: currentUser.email,
      receiverEmail: emailID,
      time: Timestamp.now(),
    }

    // SENDER
    await addDoc(collection(db, 'chats', currentUser.email, 'messages'), payload)

    // RECEIVER
    await addDoc(collection(db, 'chats', emailID, 'messages'), payload)




    await setDoc(doc(db, 'friendList', currentUser.email, 'list', emailID), {
      email: chatUser.email,
      fullName: chatUser.fullName,
      photoURL: chatUser.photoURL,
      lastMessage: message,
    })

    await setDoc(doc(db, 'friendList', emailID, 'list', currentUser.email), {
      email: currentUser.email,
      fullName: currentUser.fullName,
      photoURL: currentUser.photoURL,
      lastMessage: message,
    })


    setMessage('');
  }

  return (
    <div className='w-full overflow-y-auto h-screen'>
      {/* chat-header */}
      <div className="flex justify-between items-center border-b-2 py-4 px-4 bg-gray-100 drop-shadow-sm sticky top-0">
        <div className="flex items-center space-x-4">
          <img src={chatUser?.photoURL} referrerPolicy="no-referrer" alt='logo' className='rounded-full w-12' />
          <h3 className="font-semibold">{chatUser?.fullName}</h3>
        </div>
        <div className="flex justify-around space-x-9">
          <MdMoreVert className='w-6 h-auto' />
        </div>
      </div>

      {/* chat-message */}
      <div className='flex flex-col p-4 w-[100%]' ref={chatBox}>
        {
          chatMessages.map((chat => (
            <ChatMessage message={chat.text} date={chat.time} sender={chat.senderEmail} key={chat.time}/>
          )))
        }

      </div>

      {/* message input box */}
      <div className='flex justify-around items-center p-2 bg-[#f0f2f5] rounded sticky bottom-0 my-auto mt-[550px]'>

        {/* buttons */}

        {toggleEmoji && <div className='absolute top-[-390px] left-5 overflow-hidden h-96'>
          <EmojiPicker onEmojiClick={(emojiObject, e) => setMessage(message + emojiObject.emoji)} />
        </div>}

        <div className='flex justify-between items-center space-x-5 z-10'>
          <MdOutlineEmojiEmotions className='w-7 h-auto text-[#54656f] hover:text-[#12Bc7e] transition-all' onClick={() => setToggleEmoji(!toggleEmoji)} />
          <ImAttachment className='w-6 h-auto text-[#54656f] hover:text-[#12Bc7e] transition-all' />
        </div>

        {/* text-input */}
        <form className=' w-[85%] z-10' onSubmit={send}>
          <input type="text" placeholder='Type a message' className='p-3 w-full rounded' value={message} onChange={e => setMessage(e.target.value)} />
        </form>

        {/* send-btn */}
        <button className='bg-[#12Bc7e] rounded-full p-[10px] hover:p-2 transition-all z-10' onClick={send}>
          <MdSend className='w-7 h-auto text-[#fff] hover:w-8 transition-all' />
        </button>

      </div>

    </div>
  )
}

export default ChatContainer
