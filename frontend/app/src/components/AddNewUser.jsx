import { getRoles } from '@testing-library/react';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

    export default function Signup(props) {

        let navigate = useNavigate()

        const handleSubmit = async e =>{
            e.preventDefault();

            // ========================================= Password match check ======================================

            let password = e.target.password.value;
            let confirmpassword = e.target.confirmpassword.value;
            if (password !== confirmpassword)
                props.flashMessage('Your passwords do not match', 'danger')
            else{

                let myHeaders = new Headers()
                myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))
                myHeaders.append('Content-Type', 'application/json')

                let formData = JSON.stringify({
                    email:      e.target.email.value,
                    username:   e.target.username.value, 
                    password:   e.target.password.value, 
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
                    profile_img:e.target.profileimg.value,
                    role:       e.target.role.value,
                    department: e.target.department.value,
                    started_date:e.target.starteddate.value,
                    about:      e.target.about.value,
                    experience: e.target.experience.value,
                    specialties:e.target.specialties.value
                })

                await fetch(`${props.base_url}/newstaff`, {
                    method:'POST',
                    headers: myHeaders,
                    body:formData
                })

                .then(res => res.json())
                .then(data => {
                    if(data.error)
                        props.flashMessage(`${data.error}`, 'danger')
                    else{
                        props.flashMessage('You have successfully registered, Soon you will get a varificaition mail', 'success')
                        navigate('/activeusers')
                    }

                })

            }

        }

        return (
            <>
            <div style={{marginLeft:"310px", marginTop:"60px"}}>                  
                    <form onSubmit={handleSubmit}>

                        {/* Personal info ============= */}
                        <div className='d-flex flex-wrap justify-content-around'>
                            <div>
                                <div className="w3-margin">
                                    <label><b>User Name</b> </label><br/>
                                    <input className="w3-text-black" style={{width: "300px"}} type="text" placeholder="User Name" name="username"/>
                                </div>
                                <div className="w3-margin">
                                    <label><b>First Name</b> </label><br/>
                                    <input className="w3-text-black" style={{width: "300px"}} type="text" placeholder="First Name" name="firstname"/>
                                </div>
                                <div className="w3-margin">
                                    <label><b>Middle Name</b> </label><br/>
                                    <input className="w3-text-black" style={{width: "300px"}} type="text" placeholder="Middle Name" name="middlename"/>
                                </div>
                                <div className="w3-margin">
                                    <label><b>Last Name</b> </label><br/>
                                    <input className="w3-text-black" style={{width: "300px"}} type="text" placeholder="Last Name" name="lastname"/>
                                </div>
                                <div  className='d-flex justify-content-around'>
                                    <div >
                                    <label><b> Password</b></label><br/>
                                    <input className="w3-text-black" style={{width: "140px"}} type="password" name="password" placeholder="Password"/>
                                    </div>
                                    <div>
                                        <label><b> Confirm Password</b></label><br/>
                                        <input className="w3-text-black" style={{width: "150px"}} type="password" name="confirmpassword" placeholder="Confirm Password"/>
                                    </div>
                                </div>
                            </div>


                            <div>
                                
                                <div className="w3-margin">
                                    <label><b>Email</b> </label><br/>
                                    <input className="w3-text-black" style={{width: "300px"}} type="text" placeholder="Email" name="email"/>
                                </div>
                                <div className="w3-margin">
                                    <label><b>Street Address</b> </label><br/>
                                    <input className="w3-text-black" style={{width: "300px"}} type="text" placeholder="Street Address" name="street"/>
                                </div>
                                <div className="w3-margin">
                                    <label><b>City</b> </label><br/>
                                    <input className="w3-text-black" style={{width: "300px"}} type="text" placeholder="City" name="city"/>
                                </div>
                                <div className="w3-margin">
                                    <label><b>State</b> </label><br/>
                                    <input className="w3-text-black" style={{width: "300px"}} type="text" placeholder="State" name="state"/>
                                </div>
                                <div className="w3-margin">
                                    <label><b>Zip Code</b> </label><br/>
                                    <input className="w3-text-black" type="text" placeholder="Zip Code" name="zipcode"/>
                                </div>
                            </div>


                            <div>
                                <div className="w3-margin">
                                    <label><b>Phone Number</b> </label><br/>
                                    <input className="w3-text-black" type="text" placeholder="(000) 000-0000" name="phone"/>
                                </div>
                                <div className="w3-margin">
                                    <label><b>Gender</b> </label><br/>
                                    <input className="w3-text-black" type="text" placeholder="Gender" name="gender"/>
                                </div>
                                <div className="w3-margin">
                                    <label><b>Birthday</b> </label><br/>
                                    <input className="w3-text-black" type="text" placeholder="MM/DD/YYYY" name="birthday"/>
                                </div>
                                <div className="w3-margin">
                                    <label><b>Image</b> </label><br/>
                                    <input className="w3-text-black" type="text" style={{width: "300px"}} placeholder="Profile image" name="profileimg"/>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        {/* staff table ============ */}
                        <div className='d-flex flex-wrap justify-content-around'>
                            <div className="w3-margin">
                                <label><b>Department</b> </label><br/>
                                <select className="btn btn-secondary dropdown-toggle" type="text" style={{width: "300px"}} placeholder="Profile image" name="department">
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
                                <select className="btn btn-secondary dropdown-toggle" type="text" style={{width: "300px"}} placeholder="Profile image" name="role">
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
                                <input className="w3-text-black" type="date" style={{width: "300px"}} name="starteddate"></input>
                            </div>

                        </div>
                        <h2 className='ms-4 mt-4'>Optinal</h2>
                        <hr/>
                        <div className='d-flex flex-wrap justify-content-around'>                            
                            <div className="w3-margin">
                                <label><b>Experience</b> </label><br/>
                                <input className="w3-text-black" type="text" placeholder="" name="experience"/>
                            </div>
                            <div className="w3-margin">
                                <label><b>Specialties</b> </label><br/>
                                <input className="w3-text-black" type="text" placeholder="Specialties" style={{width: "300px"}} name="specialties"/>
                            </div>
                            <div className="w3-margin">
                                <div class="form-floating">
                                    <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{height:"100px", width: "300px"}} name="about"></textarea>
                                    <label for="floatingTextarea2">About</label>
                                </div>
                            </div>             
                        </div>
                        <button className="w3-button w3-hover-blue w3-card d-grid gap-2 col-3 mx-auto mt-3 mb-4" type="submit"><b>Register</b></button>                        
                    </form>
                    </div>
            </>
        )

    }