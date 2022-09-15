import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function StaffCard(props) {
  let navigate = useNavigate()
  // activate account

  return (
        <div className='w3-card w3-round w3-white me-4 mb-4' style={{width:"300px"}}>
          <div className="w3-container " key={props.idx}>
            <p className="w3-center mt-4"><img src={props.profile? props.profile:"https://www.w3schools.com/w3images/avatar2.png"} className="w3-circle" style={{height:"106px", width:"106px"}} alt="Avatar"/></p>
            <hr/>
            <p><i className="fa fa-pencil fa-fw w3-margin-right w3-text-theme"></i>{props.fullname}</p>
            <p><i className="fa fa-mobile fa-fw w3-margin-right w3-text-theme"></i>{props.phone}</p>
            <p><i className="fa fa-briefcase fa-fw w3-margin-right w3-text-theme"></i>{props.role}</p>
            <p><i className="fa fa-sitemap fa-fw w3-margin-right w3-text-theme"></i>{props.department}</p>
            <p><i className="fa fa-home fa-fw w3-margin-right w3-text-theme"></i>{props.address}</p>
            <p><i className="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme"></i>{new Date(props.birth).toDateString()}</p>
            {props.experience ?<p><i className="fa fa-asterik fa-fw w3-margin-right w3-text-theme"></i>{props.experience}</p> : null}
            {props.specialties ? <p><i className="fa fa-tag fa-fw w3-margin-right w3-text-theme"></i>{props.specialties}</p> : null}
            <p className={`badge ${props.active? "bg-success":"bg-warning"}`} style={{width:"265px"}}>{props.active ? "Active":"Frozen"}</p>
          </div>
          <div className="d-flex justify-content-center mb-4">
              <a onClick={() => navigate(`/viewstaffaccount/${props.id}`)} className="btn btn-outline-warning ms-1">Check Detailed</a>
          </div>
        </div>
  )}