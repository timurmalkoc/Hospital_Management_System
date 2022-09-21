import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

    export default function Signup(props) {

        let navigate = useNavigate()

        useEffect(() => {
            if(props.loggedIn)
                navigate('/viewaccount')
        }, [props.loggedIn])

        const handleSubmit = async e =>{
            e.preventDefault();

            // ========================================= Password match check ======================================

            let password = e.target.password.value;
            let confirmpassword = e.target.confirmpassword.value;
            if (password !== confirmpassword)
                props.flashMessage('Your passwords do not match', 'danger')
            else{

                let myHeaders = new Headers();
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
                    profile_img:e.target.profileimg.value
                })

                await fetch(`${props.base_url}/user/signup`, {
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
                        navigate('/')
                    }

                })

            }

        }

        return (
            <>
            <div>
                <div className="l6 mt-5">
                    <div className="w3-container w3-card">
                    <h2><i className="fa fa-bed w3-margin-right"></i>Patient Signup</h2>
                    </div>
                    </div><br/>
                    
                    <form onSubmit={handleSubmit}>

                        {/* Flex */}
                        <div className='d-flex flex-wrap justify-content-around'>
                            <div>
                                <div className="w3-margin">
                                    <label><b>User Name</b> </label><br/>
                                    <input className="w3-text-black" style={{width: "400px"}} type="text" placeholder="User Name" name="username"/>
                                </div>
                                <div className="w3-margin">
                                    <label><b>First Name</b> </label><br/>
                                    <input className="w3-text-black" style={{width: "400px"}} type="text" placeholder="First Name" name="firstname"/>
                                </div>
                                <div className="w3-margin">
                                    <label><b>Middle Name</b> </label><br/>
                                    <input className="w3-text-black" style={{width: "400px"}} type="text" placeholder="Middle Name" name="middlename"/>
                                </div>
                                <div className="w3-margin">
                                    <label><b>Last Name</b> </label><br/>
                                    <input className="w3-text-black" style={{width: "400px"}} type="text" placeholder="Last Name" name="lastname"/>
                                </div>
                                <div  className='d-flex justify-content-around'>
                                    <div >
                                    <label><b> Password</b></label><br/>
                                    <input className="w3-text-black" style={{width: "180px"}} type="password" name="password" placeholder="Password"/>
                                    </div>
                                    <div>
                                        <label><b> Confirm Password</b></label><br/>
                                        <input className="w3-text-black" style={{width: "180px"}} type="password" name="confirmpassword" placeholder="Confirm Password"/>
                                    </div>
                                </div>
                            </div>


                            <div>
                                
                                <div className="w3-margin">
                                    <label><b>Email</b> </label><br/>
                                    <input className="w3-text-black" style={{width: "400px"}} type="text" placeholder="Email" name="email"/>
                                </div>
                                <div className="w3-margin">
                                    <label><b>Street Address</b> </label><br/>
                                    <input className="w3-text-black" style={{width: "400px"}} type="text" placeholder="Street Address" name="street"/>
                                </div>
                                <div className="w3-margin">
                                    <label><b>City</b> </label><br/>
                                    <input className="w3-text-black" style={{width: "400px"}} type="text" placeholder="City" name="city"/>
                                </div>
                                <div className="w3-margin">
                                    <label><b>State</b> </label><br/>
                                    <input className="w3-text-black" style={{width: "400px"}} type="text" placeholder="State" name="state"/>
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
                                    <input className="w3-text-black" type="text" style={{width: "400px"}} placeholder="Profile image" name="profileimg"/>
                                </div>
                            </div>
                        </div>
                        <button className="w3-button w3-hover-blue w3-card d-grid gap-2 col-3 mx-auto" type="submit"><b>Signup</b></button>                        
                    </form>
                    </div>
            </>
        )

    }