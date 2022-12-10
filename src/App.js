import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chatpage from './components/chatpage/Chatpage';
import Home from './components/home/Home';
import Login from './components/login/Login';
import { useState } from 'react';
import { signOut } from "firebase/auth";
import { auth } from './firebase';




function App() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

  let signOutFunc = () => {
    signOut(auth).then(() => {
      setUser(null)
      localStorage.removeItem('user')
    }).catch((error) => {
      alert(error.message)
    })
  }

  return (
    <div className='App'>
      <Router>
      {user? (
        <Routes>
          <Route path="/" element={<Home signOutFunc={signOutFunc} currentUser={user}/>} />
          <Route path="/:emailID" element={<Chatpage signOutFunc={signOutFunc}  currentUser={user}/>} />
        </Routes>
      ) : (
        <Login setUser={setUser}/>
      )}

      </Router>
    </div>
  );
}

export default App;
