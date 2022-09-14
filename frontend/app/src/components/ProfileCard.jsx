import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProfileCard(props) {
  let navigate = useNavigate()

  const activate = async() => {
    let myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))
    myHeaders.append('Content-Type', 'application/json')

    await fetch(`${props.base_url}/activateuser/${props.id}`, {
      method:'PUT',
      headers: myHeaders
  })

  .then(res => res.json())
  .then(data => {
      if(data.error){
          props.flashMessage(`${data.error}`, 'danger')
          navigate('/viewaccount')}
      else{
          props.flashMessage('User info has been updated successfully', 'success')
          window.location.reload()
      }

  })
  }

  return (
        <div className='w3-card w3-round w3-white me-4 mb-4 col-3'>
        <div className="w3-container " key={props.idx}>
          <p className="w3-center mt-4"><img src={props.profile? props.profile:"https://www.w3schools.com/w3images/avatar2.png"} className="w3-circle" style={{height:"106px", width:"106px"}} alt="Avatar"/></p>
          <hr/>
          <p><i className="fa fa-pencil fa-fw w3-margin-right w3-text-theme"></i>{props.fullname}</p>
          <p><i className="fa fa-mobile fa-fw w3-margin-right w3-text-theme"></i>{props.phone}</p>
          <p><i className="fa fa-home fa-fw w3-margin-right w3-text-theme"></i>{props.address}</p>
          <p><i className="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme"></i>{new Date(props.birth).toDateString()}</p>
        </div>
        <div className="d-flex justify-content-center mb-4">
                <a onClick={activate} className="btn btn-outline-success ms-1">Activate</a>
            </div>
        </div>
  )}