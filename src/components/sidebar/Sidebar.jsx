import { useEffect, useState } from 'react'
import { MdToll, MdOutlineInsertComment, MdMoreVert, MdOutlineLogout } from 'react-icons/md'
import Userinfo from '../userinfo/Userinfo'
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase';

const Sidebar = ({ signOutFunc, currentUser }) => {

  const [allUsers, setAllUsers] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [friendlist, setFriendlist] = useState([])

  useEffect(() => {
    let getAllUsers = async () => {

      const querySnapshot = await getDocs(collection(db, "users"));
      setAllUsers(querySnapshot.docs.filter(doc => doc.data().email !== currentUser.email))

    }

    let getFriends = async () => {
      const docRef = await collection(db, "friendList", currentUser.email, 'list');

      onSnapshot(docRef, snap => {
        setFriendlist(snap.docs);
      })
    }


    getAllUsers()
    getFriends()
  }, [])

  let searchedContact = allUsers.filter((user) => {
    if (searchInput) {
      if (user.data().fullName.toLowerCase().includes(searchInput.toLowerCase())) {
        return user
      }
    }
  })

  // console.log(allUsers.forEach(element => {console.log(element.data().email)}));

  let searchedItem = searchedContact.map(contact => (
    <Userinfo
      name={contact.data().fullName}
      profile={contact.data().photoURL}
      email={contact.data().email}
      lastMessage={contact.data().lastMessage}
      key={contact.id}
    />
  ))

  return (
    <>
      <div className='w-full sm:w-[28%] bg-gray-100 border-r-2 border-black h-screen overflow-y-auto'>
        {/* sidebar-header */}
        <div className="flex justify-between items-center border-b-2 py-4 px-1 sticky top-0 bg-gray-100 drop-shadow-sm">
          <div className="w-16 h-auto">
            <img src={currentUser?.photoURL} alt='logo' referrerPolicy="no-referrer" className='rounded-full w-12' />
          </div>
          <div className="flex justify-around space-x-4 ">
            <MdToll className='w-6 h-auto' />
            <MdOutlineInsertComment className='w-6 h-auto' />
            <MdMoreVert className='w-6 h-auto' />
            <MdOutlineLogout className='w-6 h-auto hover:text-red-500 hover:w-7 transition-all'
              onClick={signOutFunc} />
          </div>
        </div>

        {/* sidebar-search */}
        <div>
          <input type="search" placeholder='Search Contacts' className='border-b-2 w-full px-2 py-3'
            value={searchInput} onChange={(event) => { setSearchInput(event.target.value) }} />
        </div>

        {/* sidebar-users */}

        {searchedItem.length > 0 ? searchedItem : (

          friendlist.map(friend => (
            <Userinfo
              name={friend.data().fullName}
              profile={friend.data().photoURL}
              email={friend.data().email}
              lastMessage={friend.data().lastMessage}
              key={friend.id}
            />
          ))
        )}

      </div>
    </>
  )
}

export default Sidebar
