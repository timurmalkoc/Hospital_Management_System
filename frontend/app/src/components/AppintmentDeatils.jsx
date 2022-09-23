import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment/moment';

export default function AppointmentDetails(props) {
    const currentDate = new Date()
    let navigate = useNavigate()
    const [data, setData] = useState([])
    const [ flag, setFlag ] = useState(false)
    const [ sibClass, setSibClass ] = useState('')
    const [ app, setApp ] = useState()
    const [ col, setCol ] = useState('3')

        if(!props.loggedIn)
            navigate('/')


        // Toggle for details
        const details = (idx) => {
            if(idx==app){
                setSibClass(" w3-hide")
                setApp(-1)
            }
            else{
                setApp(idx)
                setSibClass(" w3-show")
            }
        }

        // Load All appointmets ==============
        useEffect(() => {
            let myHeaders = new Headers()

            myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))
            
            fetch(`${props.base_url}/detailed` ,{
                headers: myHeaders
            })
            .then(res => res.json())
            .then(user => setData(user))
            .catch(() =>
                props.flashMessage('Encountered an issue, Please try again !', 'danger'))
        }, [])


        const tableHeaders = ['Appointment Id', 'Doctor Name', 'Reason','Date','Time']
        const subHeaders =['Weight', 'Height', 'Temperature', 'Diagnose', 'Advice', 'Medicine', 'Dosage']
    return(
        <>
          <div style={{marginLeft:"310px", marginTop:"60px"}}>
            {/* <button onClick={extend} className="w3-button col-11 w3-theme-l1 w3-left-align col-2">{btnName}</button> */}
            <table className={`table table-primary table-hover table-striped mt-3 col-${col}`}>
                <thead>
                    <tr>
                        {tableHeaders.map((head, i) => <th key={i}>{head}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {
                     data.map((appointment, idx) => 
                     moment(new Date(appointment.appointment.appointment_date)).add(moment.duration(4, 'hours')) < currentDate.getTime() && appointment.appointment.status?
                     <>
                        <tr key={idx} onClick={() => details(appointment.appointment.appointment_id)}>
                            <td>{appointment.appointment.appointment_id}</td>
                            <td>{appointment.appointment.doctor.personal.first_name+" "+appointment.appointment.doctor.personal.last_name}</td>
                            <td>{appointment.appointment.reason}</td>
                            <td>{moment(new Date(appointment.appointment.appointment_date)).add(moment.duration(4, 'hours')).format("MM-DD-YY")}</td>
                            <td>{moment(new Date(appointment.appointment.appointment_date)).add(moment.duration(4, 'hours')).format("HH:mm")}</td>
                        </tr>
                        <tr key={moment(new Date(appointment.appointment.appointment_date)).format("MMDDYYHHMM")} className={appointment.appointment.appointment_id==app? {sibClass}: ' w3-hide'}>
                    {/* sub table for deatails of visit */}
                        <td colspan="5">
                            <table className='table table-light col-${col}'>
                            <thead>
                                <tr>
                                    {subHeaders.map((head, i) => <th key={i}>{head}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        {appointment.visit.weight}
                                    </td>
                                    <td>
                                        {appointment.visit.height}
                                    </td>
                                    <td>
                                        {appointment.visit.temp}
                                    </td>
                                    <td>
                                        {appointment.diagnose.diagnose}
                                    </td>
                                    <td>
                                        {appointment.diagnose.advice}
                                    </td>
                                    <td>
                                        {appointment.diagnose.medicine}
                                    </td>
                                    <td>
                                        {appointment.diagnose.dosage}
                                    </td>
                                </tr>
                            </tbody>
                            </table>
                            </td>
                        </tr>
                        </>
                        :null
                     )  
                    }
                </tbody>
            </table>

           
          </div>
        </>
    )
}