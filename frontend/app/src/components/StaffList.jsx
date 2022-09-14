import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StaffCard from './StaffCard'

    export default function ActiveUsers(props) {
        let navigate = useNavigate()
        const [data, setData] = useState([])
        useEffect(() => {
            if(localStorage.getItem('user_type') != 'admin')
                navigate('/viewaccount')

            let myHeaders = new Headers()

            myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))

            fetch(`${props.base_url}/stafflist` ,{
                headers: myHeaders
            })
            .then(res => res.json())
            .then(user => setData(user))
            .catch(err => props.flashMessage('Encountered an issue, Please try again !', 'danger'))
        }, [])

        return (
            <>
            <div className="" style={{marginLeft:"310px", marginTop:"60px"}}>
                <div className='d-flex flex-wrap justify-content-evenly'>
                {data ? 
                data.map((person, idx) => <StaffCard flashMessage={props.flashMessage} base_url={props.base_url} fullname={person.personal.first_name +" "+ person.personal.last_name} address={person.personal.city +" "+person.personal.state} key={idx} 
                        birth={person.personal.birthday} profile={person.personal.profile_img} phone={person.personal.phone} id={person.personal.personal_info_id} department={person.department} role={person.role}/> ) 
                : 
                <h1>There is no user to check</h1> }
                </div>
            </div>
            </>
        )
    }