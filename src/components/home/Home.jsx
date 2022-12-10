import Sidebar from '../sidebar/Sidebar'

const Home = ({ signOutFunc, currentUser }) => {
  return (
    <div className='block items-center bg-slate-100 sm:flex'>
      {/* SIDEBAR */}
      <Sidebar signOutFunc={signOutFunc} currentUser={currentUser} />

      {/* CONTAINER WITH WA LOGO */}
      <div className='m-auto hidden sm:block'>
        <img src="./images/wa.png" alt="whatsapp logo" className='w-full opacity-25' />
      </div>
    </div>
  )
}

export default Home
