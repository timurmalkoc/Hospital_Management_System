import DatePicker from 'react-datepicker';
import addDays from 'date-fns/addDays'
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

export default function Appointment(props) {
    const [start_date, setStartDate] = useState(new Date())
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const { doctorId } = useParams()

        if(!props.loggedIn)
            navigate('/')

        // disable weekends ------
        const isWeekday = (date) => {
            const day = date.getDay()

            return day !== 0 && day !== 6;
        }

        // disable passed time
        const filterPassedTime = (time) => {
            const currentDate = new Date();
            const selectedDate = new Date(time);
        
            return currentDate.getTime() < selectedDate.getTime();
          };

        // Load Doctor info ==============
        useEffect(() => {

            let myHeaders = new Headers()

            myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))

            fetch(`${props.base_url}/doctor/${doctorId}` ,{
                headers: myHeaders
            })
            .then(res => res.json())
            .then(user => {
                setData(user)                  
            })

        }, [])

        // schedule appintment
        const schedule = e => {
            let myHeaders = new Headers()
            myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))
            myHeaders.append('Content-Type', 'application/json')

            let formData = JSON.stringify({
                appointment_date:   e.target.appointment.value,
                reason:             e.target.reason.value,
                doctor_id:          doctorId
            })
            console.log(e.target.appointment.value)
            fetch(`${props.base_url}/scheduleappointment/${doctorId}`, {
                method:'POST',
                headers: myHeaders,
                body:formData
            })

            .then(res => res.json())
            .then(data => {
                if(data.ok)
                    props.flashMessage('You have successfully scheduled an appointment', 'success')
            })        
            navigate('/appointments')
        }
        
    return(
        <>
        {data.length!==0?
        <form onSubmit={schedule}>
        <div style={{marginLeft:"310px", marginTop:"60px"}}>
            <div className="d-flex justify-content-start col-lg-11 me-4 w3-row-padding">
            {/* doctor info */}
                <div className="card mb-4 me-2 col-lg-11">
                    <div className="card-body">
                        {/* start of row */}
                        <div className="row">
                            <div className="col-sm-3">
                                <p className="mb-0">Full Name</p>
                            </div>
                            <div className="col-sm-9">
                                <p className="text-muted mb-0">{data? data.personal.first_name:null} {data? data.personal.middle_name:null} {data? data.personal.last_name:null}</p>
                            </div>
                        </div>
                        <hr/>
                        {/* end of row */}
                        {/* start of row */}
                        <div className="row">
                            <div className="col-sm-3">
                                <p className="mb-0">Gender</p>
                            </div>
                            <div className="col-sm-9">
                                <p className="text-muted mb-0">{data? data.personal.gender:null}</p>
                            </div>
                        </div>
                        <hr/>
                        {/* end of row */}
                        {/* start of row */}
                        <div className="row">
                            <div className="col-sm-3">
                                <p className="mb-0">E-mail</p>
                            </div>
                            <div className="col-sm-9">
                                <p className="text-muted mb-0">{data? data.personal.email:null}</p>
                            </div>
                        </div>
                        <hr/>
                        {/* end of row */}
                        {/* start of row */}
                        <div className="row">
                            <div className="col-sm-3">
                                <p className="mb-0">Phone</p>
                            </div>
                            <div className="col-sm-9">
                                <p className="text-muted mb-0">{data? data.personal.phone:null}</p>
                            </div>
                        </div>
                        <hr/>
                        {/* end of row */}

                        {/* end of row */}
                        {data.experience?
                        <>
                        <div className="row">
                            <div className="col-sm-3">
                                <p className="mb-0">Experience</p>
                            </div>
                            <div className="col-sm-9">
                                <p className="text-muted mb-0">{data? data.experience:null}</p>
                            </div>
                        </div>
                        <hr/>
                        </>
                        : null}
                        {/* end of row */}
                        {/* end of row */}
                        {data.specialties?
                        <>
                        <div className="row">
                            <div className="col-sm-3">
                                <p className="mb-0">Specialties</p>
                            </div>
                            <div className="col-sm-9">
                                <p className="text-muted mb-0">{data? data.specialties:null}</p>
                            </div>
                        </div>
                        <hr/>
                        </>
                        : null}
                        {/* end of row */}
                        {/* end of row */}
                        {data.about?
                        <>
                        <div className="row">
                            <div className="col-sm-3">
                                <p className="mb-0">About</p>
                            </div>
                            <div className="col-sm-9">
                                <p className="text-muted mb-0">{data? data.about:null}</p>
                            </div>
                        </div>
                        <hr/>
                        </>
                        : null}
                        {/* end of row */}
                    </div>
                </div>
                <div className="col-lg-2">
                    <div className="card mb-2">
                        <div className="card-body text-center">
                            <img src={data? data.personal.profile_img:"https://www.w3schools.com/w3images/avatar2.png"} alt="avatar" className="rounded-circle img-fluid" style={{width: "150px"}}/>   
                        </div>
                    </div>
                </div>
            </div>
            {/* appointment */}
            <hr/>
            <div className="d-flex justify-content-around">
                <div className="w3-margin" >
                    <p className="text-justify col-5 card ps-5 p-2" style={{width: "300px"}}>Pick an Appointment Time</p>
                    <DatePicker
                        selected={ start_date? start_date:null }
                        onChange={ date => setStartDate(date) }
                        filterDate={isWeekday}
                        filterTime={filterPassedTime}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        timeCaption="time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        minDate={new Date()}
                        maxDate={addDays(new Date(), 30)}
                        minTime={setHours(setMinutes(new Date(), 30), 8)}
                        maxTime={setHours(setMinutes(new Date(), 30), 16)}
                        name='appointment'
                        className="col-12"
                    />
                </div>
                <div className="w3-margin">
                    <div className="form-floating">
                        <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{height:"100px", width: "300px"}} name="reason"></textarea>
                        <label htmlFor="floatingTextarea2">Reason</label>
                    </div>
                </div>
                </div>
                <div className="d-flex justify-content-center mb-4">
                    <button type="submit" className="btn btn-outline-success ms-1">Schedule</button>
                </div>
            
            </div>
        </form>
        :null}
            </>
    )   
}