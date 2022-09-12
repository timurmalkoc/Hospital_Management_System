import React, { useState } from 'react'

    export default function Navbar(props) {
        const [show, setShow] = useState(false)
        const [cl, setCl] = useState('w3-bar-block w3-theme-d2 w3-hide w3-hide-large w3-hide-medium w3-large')

        const toggle=() =>{
            if(!show){
                setShow(true)
                setCl('w3-bar-block w3-theme-d2 w3-hide w3-hide-large w3-hide-medium w3-large w3-show')
            }else
            {
                setShow(false)
                setCl('w3-bar-block w3-theme-d2 w3-hide w3-hide-large w3-hide-medium w3-large')
            }
        }
        

        return (
            <>
                {/* <!-- Navbar --> */}
                <div className="w3-top" style={{zIndex:'10'}}>
                    <div className="w3-bar w3-theme-d2 w3-left-align w3-large">
                    <a className="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-theme-d2" onClick={toggle}><i className="fa fa-bars"></i></a>
                    <a href={(localStorage.getItem('token')) ? "/viewaccount":"/"} className="w3-bar-item w3-button w3-padding-large w3-theme-d4"><i className="fa fa-building-o w3-margin-right"></i>HMS</a>
                    {props.loggedIn ?
                    <>
                        <div className="w3-dropdown-hover w3-hide-small w3-right me-2" >
                            <a href="/viewaccount" className="w3-button w3-padding-large" title="My Account">
                                <img src={localStorage.getItem('profile_img')? localStorage.getItem('profile_img'):"https://www.w3schools.com/w3images/avatar2.png"} className="w3-circle" height={'30px'} width={"30px"} alt="Avatar"/>
                            </a>
                            <div style={{marginLeft:"-20px"}} className="w3-dropdown-content w3-card-4 w3-bar-block"  width={"300px"}>
                                <a href="/viewaccount" className="w3-bar-item w3-button">Profile</a>
                                <a href="#" className="w3-bar-item w3-button" onClick={props.logout}>Logout</a>
                            </div>
                        </div>
                    </>
                    :
                    <></>}
                    </div>
                </div>

                {/* <!-- Navbar on small screens --> */}
                {props.loggedIn ?
                <>
                <div id="navDemo" className={cl}>
                <a href="/viewaccount" className="w3-bar-item w3-button w3-padding-large">Profile</a>
                <a href="#" className="w3-bar-item w3-button w3-padding-large" onClick={props.logout}>Logout</a>
                </div>
                </>:<></>}
            </>
        )
    }