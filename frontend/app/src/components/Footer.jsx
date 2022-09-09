import React from "react";

    export default function Footer(props){


        return(
            <>
                <footer className="w3-padding-32 w3-theme-action w3-center w3-margin-top">
                <h5>Find Us On</h5>
                <div className="w3-xlarge w3-padding-16">
                    <i className="fa fa-facebook-official w3-hover-opacity"/>
                    <i className="fa fa-instagram w3-hover-opacity"></i>
                    <i className="fa fa-snapchat w3-hover-opacity"></i>
                    <i className="fa fa-pinterest-p w3-hover-opacity"></i>
                    <i className="fa fa-twitter w3-hover-opacity"></i>
                    <i className="fa fa-linkedin w3-hover-opacity"></i>
                </div>
                <p>Copyright © 2022 HMS</p>
                </footer>
            </>
        )
    }