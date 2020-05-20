import React from 'react'
import NavBar from './NavBar'

export default class DashBoard extends React.Component {
    constructor(props){
        super(props)
        this.state = {

        }

    }

    render(){
        return(
            <div>
                <NavBar logout={this.props.logout}/>
                <div>
                    <h3>Listado de Hoteles</h3>
                </div>
            </div>
        )
    }
}
