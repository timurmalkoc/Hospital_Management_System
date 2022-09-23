import React from 'react'
import { useState, useEffect } from 'react';
import LineChartDraw from './LineChartDraw';
import Weather from './Weather';

export default function Dashboard(props) {
    const [data, setData] = useState([])
        // Load user statistics ==============
        useEffect(() => {
        let myHeaders = new Headers()

        myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))
        
        fetch(`${props.base_url}/patientstatistics` ,{
            headers: myHeaders
        })
        .then(res => res.json())
        .then(user => setData(user)    
        )
        .catch(() =>
            props.flashMessage('Encountered an issue, Please try again !', 'danger'))
        }, [])
        
        console.log(data)
    return (
    <>
            
        <div className="w3-main" style={{marginLeft:"300px", marginTop:"43px"}}>

            {/* <!-- Header --> */}
            <header className="w3-container" style={{paddingTop:"22px"}}>
                <h5><b><i className="fa fa-dashboard"></i> My Dashboard</b></h5>
            </header>

            <div className="d-flex flex-wrap justify-content-between w3-row-padding w3-margin-bottom">
                <div className="col-3 m-3">
                <div className="w3-container w3-red w3-padding-16">
                    <div className="w3-left"><i className="fa-regular fa-calendar-check w3-xxxlarge"></i></div>
                    <div className="w3-right">
                    <h1>{data? data.total_appointment : null}</h1>
                    </div>
                    <div className="w3-clear"></div>
                    <h5>Total Number of Appointments</h5>
                </div>
                </div>
                <Weather base_url={props.base_url} expressBackend={props.expressBackend} loggedIn={props.loggedIn} flashMessage={props.flashMessage}/>
                {data.visit_statistics? <LineChartDraw visit={data} /> :null}
            </div>


        </div>
            
        </>
    )
}