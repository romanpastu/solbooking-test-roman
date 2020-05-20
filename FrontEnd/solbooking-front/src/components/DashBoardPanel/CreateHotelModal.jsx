import React from 'react'
import './CreateHotelModal.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import API from '../../services/axiosObject';
import { connect } from "react-redux"
import constants from '../../constants.js'

const mapStateToProps = state => {
    return {
        userId: state.userId
    }
}

class CreateHotelModal extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    //handleSubmit for the Hotel Creation
    handleSubmit(event){
        event.preventDefault();
        var name = event.target.name.value
        var address = event.target.address.value
        var phone = event.target.phone.value 
        var mail = event.target.mail.value
        
        API.post(constants.urlBackend+"/hotel/register/"+this.props.userId,{name, address, phone, mail}).then(res => {
            console.log(res)
            this.props.getHotelList()
        }).catch(err =>{
             console.log(err)
         })
    }

    render(){
         if (!this.props.showCreateHotelModal) {
             return null;
         }

        return <div className="modalBg">
            <div className="flex-container">
                
                <div id="open-modal" className="modal-window-1">
                    <form onSubmit={this.handleSubmit}>
                    <FontAwesomeIcon className="headerClose" icon={faTimesCircle} onClick={this.props.closeCreateHotelModal}/>

                    <div class="form-group">
                        <label for="exampleInputEmail1" className="label-color-edit">Name</label>
                        <input type="name" name="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name"/>
                    </div>

                    <div class="form-group">
                        <label for="exampleInputEmail1" className="label-color-edit">Address</label>
                        <input type="name" name="address" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter address"/>
                    </div>

                    <div class="form-group">
                        <label for="exampleInputEmail1" className="label-color-edit">Phone</label>
                        <input type="text" name="phone" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter phone"/>
                    </div>

                    <div class="form-group">
                        <label for="exampleInputEmail1" className="label-color-edit">Mail</label>
                        <input type="email" name="mail" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                    </div>
                    <div className="text-center"><button className="btn btn-primary">Create Hotel</button></div>
                    </form>
                </div>
            </div>
        </div>
    }
}

export default connect(mapStateToProps)(CreateHotelModal)