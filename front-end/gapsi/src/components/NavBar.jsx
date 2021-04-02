import React from 'react'

import './navBar.css';

import gapsy from '../assests/logo.png';

const NavBar = () => {
    return(
        <div className={"container-title"} >
            <div className={"subcontainer-lateral-title "} >
                <img alt="" src={gapsy} className={"img-title"} /> 
            </div>
            <div className={"subcontainer-center-title"}>        
                <label className={"label-title"}>
                    E-comerce
                </label>
            </div>
        </div>
    )
}

export default NavBar;