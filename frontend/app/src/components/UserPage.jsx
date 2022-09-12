import React, { useState } from 'react'

export default function UserPage(Props){
    const [sidebar, setSideBar] = useState('block') // block or none
    const [overlay, setOverlay] = useState('block')

    // Close the sidebar with the close button
    const open = () => {
    if(sidebar == 'block'){
            setSideBar('none')
            setOverlay('none')
        } else{
            setSideBar('block')
            setOverlay('block')
        }
    }

    const close = () => {
        setSideBar('none')
        setOverlay('none')
    }

    return (
        <>
            {/* Sidebar/menu */}
            <nav className="w3-sidebar w3-collapse w3-white w3-animate-left mt-3" style={{zIndex:"3", width:"300px", display:sidebar}} id="mySidebar"><br/>
                <div className="w3-container w3-row">
                    <div className="w3-col s4">
                    <img src={localStorage.getItem('profile_img')? localStorage.getItem('profile_img'):"https://www.w3schools.com/w3images/avatar2.png"} className="w3-circle w3-margin-right" style={{width:"80px", height:"80px"}}/>
                    </div>
                    <div className="w3-col s8 w3-bar">
                    <span>Welcome, <strong>{localStorage.getItem('username')}</strong></span><br/>
                    <a href="#" className="w3-bar-item w3-button ms-3"><i className="fa fa-envelope"></i></a>
                    <a href="#" className="w3-bar-item w3-button ms-3"><i className="fa fa-cog"></i></a>
                    <br/><br/>
                    <span>{localStorage.getItem('user_type')} view</span>
                    </div>
                </div>
                <hr/>
                <div className="w3-container">
                    <h5>Dashboard</h5>
                </div>
                <div className="w3-bar-block">
                    <a href="#" className="w3-bar-item w3-button w3-padding-16 w3-hide-large w3-dark-grey w3-hover-black" onClick={open} title="close menu"><i className="fa fa-remove fa-fw"></i>  Close Menu</a>
                    <a href="#" className="w3-bar-item w3-button w3-padding w3-blue"><i className="fa fa-users fa-fw"></i>  Overview</a>
                    <a href="#" className="w3-bar-item w3-button w3-padding"><i className="fa fa-eye fa-fw"></i>  Views</a>
                    <a href="#" className="w3-bar-item w3-button w3-padding"><i className="fa fa-users fa-fw"></i>  Traffic</a>
                    <a href="#" className="w3-bar-item w3-button w3-padding"><i className="fa fa-bullseye fa-fw"></i>  Geo</a>
                    <a href="#" className="w3-bar-item w3-button w3-padding"><i className="fa fa-diamond fa-fw"></i>  Orders</a>
                    <a href="#" className="w3-bar-item w3-button w3-padding"><i className="fa fa-bell fa-fw"></i>  News</a>
                    <a href="#" className="w3-bar-item w3-button w3-padding"><i className="fa fa-bank fa-fw"></i>  General</a>
                    <a href="#" className="w3-bar-item w3-button w3-padding"><i className="fa fa-history fa-fw"></i>  History</a>
                    <a href="#" className="w3-bar-item w3-button w3-padding"><i className="fa fa-cog fa-fw"></i>  Settings</a><br/><br/>
                </div>
            </nav>
            {/* <!-- Overlay effect when opening sidebar on small screens --> */}
            <div className="w3-overlay w3-hide-large w3-animate-opacity" onClick={close} style={{cursor:"pointer", display:overlay}} title="close side menu" id="myOverlay"></div>
        </>
    )
}