import React, { useState } from 'react'

export default function SideBar(Props){
    const [sidebar, setSideBar] = useState('block') // block or none
    const [overlay, setOverlay] = useState('block')
    const linkList = []

    // Setting user links by roles
    const links = {
        patient: {
            Overview:{link:'/dashboard', class:"fa fa-eye fa-fw"},
            Settings:{link:'/viewaccount', class:"fa fa-cog fa-fw"}
        }  
    }
    
    // populating sidebar links
    let role = links[localStorage.getItem('user_type')]
    for(const item of Object.keys(role)){
        linkList.push(<a href={role[item]["link"]} className="w3-bar-item w3-button w3-padding"><i className={role[item]["class"]}></i> {item}</a>)
        }

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
            <nav className="w3-sidebar w3-collapse w3-white w3-animate-left" style={{zIndex:"3", width:"300px", display:sidebar}} id="mySidebar"><br/>
                <div className="w3-container w3-row">
                    <div className="w3-col s4">
                    <img src={localStorage.getItem('profile_img')? localStorage.getItem('profile_img'):"https://www.w3schools.com/w3images/avatar2.png"} className="w3-circle w3-margin-right" style={{width:"80px", height:"80px"}}/>
                    </div>
                    <div className="w3-col s8 w3-bar">
                    <span>Welcome, <strong>{localStorage.getItem('username')}</strong></span><br/>
                    <a href="#" className="w3-bar-item w3-button ms-3"><i className="fa fa-envelope"></i></a>   {/* ------- Messages */}
                    <a href="/viewaccount" className="w3-bar-item w3-button ms-3"><i className="fa fa-cog"></i></a>        {/* ------- View profile */}
                    <br/><br/>
                    <span>{localStorage.getItem('user_type')} view</span>
                    </div>
                </div>
                <hr/>
                <div className="w3-container">
                    <h5>Dashboard</h5>
                </div>
                <div className="w3-bar-block">
                    {linkList}
                </div>
            </nav>
            {/* <!-- Overlay effect when opening sidebar on small screens --> */}
            <div className="w3-overlay w3-hide-large w3-animate-opacity" onClick={close} style={{cursor:"pointer", display:overlay}} title="close side menu" id="myOverlay"></div>
        </>
    )
}