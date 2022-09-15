import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function StaffCard(props) {
  let navigate = useNavigate()
  const [refresh, setRefresh] = useState(0)
  // approve appointment
  const accept = async() => {
      let myHeaders = new Headers();
      myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))
      myHeaders.append('Content-Type', 'application/json')
      await fetch(`${props.base_url}/acceptappointment/${props.id}`, {
      method:'PUT',
      headers: myHeaders
  })

  .then(res => res.json())
  .then(data => {
      if(data.error)
          props.flashMessage(`${data.error}`, 'danger')
      else
          props.flashMessage('Appointment has been Approved !', 'success')
      setRefresh(1)
  })
  }

  // decline appintment
  const decline = async() => {
    let myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))
    myHeaders.append('Content-Type', 'application/json')
    await fetch(`${props.base_url}/declineappointment/${props.id}`, {
    method:'DELETE',
    headers: myHeaders
})

.then(res => res.json())
.then(data => {
    if(data.error)
        props.flashMessage(`${data.error}`, 'danger')
    else
        props.flashMessage('Appointment has declined', 'danger')
    setRefresh(1)
})
}


  return (
        <div className='w3-card w3-round w3-white me-4 mb-4' style={{width:"300px"}}>
          <div className="w3-container " key={props.idx}>
          <p><i className="fa fa-calendar fa-fw w3-margin-right w3-text-theme mt-4"></i>{new Date(props.appointment_date).toDateString()}</p>
          {props.patient ?<p><i className="fa fa-user-o fa-fw w3-margin-right w3-text-theme"></i><a href={`/viewaccount/${props.patientId}`}>{props.patient}</a></p> : null}
            <hr/>
            <p><i className="fa fa-user-md fa-fw w3-margin-right w3-text-theme"></i>{props.doctorId ? <a href={`/viewstaffaccount/${props.doctorId}`}>{props.doctor}</a>:props.doctor}</p>
            <p><i className="fa fa-clock-o fa-fw w3-margin-right w3-text-theme"></i>{props.time}</p>
            <p><i className="fa fa-mobile fa-fw w3-margin-right w3-text-theme"></i>{props.phone}</p>
            
            {props.experience ?<p><i className="fa fa-asterik fa-fw w3-margin-right w3-text-theme"></i>{props.experience}</p> : null}
            {props.specialties ? <p><i className="fa fa-tag fa-fw w3-margin-right w3-text-theme"></i>{props.specialties}</p> : null}
            <p className={`badge ${props.status? "bg-success":"bg-warning"}`} style={{width:"265px"}}>{props.status ? "Approved":"On Hold"}</p>
          </div>
          {/* Admin buttons */}
          {localStorage.getItem('user_type') == 'admin' && !props.status ?
          <div className="d-flex justify-content-center mb-4">
              <button onClick={accept} className="btn btn-outline-success ms-1">Accept</button>
              <a onClick={decline} className="btn btn-outline-danger ms-4">Decline</a>
          </div>
          :null}
        </div>
  )}