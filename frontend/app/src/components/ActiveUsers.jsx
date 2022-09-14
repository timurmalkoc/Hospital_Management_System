import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProfileCard from './ProfileCard'

    export default function ActiveUsers(props) {
        let navigate = useNavigate()
        const [data, setData] = useState([])
        useEffect(() => {
            if(localStorage.getItem('user_type') != 'admin')
                navigate('/viewaccount')

            let myHeaders = new Headers()

            myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))

            fetch(`${props.base_url}/active` ,{
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
                data.map((person, idx) => <ProfileCard flashMessage={props.flashMessage} base_url={props.base_url} fullname={person.first_name +" "+ person.last_name} address={person.city +" "+person.state} key={idx} 
                        birth={person.birthday} profile={person.profile_img} phone={person.phone} id={person.personal_info_id}/> ) 
                : 
                <h1>There is no user to check</h1> }
                </div>
            </div>
            </>
        )
    }