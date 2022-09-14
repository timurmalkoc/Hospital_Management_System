import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

    export default function Login(props) {
        let navigate = useNavigate()
        useEffect(() => {
            if(props.loggedIn)
                navigate('/viewaccount')
        }, [props.loggedIn])
        

        // =========================================== User Login =========================================
        const login = async e =>{
            e.preventDefault()

            let username = e.target.username.value
            let password = e.target.password.value

            let myHeaders = new Headers()
            myHeaders.append('Authorization', 'Basic ' + btoa(`${username}:${password}`))

            let response = await fetch(`${props.base_url}/auth/token`, {
                method: 'POST',
                headers: myHeaders
            })
            

            if (response.ok){
                let data = await response.json()
                localStorage.setItem('token', data.token)
                localStorage.setItem('expire', data.token_expiration)
                localStorage.setItem('user_type', data.user_type.toLowerCase())
                localStorage.setItem('username', data.username)
                localStorage.setItem('profile_img', data.profile_img)
                props.login()
                if(data.user_type == 'patient')
                navigate('/dashboard')
                else if(data.user_type == 'admin')
                navigate('/admindashboard')
            }else{
                console.log(response.status)
                if(response.status == 400){
                let data = await response.json()
                props.flashMessage(data.error, 'danger');}
                else
                    props.flashMessage('Incorrect credential !', 'danger');
            }
        }
        
       
        return (
            <>
                <header className="w3-display-container w3-content w3-card " style={{maxWidth:"1500px"}}>
                <img className="w3-image w3-opacity" src="https://www.clarkconstruction.com/sites/default/files/project_feat_images/Malcolm%20X%20Exterior_005_jpg.jpg" alt="HMS" style={{minWidth:"1000px"}} width={"1500"} height={"800"} />
                <div className="w3-display-middle w3-padding w3-col l6">
                    <div className="w3-container w3-card">
                    <h2><i className="fa fa-user-circle w3-margin-right"></i><b>Login</b></h2>
                    </div>
                    <div className="w3-container w3-card">
                    <form onSubmit={login}>
                        <div className="w3-margin">
                            <label><b>User Name</b> </label>
                            <input className="w3-input w3-card w3-text-black" type="text" placeholder="User Name" name="username"/>
                        </div>
                        <div className="w3-margin">
                            <label><b>Password</b></label>
                            <input className="w3-input w3-card w3-text-black" type="password" placeholder="Password" name="password"/>
                        </div>
                        <div className="w3-margin">
                            <a href="/signup" className="link-dark"><b>Click to Create Patient Account</b></a>
                        </div>
                        <div className="w3-margin">
                        <button className="w3-button w3-hover-blue w3-card" type="submit"><b>Login</b></button>
                        </div>
                    </form>
                    </div>
                </div>
                </header>

                <div className="w3-content" maxWidth="1532px">

                    <div className="w3-container" id="contact">
                        <h2>Contact</h2>
                        <p>If you have any questions, do not hesitate to ask them.</p>
                        <i className="mb-2 fa fa-map-marker w3-text-red" width="30px"></i> Chicago, US<br/>
                        <i className="mb-2 fa fa-phone w3-text-red" width="30px"></i> Phone: +01 777 444 1515<br/>
                        <i className="mb-3 fa fa-envelope w3-text-red" width="30px"> </i> Email: mail@mail.com<br/>
                        <form action="/action_page.php" target="_blank">
                            <p><input className="w3-input w3-padding-16 w3-border" type="text" placeholder="Name" required="" name="Name"/></p>
                            <p><input className="w3-input w3-padding-16 w3-border" type="text" placeholder="Email" required="" name="Email"/></p>
                            <p><input className="w3-input w3-padding-16 w3-border" type="text" placeholder="Message" required="" name="Message"/></p>
                            <p><button className="w3-button w3-black w3-padding-large" type="submit">SEND MESSAGE</button></p>
                        </form>
                    </div>

                </div>

            </>
        )

    }