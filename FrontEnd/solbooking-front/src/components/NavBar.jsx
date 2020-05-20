import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff} from '@fortawesome/free-solid-svg-icons'
import './NavBar.css'
export default class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
        this.logout = this.logout.bind(this)
    }

    logout(){
        console.log("logged out")
    }

    render(){
        return(
            <div className="appNavbar">
                <div className="navEl nav1">Bienvenid@ XXXX</div>
                <div className="navEl nav3"><FontAwesomeIcon icon={faPowerOff} className="navIcon" onClick={this.logout}/></div>
            </div>
        )
    }
}