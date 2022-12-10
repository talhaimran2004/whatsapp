import { useNavigate } from 'react-router-dom'

const Userinfo = ({name, profile, email, lastMessage}) => {  

  const navigate = useNavigate();

  let goToUser = (userEmail) => {
    if (userEmail)
    navigate(`/${userEmail}`)
  }

  return (
    <div className='w-full py-2 px-2 border-b-2 flex items-center transition-all hover:scale-105' onClick={() => goToUser(email)}>
      <div>
        <img src={profile} alt="Profile Image" referrerPolicy="no-referrer" className='w-12 h-auto border-2 mr-3 rounded-full' />
      </div>
      <div>
        <h3 className='font-semibold'>{name}</h3>
        {lastMessage && (<p className='text-xs text-gray-500 mt-1 ml-0'>{lastMessage}</p>)}
      </div>
    </div>
  )
}

export default Userinfo
