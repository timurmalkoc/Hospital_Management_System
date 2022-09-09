import React from 'react'

    export default function Navbar(props) {

        // Used to toggle the menu on smaller screens when clicking on the menu button
        function openNav() {
            var x = document.getElementById("navDemo");
            if (x.className.indexOf("w3-show") == -1) {
                x.className += " w3-show";
            } else { 
                x.className = x.className.replace(" w3-show", "");
            }
        }

        return (
            <>
                {/* <!-- Navbar --> */}
                <div className="w3-top">
                <div className="w3-bar w3-theme-d2 w3-left-align w3-large">
                <a className="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-theme-d2" href="javascript:void(0);" onClick={openNav}><i className="fa fa-bars"></i></a>
                <a href="#" className="w3-bar-item w3-button w3-padding-large w3-theme-d4"><i className="fa fa-home w3-margin-right"></i>HMS</a>
                <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="News"><i className="fa fa-globe"></i></a>
                <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Account Settings"><i className="fa fa-user"></i></a>
                <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Messages"><i className="fa fa-envelope"></i></a>
                <div className="w3-dropdown-hover w3-hide-small">
                    <button className="w3-button w3-padding-large" title="Notifications"><i className="fa fa-bell"></i><span className="w3-badge w3-right w3-small w3-green">12</span></button>     
                    <div className="w3-dropdown-content w3-card-4 w3-bar-block" width={"300px"}>
                    <a href="#" className="w3-bar-item w3-button">One new friend request</a>
                    <a href="#" className="w3-bar-item w3-button">John Doe posted on your wall</a>
                    <a href="#" className="w3-bar-item w3-button">Jane likes your post</a>
                    </div>
                </div>
                <a href="#" className="w3-bar-item w3-button w3-hide-small w3-right w3-padding-large w3-hover-white" title="My Account">
                    <img src={"https://p.kindpng.com/picc/s/78-785904_block-chamber-of-commerce-avatar-white-avatar-icon.png"} className="w3-circle" height={'23px'} width={"23px"} alt="Avatar"/>
                </a>
                </div>
                </div>

                {/* <!-- Navbar on small screens --> */}
                <div id="navDemo" className="w3-bar-block w3-theme-d2 w3-hide w3-hide-large w3-hide-medium w3-large">
                <a href="#" className="w3-bar-item w3-button w3-padding-large">Link 1</a>
                <a href="#" className="w3-bar-item w3-button w3-padding-large">Link 2</a>
                <a href="#" className="w3-bar-item w3-button w3-padding-large">Link 3</a>
                <a href="#" className="w3-bar-item w3-button w3-padding-large">My Profile</a>
                </div>

            </>
        )
    }