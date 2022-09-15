import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AppointmentCard from './AppointmentCard'
import moment from 'moment/moment';

export default function ViewAppointments(props){
    const currentDate = new Date()
    let navigate = useNavigate()
    const [data, setData] = useState([])
        if(!props.loggedIn)
            navigate('/')

        // Load All appointmets ==============
        useEffect(() => {
            let myHeaders = new Headers()

            myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))
            
            fetch(`${props.base_url}/checkappointments` ,{
                headers: myHeaders
            })
            .then(res => res.json())
            .then(user => setData(user))
            .catch(() =>
                props.flashMessage('Encountered an issue, Please try again !', 'danger'))
        }, [])
        
        return(
            <>
            {data.length!==0?
                <div>
                    <div className="d-flex flex-wrap justify-content-around col-lg-9 me-4 w3-row-padding" style={{marginLeft:"310px", marginTop:"60px"}}>
                        
                        {data.map((person, idx) => moment(new Date(person.appointment_date)).add(moment.duration(4, 'hours')) > currentDate.getTime()? <AppointmentCard flashMessage={props.flashMessage} base_url={props.base_url} idx={idx} 
                                appointment_date={person.appointment_date} reason={person.reason} doctor={person.doctor.personal.first_name+" "+person.doctor.personal.last_name} status={person.status}
                                phone={person.doctor.personal.phone} time={moment(new Date(person.appointment_date)).add(moment.duration(4, 'hours')).format("HH:mm")}
                                
                        />:null ) }
                    </div>
                </div>
                :null}
            </>
        )
}