import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

    export default function UpdateProfile(props) {
        let navigate = useNavigate()
        const { personId } = useParams()
        const [ img_url, setImg] = useState('')
        const [ user_name, setUserName ] = useState('')
        const [ email, setEmail ] = useState('')
        const [ first_name, setFirstName ] = useState('')
        const [ middle_name, setMiddleName ] = useState('')
        const [ last_name, setLastName ] = useState('')
        const [ phone, setPhone ] = useState('')
        const [ street, setStreet ] = useState('')
        const [ city, setCity ] = useState('')
        const [ state, setState ] = useState('')
        const [ zip_code, setZip ] = useState('')
        const [ gender, setGender ] = useState('')
        const [ birthday, setBirth ] = useState('')
        const [ department, setDepartment ] = useState('')
        const [ role, setRole ] = useState('')
        const [ start_date, setStartDate ] = useState('')
    // fetching data ========================
        
            if(!props.loggedIn)
                navigate('/')

            useEffect(() => {
    
                let myHeaders = new Headers()
    
                myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))
    
                
                fetch(`${props.base_url}/stafflist/${personId}` ,{
                    headers: myHeaders
                })
                .then(res => res.json())
                .then(user => {
                    setImg(user.personal.profile_img)
                    setUserName(user.personal.user_name)
                    setEmail(user.personal.email)
                    setFirstName(user.personal.user_name)
                    setMiddleName(user.personal.middle_name)
                    setLastName(user.personal.last_name)
                    setStreet(user.personal.street)
                    setCity(user.personal.city)
                    setState(user.personal.state)
                    setZip(user.personal.zip_code)
                    setBirth(user.personal.birthday)
                    setPhone(user.personal.phone)
                    setGender(user.personal.gender)
                    setDepartment(user.department)
                    setRole(user.role)
                    setStartDate(user.started_date)
                })
                .catch(err =>
                    props.flashMessage('Encountered an issue, Please try again !', 'danger'))
            }, [personId])

        // Update part ==========================
        const handleSubmit = async e => {
            e.preventDefault();
 
            let myHeaders = new Headers();
            myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))
            myHeaders.append('Content-Type', 'application/json')

            let formData = JSON.stringify({
                email:      e.target.email.value,
                username:   e.target.username.value, 
                first_name: e.target.firstname.value, 
                middle_name:e.target.middlename.value,
                last_name:  e.target.lastname.value,
                phone:      e.target.phone.value,
                street:     e.target.street.value,
                city:       e.target.city.value,
                state:      e.target.state.value,
                zip_code:   e.target.zipcode.value,
                gender:     e.target.gender.value,
                birthday:   e.target.birthday.value,
                profile_img:e.target.imgurl.value,
                department: e.target.department.value,
                role:       e.target.role.value,
                started_date:e.target.starteddate.value
            })
            await fetch(`${props.base_url}/updatestaff/${personId}`, {
                method:'PUT',
                headers: myHeaders,
                body:formData
            })

            .then(res => res.json())
            .then(data => {
                if(data.error)
                    props.flashMessage(`${data.error}`, 'danger')
                else{
                    props.flashMessage('User info has been updated successfully', 'success')
                    navigate(`/viewstaffaccount/${personId}`)
                }

            })

        }

        return (
            <>
            <div style={{marginLeft:"310px", marginTop:"60px"}}>    
                
                <form onSubmit={handleSubmit}>
                    {/* Flex */}
                    <div className='d-flex flex-wrap justify-content-around align-items-end' >
                       
                        <div>
                             {/* Photo */}
                            <div className="w3-margin col-lg-8">
                                <div className="card mb-2">
                                    <div className="card-body text-center">
                                        <img src={img_url? img_url:"https://www.w3schools.com/w3images/avatar2.png"} alt="avatar" className="rounded-circle img-fluid" style={{width: "150px"}}/>   
                                    </div>
                                </div>
                            </div>
                            <div className="w3-margin">
                                <label><b>Image Url</b> </label><br/>
                                <input className="w3-text-black" style={{width: "300px"}} value={img_url? img_url:null} onChange={e => setImg(e.target.value)} type="text" placeholder="Image URL" name="imgurl"/>
                            </div>
                            <div className="w3-margin">
                                <label><b>User Name</b> </label><br/>
                                <input className="w3-text-black" style={{width: "300px"}} value={user_name? user_name:null} onChange={e => setUserName(e.target.value)} type="text" placeholder="User Name" name="username"/>
                            </div>
                            <div className="w3-margin">
                                <label><b>First Name</b> </label><br/>
                                <input className="w3-text-black" style={{width: "300px"}} value={first_name? first_name:null} onChange={e => setFirstName(e.target.value)} type="text" placeholder="First Name" name="firstname"/>
                            </div>
                            <div className="w3-margin">
                                <label><b>Middle Name</b> </label><br/>
                                <input className="w3-text-black" style={{width: "300px"}} value={middle_name? middle_name:null} onChange={e => setMiddleName(e.target.value)} type="text" placeholder="Middle Name" name="middlename"/>
                            </div>
                            <div className="w3-margin">
                                <label><b>Last Name</b> </label><br/>
                                <input className="w3-text-black" style={{width: "300px"}} value={last_name? last_name:null} onChange={e => setLastName(e.target.value)} type="text" placeholder="Last Name" name="lastname"/>
                            </div>
                        </div>

                        <div>
                            <div className="w3-margin">
                                <label><b>Email</b> </label><br/>
                                <input className="w3-text-black" style={{width: "300px"}} value={email? email:null} onChange={e => setEmail(e.target.value)} type="text" placeholder="Email" name="email"/>
                            </div>
                            <div className="w3-margin">
                                <label><b>Phone Number</b> </label><br/>
                                <input className="w3-text-black" type="text" value={phone? phone:null} onChange={e => setPhone(e.target.value)} placeholder="(000) 000-0000" name="phone"/>
                            </div>
                            <div className="w3-margin">
                                <label><b>Gender</b> </label><br/>
                                <input className="w3-text-black" type="text" value={gender? gender:null} onChange={e => setGender(e.target.value)} placeholder="Gender" name="gender"/>
                            </div>
                            <div className="w3-margin">
                                <label><b>Birthday</b> </label><br/>
                                <input className="w3-text-black" style={{width: "300px"}} type="text" value={birthday? (new Date(birthday)).toDateString():null} onChange={e => setBirth(e.target.value)} placeholder="MM/DD/YYYY" name="birthday"/>
                            </div>
                        </div>

                        <div>
                            <div className="w3-margin">
                                <label><b>Street Address</b> </label><br/>
                                <input className="w3-text-black" style={{width: "300px"}} value={street? street:null} onChange={e => setStreet(e.target.value)} type="text" placeholder="Street Address" name="street"/>
                            </div>
                            <div className="w3-margin">
                                <label><b>City</b> </label><br/>
                                <input className="w3-text-black" style={{width: "300px"}} value={city? city:null} onChange={e => setCity(e.target.value)} type="text" placeholder="City" name="city"/>
                            </div>
                            <div className="w3-margin">
                                <label><b>State</b> </label><br/>
                                <input className="w3-text-black" style={{width: "300px"}} value={state? state:null} onChange={e => setState(e.target.value)} type="text" placeholder="State" name="state"/>
                            </div>
                            <div className="w3-margin">
                                <label><b>Zip Code</b> </label><br/>
                                <input className="w3-text-black" type="text" value={zip_code? zip_code:null} onChange={e => setZip(e.target.value)} placeholder="Zip Code" name="zipcode"/>
                            </div>
                        </div>
                    </div>
                        {/* staff table ============ */}
                        <div className='d-flex flex-wrap justify-content-around'>
                            <div className="w3-margin">
                                <label><b>Department</b> </label><br/>
                                <select className="btn btn-secondary dropdown-toggle" value={department? department:"Medical Department"} onChange={e => setDepartment(e.target.value)} type="text" style={{width: "300px"}} placeholder="Profile image" name="department">
                                <option value="Medical Department">Medical Department</option>
                                <option value="Nursing Department">Nursing Department</option>
                                <option value="Pharmacy Department">Pharmacy Department</option>
                                <option value="Radiology Department">Radiology Department</option>
                                <option value="Purchasing Department">Purchasing Department</option>
                                <option value="Medical Record Department">Medical Record Department</option>
                                <option value="Dietary Department">Dietary Department</option>
                                <option value="other">other</option>
                                </select>
                            </div>
                            <div className="w3-margin">
                                <label><b>Role</b> </label><br/>
                                <select className="btn btn-secondary dropdown-toggle" value={role? role:"Lab"} onChange={e => setRole(e.target.value)} type="text" style={{width: "300px"}} placeholder="Profile image" name="role">
                                <option value="Lab">Lab</option>
                                <option value="Doctor">Doctor</option>
                                <option value="Finance">Finance</option>
                                <option value="Nurse">Nurse</option>
                                <option value="Admin">Admin</option>
                                <option value="Pharmissist">Pharmissist</option>
                                <option value="Receptionist">Receptionist</option>
                                <option value="other">other</option>
                                </select>
                            </div>
                            <div className="w3-margin">
                                <label><b>Start Date</b> </label><br/>
                                <input className="w3-text-black" value={start_date? (new Date(start_date)).toDateString():null} onChange={e => setStartDate(e.target.value)} type="text" placeholder="MM/DD/YYYY" style={{width: "300px"}} name="starteddate"/>
                            </div>

                        </div>
                    <button className="w3-button w3-hover-blue w3-card d-grid gap-2 col-3 mx-auto" type="submit"><b>Update</b></button>                        
                </form>
            </div>
            </>
        )

    }