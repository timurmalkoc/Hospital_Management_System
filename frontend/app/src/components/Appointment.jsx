import DatePicker from 'react-datepicker';
import addDays from 'date-fns/addDays'
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

export default function Appointment(props) {
    const[start_date, setStartDate] = useState(new Date())
    const navigate = useNavigate()
    const { doctorId } = useParams()

        if(!props.loggedIn)
            navigate('/')
        // Loding user info ==============
        const [data, setData] = useState()
        useEffect(() => {
            if(localStorage.getItem('user_type') != 'patient')
                navigate('/viewaccount')

            let myHeaders = new Headers()

            myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))

            fetch(`${props.base_url}/doctor/${doctorId}` ,{
                headers: myHeaders
            })
            .then(res => res.json())
            .then(user => setData(user))
            .catch(err => props.flashMessage('Encountered an issue, Please try again !', 'danger'))
        }, [])



    return(
        <>
        <div style={{marginLeft:"310px", marginTop:"60px"}}>
            <div className="d-flex justify-content-start col-lg-11 me-4 w3-row-padding">
            {/* doctor info */}
                <div className="card mb-4 me-4 col-lg-8">
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
                <p className="text-justify col-3 card ps-5 p-2">Pick an Appointment Time</p>
                <DatePicker
                        selected={ start_date? start_date:null }
                        onChange={ date => setStartDate(date) }
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={20}
                        timeCaption="time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        minDate={new Date()}
                        maxDate={addDays(new Date(), 7)}
                        className="col-3"
                    />
            </div>
            </>
    )   
}