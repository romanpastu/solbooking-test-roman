import React from 'react'
import './EditHotelModal.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import API from '../../services/axiosObject.js'
import constants from "../../constants.js"
import { Alert } from 'react-bootstrap'
class EditHotelModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        console.log("some props")
        console.log(this.props.hotelInfo)
    }


    render() {
        if (!this.props.showEditHotelModal) {
            return null;
        }

        return <div className="modalBg">
            <div className="flex-container">

                <div id="open-modal" className="modal-window-1">
                    <form onSubmit={this.props.handleSubmit}>
                        <FontAwesomeIcon className="headerClose" icon={faTimesCircle} onClick={this.props.closeEditHotelModal} />
                        <div style={{ marginTop: "20px" }}>
                            {this.props.wrongEmailEditHotelModal ? <Alert variant="danger" dismissible onClose={this.props.handleDismissEditHotelAlerts}> Wrong email format </Alert> : null}
                            {this.props.networkErrorEditHotelModal ? <Alert variant="danger" dismissible onClose={this.props.handleDismissEditHotelAlerts}> Make sure that your network is up, and theres no hotel with the same data </Alert> : null}
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1" className="label-color-edit">#</label>
                            <input type="email" name="id" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Hotel Id" readOnly value={this.props.rowId} />
                        </div>

                        <div class="form-group">
                            <label for="exampleInputEmail1" className="label-color-edit">Name</label>
                            <input type="name" name="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name" value={this.props.hotelInfo.hotelName} onChange={this.props.handleChangeName} />
                        </div>

                        <div class="form-group">
                            <label for="exampleInputEmail1" className="label-color-edit">Address</label>
                            <input type="name" name="address" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter address" value={this.props.hotelInfo.hotelAddres} onChange={this.props.handleChangeAddress} />
                        </div>

                        <div class="form-group">
                            <label for="exampleInputEmail1" className="label-color-edit">Phone</label>
                            <input type="text" name="phone" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter phone" value={this.props.hotelInfo.hotelPhone} onChange={this.props.handleChangePhone} />
                        </div>

                        <div class="form-group">
                            <label for="exampleInputEmail1" className="label-color-edit">Mail</label>
                            <input type="text" name="mail" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={this.props.hotelInfo.hotelMail} onChange={this.props.handleChangeMail} />
                        </div>
                        <div className="text-center"><button className="btn btn-primary">Update Hotel</button></div>
                    </form>
                </div>
            </div>
        </div>
    }

}

export default EditHotelModal