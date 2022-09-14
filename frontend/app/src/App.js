import Navbar from './components/Navbar'
import Login from './components/Login';
import AlertMessage from './components/AlertMessage';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Signup from './components/Singup';
import Dashboard from './components/PatientDashboard';
import SideBar from './components/SideBar';
import ViewAccount from './components/ViewAccount';
import Footer from './components/Footer'
import UpdateProfile from './components/UpdateProfile'
import AdminDashboard from './components/AdminDashboard'
import NewUsers from './components/NewUsers';

function App(props) {
  let navigate = useNavigate()
  const [message, setMessage] = useState(null);
  const [category, setCategory] = useState(null);
  const [loggedIn, setLoggedIn] = useState((localStorage.getItem('token')) ? true:false);

  const base_url = "http://127.0.0.1:5000"
  const expressBackend = "http://127.0.0.1:8000"

  const flashMessage = (message, category) => {
      setMessage(message);
      setCategory(category);
  }

  const login = () => {
      setLoggedIn(true)
  }

  const logout = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('expire')
      localStorage.removeItem('user_type')
      localStorage.removeItem('username')
      localStorage.removeItem('profile_img')
      setLoggedIn(false)
      navigate('/')
      
  }



  return (
    <>
    <Navbar logout={logout} loggedIn={loggedIn}/>
    {message ? <AlertMessage message={message} category={category} flashMessage={flashMessage} /> : null}
    {loggedIn ? <SideBar/> : null}
      <Routes>
        <Route path='/' element={<Login flashMessage={flashMessage} base_url={base_url} login={login} loggedIn={loggedIn}/>}/>
        <Route path='/signup' element={<Signup flashMessage={flashMessage} base_url={base_url} loggedIn={loggedIn}/>}/>
        <Route path='/dashboard' element={<Dashboard flashMessage={flashMessage} base_url={base_url}/>}/>
        <Route path='/admindashboard' element={<AdminDashboard flashMessage={flashMessage} base_url={base_url}/>}/>
        <Route path='/viewaccount' element={<ViewAccount base_url={base_url} loggedIn={loggedIn} flashMessage={flashMessage}/>}/>
        <Route path='/updateprofile/:person_id' element={<UpdateProfile flashMessage={flashMessage} base_url={base_url} loggedIn={loggedIn}/>}/>
        <Route path='/newusers' element={<NewUsers base_url={base_url} loggedIn={loggedIn} flashMessage={flashMessage}/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
