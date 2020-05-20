import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff} from '@fortawesome/free-solid-svg-icons'
import { connect } from "react-redux"
import './NavBar.css'

const mapStateToProps = state => {
    return {
        userName: state.userName
    }
}

class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
        this.logout = this.logout.bind(this)
    }

    logout(){
        this.props.logout();
    }

    render(){
        return(
            <div className="appNavbar">
                <div className="navEl nav1">Bienvenid@ {this.props.userName}</div>
                <div className="navEl nav3"><FontAwesomeIcon icon={faPowerOff} className="navIcon" onClick={this.logout}/></div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Navbar)