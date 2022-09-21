import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function StaffCard(props) {
  const [ data, setData ] = useState([])
  const [ flag, setFlag ] = useState(false)
  const [ sibClass, setSibClass ] = useState(' w3-hide')
  const [ col, setCol ] = useState('3')
  const [ diagnose, setDiagnose ] = useState('')
  const [ advice, setAdvice ] = useState('')
  const [ dosage, setDosage ] = useState('')
  const [ medicine, setMedicine ] = useState('')
  const [ weight, setWeight ] = useState(0)
  const [ height, setHeight ] = useState(0)
  const [ temp, setTemp ] = useState(0)
  const [ btnColor, setBtnColor ] = useState('success')
  const [ btnName, setBtnName ] = useState('Show Deatails')


  // =============================================== Admin ===================================================
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
      if(!data.ok)
          props.flashMessage(`${data.error}`, 'danger')
      else
          props.flashMessage('Appointment has been Approved !', 'success')
      window.location.reload()
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
    window.location.reload()
})
}
    // =========== details accordion =============
    const extend = () => {
        if(!flag){
                if(localStorage.getItem('user_type')=='doctor')
                    getdiagnose()
                if(localStorage.getItem('user_type')=='nurse')
                    getvisit()
                setSibClass(" w3-show")
                setCol('12')
                setFlag(true)
                setBtnName('Hide Deatails')
        }
        else{
            setSibClass(" w3-hide")
            setCol('3')
            setFlag(false)
            setBtnName('Show Deatails')
        }
    }

    // =============================================== Doctor ===================================================
    // ==== enter diagnose
    const senddianose = async (e) =>{
        e.preventDefault()
        let myHeaders = new Headers();

        myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))
        myHeaders.append('Content-Type', 'application/json')
        let formData = JSON.stringify({
            diagnose:   e.target.diagnose.value,
            advice:     e.target.advice.value,
            medicine:   e.target.medicine.value,
            dosage:     e.target.dosage.value,
            appointment_id: props.appointment_id
        })

        await fetch(`${props.base_url}/diagnose`, {
        method:'POST',
        headers: myHeaders,
        body:formData
        })

        .then(res => res.json())
        .then(data => {
            if(data.error)
                props.flashMessage(`${data.error}`, 'danger')
            else{
                props.flashMessage('Diagnose has been saved', 'success')
                setSibClass(" w3-hide")
                setCol('3')
                setFlag(false)
                setBtnName('Show Deatails')
                if(!data.success)
                    setBtnColor('primary')
            }
        })
    }

    // === fetch exiting diagnoise
    const getdiagnose = () =>{
    let myHeaders = new Headers()

            myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))
            console.log(data.length)
            fetch(`${props.base_url}/diagnose/${props.appointment_id}` ,{
                headers: myHeaders
            })
            .then(res => res.json())
            .then((user) => {
                setAdvice(user.advice)
                setDiagnose(user.diagnose)
                setMedicine(user.medicine)
                setDosage(user.dosage)
                setData(user)
            })
            .catch(() =>
                props.flashMessage('Encountered an issue, Please try again !', 'danger'))
        }

    // =============================================== Nurse ===================================================
    // ==== enter visit deatils
    const entervisitdetails = async (e) =>{
        e.preventDefault()
        let myHeaders = new Headers();

        myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))
        myHeaders.append('Content-Type', 'application/json')
        let formData = JSON.stringify({
            temp:       e.target.temp.value,
            weigth:     e.target.weight.value,
            height:     e.target.height.value,
            appointment_id: props.appointment_id
        })

        await fetch(`${props.base_url}/visitinfo`, {
        method:'POST',
        headers: myHeaders,
        body:formData
        })

        .then(res => res.json())
        .then(data => {
            if(data.error)
                props.flashMessage(`${data.error}`, 'danger')
            else{
                props.flashMessage('Visit deatils has been saved', 'success')
                setSibClass(" w3-hide")
                setCol('3')
                setFlag(false)
                setBtnName('Show Deatails')
                if(!data.success)
                    setBtnColor('primary')
            }
        })
    }

    // === fetch exiting visit
    const getvisit = () =>{
    let myHeaders = new Headers()

            myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))
            console.log(data.length)
            fetch(`${props.base_url}/visits/${props.appointment_id}` ,{
                headers: myHeaders
            })
            .then(res => res.json())
            .then((user) => {
                setTemp(user.temp)
                setWeight(user.weight)
                setHeight(user.height)
                setData(user)
            })
            .catch(() =>
                props.flashMessage('Encountered an issue, Please try again !', 'danger'))
        }



  return (
        <div className={`w3-card w3-round w3-white me-4 mb-4 col-${col}`}>
          <div className="w3-container " key={props.idx}>
          <p><i className="fa fa-calendar fa-fw w3-margin-right w3-text-theme mt-4"></i>{new Date(props.appointment_date).toDateString()}</p>
          {props.patient ?<p><i className="fa fa-user-o fa-fw w3-margin-right w3-text-theme"></i><a href={`/viewaccount/${props.patientId}`}>{props.patient}</a></p> : null}
            <hr/>
            <p><i className="fa fa-user-md fa-fw w3-margin-right w3-text-theme"></i>{props.doctorId ? <a href={`/viewstaffaccount/${props.doctorId}`}>{props.doctor}</a>:props.doctor}</p>
            <p><i className="fa fa-clock-o fa-fw w3-margin-right w3-text-theme"></i>{props.time}</p>
            <p><i className="fa fa-mobile fa-fw w3-margin-right w3-text-theme"></i>{props.phone}</p>
            
            {props.experience ?<p><i className="fa fa-asterik fa-fw w3-margin-right w3-text-theme"></i>{props.experience}</p> : null}
            {props.specialties ? <p><i className="fa fa-tag fa-fw w3-margin-right w3-text-theme"></i>{props.specialties}</p> : null}
            <p className={`badge ms-2 ${props.status? "bg-success":"bg-warning"}`} style={{width:"100px"}}>{props.status ? "Approved":"On Hold"}</p>
          </div>

          {/* =================================================== admin =================================================== */}

          {localStorage.getItem('user_type') == 'admin' && !props.status ?
          <div className="d-flex justify-content-center mb-4">
              <button onClick={accept} className="btn btn-outline-success ms-1">Accept</button>
              <a onClick={decline} className="btn btn-outline-danger ms-4">Decline</a>
          </div>
          :null}

          {/* =================================================== doctor =================================================== */}

          {localStorage.getItem('user_type') == 'doctor' && props.status ?
          <div className="d-flex flex-column justify-content-center ms-4 mb-4">
            <button onClick={extend} className="w3-button col-11 w3-theme-l1 w3-left-align col-2">{btnName}</button>

            <form onSubmit={senddianose}>
                <div className='d-flex'>             
                </div>
                <div className={`mt-4 ${sibClass} w3-container`}>
                    <div className="form-floating col-11">
                        <textarea className="form-control" id="floatingTextarea2" style={{height: "100px"}} name='diagnose' onChange={e => setDiagnose(e.target.value)} value={diagnose? diagnose:""}></textarea>
                        <label htmlFor="floatingTextarea2">Diagnose</label>
                    </div>
                </div>
                <div className={`mt-4 ${sibClass} w3-container`}>
                    <div className="form-floating col-11">
                        <textarea className="form-control"id="floatingTextarea2" style={{height: "100px"}} name='advice' onChange={e => setAdvice(e.target.value)} value={advice? advice:""}></textarea>
                        <label htmlFor="floatingTextarea2">Advice</label>
                    </div>
                </div>
                <div className={`mt-4 ${sibClass} w3-container`}>
                    <div className="form-floating col-11">
                        <textarea className="form-control"id="floatingTextarea2" style={{height: "100px"}} name='medicine' onChange={e => setMedicine(e.target.value)} value={medicine? medicine:""}></textarea>
                        <label htmlFor="floatingTextarea2">Medicine</label>
                    </div>
                </div>
                <div className={`mt-4 ${sibClass} w3-container`}>
                    <div className="form-floating col-11">
                        <textarea className="form-control" id="floatingTextarea2" style={{height: "100px"}} name='dosage' onChange={e => setDosage(e.target.value)} value={dosage? dosage:""}></textarea>
                        <label htmlFor="floatingTextarea2">Dosage</label>
                    </div>
                </div>
                <div className={`mt-4 ${sibClass} w3-container`}>
                    <button type='submit' className={`btn btn-outline-${btnColor} success col-3`}>Submit</button>
                </div>
                </form>
          </div>
          :null}

          {/* ========================================================= Nurse ======================================================= */}

          {localStorage.getItem('user_type') == 'nurse' && props.status ?
          <div className="d-flex flex-column justify-content-center ms-4 mb-4">
            <button onClick={extend} className="w3-button col-11 w3-theme-l1 w3-left-align col-2">{btnName}</button>

            <form onSubmit={entervisitdetails}>
                <div className='d-flex'>             
                </div>
                <div className={`mt-4 ${sibClass} w3-container`}>
                    <div className="form-floating col-11">
                        <textarea className="form-control" id="floatingTextarea2" style={{height: "100px"}} name='weight' onChange={e => setWeight(e.target.value)} value={weight? weight:""}></textarea>
                        <label htmlFor="floatingTextarea2">Weight</label>
                    </div>
                </div>
                <div className={`mt-4 ${sibClass} w3-container`}>
                    <div className="form-floating col-11">
                        <textarea className="form-control"id="floatingTextarea2" style={{height: "100px"}} name='height' onChange={e => setHeight(e.target.value)} value={height? height:""}></textarea>
                        <label htmlFor="floatingTextarea2">Height</label>
                    </div>
                </div>
                <div className={`mt-4 ${sibClass} w3-container`}>
                    <div className="form-floating col-11">
                        <textarea className="form-control"id="floatingTextarea2" style={{height: "100px"}} name='temp' onChange={e => setTemp(e.target.value)} value={temp? temp:""}></textarea>
                        <label htmlFor="floatingTextarea2">Temperature</label>
                    </div>
                </div>
                <div className={`mt-4 ${sibClass} w3-container`}>
                    <button type='submit' className={`btn btn-outline-${btnColor} success col-3`}>Submit</button>
                </div>
                </form>
          </div>
          :null}

        </div>
  )}