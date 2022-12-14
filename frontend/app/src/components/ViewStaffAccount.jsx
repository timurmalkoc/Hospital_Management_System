import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function ViewAccount(props){
    let navigate = useNavigate()
    const { personId } = useParams()
    const [data, setData] = useState([])
        if(!props.loggedIn)
            navigate('/')
        // Loading staff info ==============
        useEffect(() => {

            let myHeaders = new Headers()

            myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))

            
            fetch(`${props.base_url}/stafflist/${personId}` ,{
                headers: myHeaders
            })
            .then(res => res.json())
            .then(user => setData(user))
            .catch(() =>
                props.flashMessage('Encountered an issue, Please try again !', 'danger'))
        }, [props.loggedIn])

        // Freeze staff account ============

         // deactivate staff
        const deactivate = async() => {
            let myHeaders = new Headers();
            myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))
            myHeaders.append('Content-Type', 'application/json')
            await fetch(`${props.base_url}/deactivateuser/${personId}`, {
            method:'PUT',
            headers: myHeaders
        })

        .then(res => res.json())
        .then(data => {
            if(data.error)
                props.flashMessage(`${data.error}`, 'danger')
            else
                props.flashMessage('User account has been deactivated', 'info')
            navigate('/stafflist')
        })
        }

        // activate staff
        const activate = async() => {
            let myHeaders = new Headers();
            myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))
            myHeaders.append('Content-Type', 'application/json')
            await fetch(`${props.base_url}/activateuser/${personId}`, {
            method:'PUT',
            headers: myHeaders
        })

        .then(res => res.json())
        .then(data => {
            if(data.error)
                props.flashMessage(`${data.error}`, 'danger')
            else
                props.flashMessage('User account has been deactivated', 'info')
            navigate('/stafflist')
        })
        }
    return(
        <>
        {data.length!==0?
        <div>
            <div className="d-flex justify-content-start col-lg-11 me-4 w3-row-padding" style={{marginLeft:"310px", marginTop:"60px"}}>
                <div className="card mb-4 me-4 col-lg-8">
                    <div className="card-body">
                        {/* start of row */}
                        <div className="row">
                            <div className="col-sm-3">
                                <p className="mb-0">User Name</p>
                            </div>
                            <div className="col-sm-9">
                                <p className="text-muted mb-0">{data? data.personal.user_name:null}</p>
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
                                <p className="mb-0">Date of Birth</p>
                            </div>
                            <div className="col-sm-9">
                                <p className="text-muted mb-0">{data? (new Date(data.personal.birthday)).toDateString():null}</p>
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
                        {/* start of row */}
                        <div className="row">
                            <div className="col-sm-3">
                                <p className="mb-0">Address</p>
                            </div>
                            <div className="col-sm-9">
                                <p className="text-muted mb-0">{data? data.personal.street:null}, {data? data.personal.city:null}, {data? data.personal.state:null} {data? data.personal.zip_code:null}</p>
                            </div>
                        </div>
                        <hr/>
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
                            <img src={data? data.personal.profile_img : "https://www.w3schools.com/w3images/avatar2.png"} alt="avatar" className="rounded-circle img-fluid" style={{width: "150px"}}/>   
                        </div>
                    </div>
                </div>
            </div>
            {/* Edit Freeze button and model */}
            <div className="d-flex justify-content-center mb-2">
                <a onClick={() => navigate(`/updatestaff/${data.personal_info_id}`)} className="btn btn-outline-primary ms-1">Edit</a>
                { data.length!=0 ? 
                    data.personal.active ? 
                    <>{console.log(data.active)}
                    <button type="button"  className="btn btn-outline-danger ms-2" data-bs-toggle="modal" data-bs-target="#deleteModal">Freeze</button></>
                    :
                    <button onClick={activate} className="btn btn-outline-success ms-2" data-bs-dismiss="modal">Activate</button> 
                : null
                }
                {/* =================== Modal ============== */}
                <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="deleteModalLabel">Freeze Account</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">Are you sure to freeze ?</div>
                        <div className="modal-footer">
                          <button type="button" onClick={() => navigate('/stafflist')} className="btn btn-primary" data-bs-dismiss="modal">Cancel</button>
                          <a onClick={deactivate} className="btn btn-danger" data-bs-dismiss="modal">Freeze</a>
                        </div>
                    </div>
                  </div>
                </div>
            </div>           
        </div>
        :null}
        </>
    )
}