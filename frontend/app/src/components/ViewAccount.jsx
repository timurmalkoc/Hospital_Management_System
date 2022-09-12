import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ViewAccount(props){
    let navigate = useNavigate()
    const [data, setData] = useState([])
        if(!props.loggedIn)
            navigate('/')
        useEffect(() => {

            let myHeaders = new Headers()

            myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))

            
            fetch(`${props.base_url}/personalinfo` ,{
                headers: myHeaders
            })
            .then(res => res.json())
            .then(user => setData(user))
            .catch(err =>
                props.flashMessage('Encountered an issue, Please try again !', 'danger'))
        }, [])

    return(
        <>
            <div className="d-flex justify-content-start col-lg-11 me-4" style={{marginLeft:"310px", marginTop:"60px"}}>

                <div className="card mb-4 me-4 col-lg-8">
                    <div className="card-body">
                        {/* start of row */}
                        <div className="row">
                            <div className="col-sm-3">
                                <p className="mb-0">User Name</p>
                            </div>
                            <div className="col-sm-9">
                                <p className="text-muted mb-0">{data? data.user_name:null}</p>
                            </div>
                        </div>
                        <hr/>
                        {/* end of row */}
                        {/* start of row */}
                        <div className="row">
                            <div className="col-sm-3">
                                <p className="mb-0">Full Name</p>
                            </div>
                            <div className="col-sm-9">
                                <p className="text-muted mb-0">{data? data.first_name:null} {data? data.middle_name:null} {data? data.last_name:null}</p>
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
                                <p className="text-muted mb-0">{data? data.gender:null}</p>
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
                                <p className="text-muted mb-0">{data? data.email:null}</p>
                            </div>
                        </div>
                        <hr/>
                        {/* end of row */}
                        {/* start of row */}
                        <div className="row">
                            <div className="col-sm-3">
                                <p className="mb-0">Date of Birth</p>
                            </div>
                            <div className="col-sm-9">
                                <p className="text-muted mb-0">{data? (new Date(data.birthday)).toDateString():null}</p>
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
                                <p className="text-muted mb-0">{data? data.phone:null}</p>
                            </div>
                        </div>
                        <hr/>
                        {/* end of row */}
                        {/* start of row */}
                        <div className="row">
                            <div className="col-sm-3">
                                <p className="mb-0">Address</p>
                            </div>
                            <div className="col-sm-9">
                                <p className="text-muted mb-0">{data? data.street:null}, {data? data.city:null}, {data? data.state:null} {data? data.zip_code:null}</p>
                            </div>
                        </div>
                        <hr/>
                        {/* end of row */}
                    </div>
                </div>
                <div className="col-lg-2">
                    <div className="card mb-2">
                        <div className="card-body text-center">
                            <img src={localStorage.getItem('profile_img')? localStorage.getItem('profile_img'):"https://www.w3schools.com/w3images/avatar2.png"} alt="avatar" className="rounded-circle img-fluid" style={{width: "150px"}}/>   
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center mb-2">
                <button type="button" className="btn btn-outline-success ms-1">Edit</button>
                <button type="button" className="btn btn-outline-danger ms-1">Suspend</button>
            </div>
            
        
        </>
    )
}