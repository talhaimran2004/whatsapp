import { auth } from "../../firebase"

const ChatMessage = ({ message, date, sender }) => {
  return (
    <div className='flex rounded-lg w-fit p-2 my-1 bg-[#dcf8c6] max-w-sm sm:max-w-[600px]'
      style={{
        alignSelf:
          sender === auth.currentUser?.email ? 'flex-end' : 'flex-start',

        backgroundColor:
          sender === auth.currentUser?.email ? '#dcf8c6' : '#fff',
      }}
    >
      <div>
        <div className='my-2'>
          <p className='text-left'>{message}</p>
        </div>
        <div>
          <p className='text-xs text-gray-400 text-right'>{new Date(date.toDate()).toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}

export default ChatMessage
