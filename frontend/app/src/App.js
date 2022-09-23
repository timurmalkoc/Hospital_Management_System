import Navbar from './components/Navbar'
import Login from './components/Login'
import AlertMessage from './components/AlertMessage'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Signup from './components/Singup'
import Dashboard from './components/PatientDashboard'
import SideBar from './components/SideBar'
import ViewAccount from './components/ViewAccount'
import Footer from './components/Footer'
import UpdateProfile from './components/UpdateProfile'
import AdminDashboard from './components/AdminDashboard'
import DoctorDashboard from './components/DoctorDashboard'
import NurseDashboard from './components/NurseDashboard'
import NewUsers from './components/NewUsers'
import ActiveUsers from './components/ActiveUsers'
import AddNewUser from './components/AddNewUser'
import StaffList from './components/StaffList'
import ViewStaffAccount from './components/ViewStaffAccount'
import UpdateStaff from './components/UpdateStaff'
import DoctorList from './components/DoctorList'
import Appointment from './components/Appointment'
import ViewAppointments from './components/ViewAppointments'
import ViewAllAppointments from './components/ViewAllAppointments'
import ViewUser from './components/ViewUser'
import ViewDoctorAppointments from './components/ViewDoctorAppointments'
import ViewNurseAppointments from './components/ViewNurseAppointments'
import AppointmentDetails from './components/AppintmentDeatils'

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
        <Route path='/dashboard' element={<Dashboard flashMessage={flashMessage} base_url={base_url} expressBackend={expressBackend} loggedIn={loggedIn}/>}/>
        <Route path='/admindashboard' element={<AdminDashboard flashMessage={flashMessage} base_url={base_url} loggedIn={loggedIn}/>}/>
        <Route path='/doctordashboard' element={<DoctorDashboard flashMessage={flashMessage} base_url={base_url} loggedIn={loggedIn}/>}/>
        <Route path='/nursedashboard' element={<NurseDashboard flashMessage={flashMessage} base_url={base_url} loggedIn={loggedIn}/>}/>
        <Route path='/viewaccount' element={<ViewAccount base_url={base_url} loggedIn={loggedIn} flashMessage={flashMessage} logout={logout}/>}/>
        <Route path='/viewaccount/:personId' element={<ViewUser base_url={base_url} loggedIn={loggedIn} flashMessage={flashMessage} logout={logout}/>}/>
        <Route path='/updateprofile/:person_id' element={<UpdateProfile flashMessage={flashMessage} base_url={base_url} loggedIn={loggedIn}/>}/>
        <Route path='/newusers' element={<NewUsers base_url={base_url} loggedIn={loggedIn} flashMessage={flashMessage}/>}/>
        <Route path='/activeusers' element={<ActiveUsers base_url={base_url} loggedIn={loggedIn} flashMessage={flashMessage}/>}/>
        <Route path='/addnewuser' element={<AddNewUser base_url={base_url} loggedIn={loggedIn} flashMessage={flashMessage}/>}/>
        <Route path='/stafflist' element={<StaffList base_url={base_url} loggedIn={loggedIn} flashMessage={flashMessage}/>}/>
        <Route path='/viewstaffaccount/:personId' element={<ViewStaffAccount flashMessage={flashMessage} base_url={base_url} loggedIn={loggedIn}/>}/>
        <Route path='/updatestaff/:personId' element={<UpdateStaff flashMessage={flashMessage} base_url={base_url} loggedIn={loggedIn}/>}/>
        <Route path='/doctorlist' element={<DoctorList flashMessage={flashMessage} base_url={base_url} loggedIn={loggedIn}/>}/>
        <Route path='/appointment/:doctorId' element={<Appointment flashMessage={flashMessage} base_url={base_url} loggedIn={loggedIn}/>}/>
        <Route path='/appointments' element={<ViewAppointments flashMessage={flashMessage} base_url={base_url} loggedIn={loggedIn}/>}/>
        <Route path='/allappointments' element={<ViewAllAppointments flashMessage={flashMessage} base_url={base_url} loggedIn={loggedIn}/>}/>
        <Route path='/doctorappointments' element={<ViewDoctorAppointments flashMessage={flashMessage} base_url={base_url} loggedIn={loggedIn}/>}/>
        <Route path='/nurseappointments' element={<ViewNurseAppointments flashMessage={flashMessage} base_url={base_url} loggedIn={loggedIn}/>}/>
        <Route path='/appointmentdetails' element={<AppointmentDetails flashMessage={flashMessage} base_url={base_url} loggedIn={loggedIn}/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
