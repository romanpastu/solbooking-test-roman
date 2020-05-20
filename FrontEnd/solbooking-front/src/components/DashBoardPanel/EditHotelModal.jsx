import React from 'react'
import './EditHotelModal.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
class EditHotelModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
        console.log("some props")
        console.log(this.props.hotelInfo)
    }

    componentDidUpdate(){
      
    }

    render() {
        if (!this.props.showEditHotelModal) {
            return null;
        }

        return <div className="modalBg">
            <div className="flex-container">
                
                <div id="open-modal" className="modal-window-1">
                    <FontAwesomeIcon className="headerClose" icon={faTimesCircle} onClick={this.props.closeEditHotelModal}/>
                    <div class="form-group">
                        <label for="exampleInputEmail1" className="label-color-edit">#</label>
                        <input type="email" name="id" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Hotel Id" readOnly value={this.props.rowId}/>
                    </div>

                    <div class="form-group">
                        <label for="exampleInputEmail1" className="label-color-edit">Name</label>
                        <input type="name" name="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name" value={this.props.hotelInfo.hotelName} onChange={this.props.handleChangeName}/>
                    </div>

                    <div class="form-group">
                        <label for="exampleInputEmail1" className="label-color-edit">Address</label>
                        <input type="name" name="address" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter address" value={this.props.hotelInfo.hotelAddres} onChange={this.props.handleChangeAddress}/>
                    </div>

                    <div class="form-group">
                        <label for="exampleInputEmail1" className="label-color-edit">Phone</label>
                        <input type="text" name="phone" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter phone" value={this.props.hotelInfo.hotelPhone} onChange={this.props.handleChangePhone}/>
                    </div>

                    <div class="form-group">
                        <label for="exampleInputEmail1" className="label-color-edit">Mail</label>
                        <input type="email" name="mail" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={this.props.hotelInfo.hotelMail} onChange={this.props.handleChangeMail}/>
                    </div>
                    <div className="text-center"><button className="btn btn-primary">Update Hotel</button></div>

                </div>
            </div>
        </div>
    }

}

export default EditHotelModal