import React from 'react'

    export default function Login(props) {

        
        
        return (
            <>
                <header className="w3-display-container w3-content w3-card " style={{maxWidth:"1500px"}}>
                <img className="w3-image w3-opacity m8" src="https://www.clarkconstruction.com/sites/default/files/project_feat_images/Malcolm%20X%20Exterior_005_jpg.jpg" alt="The Hotel" style={{minWidth:"1000px"}} width={"1500"} height={"800"} />
                <div className="w3-display-middle w3-padding w3-col l6">
                    <div className="w3-container w3-card">
                    <h2><i className="fa fa-bed w3-margin-right"></i>Patient Login</h2>
                    </div>
                    <div className="w3-container w3-card">
                    <form action="/action_page.php" target="_blank">
                        <div className="w3-margin">
                            <label><i className="fa fa-dashboard"></i><b> User Name</b> </label>
                            <input className="w3-input w3-card w3-margin w3-text-black" type="text" placeholder="User Name" name="username"/>
                        </div>
                        <div className="w3-margin">
                            <label><i className="fa fa-calendar-o"></i><b> Password</b></label>
                            <input className="w3-input w3-card w3-margin w3-text-black" type="password" name="password" placeholder="Password"/>
                        </div>
                        <div className="w3-margin">
                        <button className="w3-button w3-hover-blue w3-card w3-margin" type="submit">Login</button>
                        </div>
                    </form>
                    </div>
                </div>
                </header>     
            </>
        )

    }