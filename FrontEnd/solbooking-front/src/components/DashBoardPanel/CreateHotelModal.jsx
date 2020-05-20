import React from 'react'
import './CreateHotelModal.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import API from '../../services/axiosObject';
import { connect } from "react-redux"
import constants from '../../constants.js'
import { Alert } from 'react-bootstrap'
const mapStateToProps = state => {
    return {
        userId: state.userId,
        wrongEmail: false,
        networkError: false
    }
}

class CreateHotelModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDismiss = this.handleDismiss.bind(this)
        this.onClick = this.onClick.bind(this)
    }


    //handleSubmit for the Hotel Creation
    handleSubmit(event) {
        this.setState({
            wrongEmail: false,
            networkError: false
        })
        event.preventDefault();
        var name = event.target.name.value
        var address = event.target.address.value
        var phone = event.target.phone.value
        var mail = event.target.mail.value

        API.post(constants.urlBackend + "/hotel/register/" + this.props.userId, { name, address, phone, mail }).then(res => {

            this.props.getHotelList()
        }).catch(err => {

            if (err == "Error: Request failed with status code 401") {
                this.setState({
                    wrongEmail: true
                })
            } else if (err = "Error: Network Error") {
                this.setState({
                    networkError: true
                })
            }
        })
    }

    handleDismiss() {
        this.setState({
            wrongEmail: false,
            networkError: false
        })
    }

    onClick(){
        this.setState({
            wrongEmail: false,
            networkError: false
        })
        this.props.closeCreateHotelModal()
    }

    render() {
        if (!this.props.showCreateHotelModal) {
            return null;
        }

        return <div className="modalBg">
            <div className="flex-container">

                <div id="open-modal" className="modal-window-1">
                    <form onSubmit={this.handleSubmit}>
                        <FontAwesomeIcon className="headerClose" icon={faTimesCircle} onClick={this.onClick} />
                        <div style={{ marginTop: "20px" }}>
                            {this.state.wrongEmail ? <Alert variant="danger" dismissible onClose={this.handleDismiss}> Wrong email format </Alert> : null}
                            {this.state.networkError ? <Alert variant="danger" dismissible onClose={this.handleDismiss}> Error check your network and make sure that the hotel doesnt already exist</Alert> : null}
                        </div>

                        <div class="form-group">
                            <label for="exampleInputEmail1" className="label-color-edit">Name</label>
                            <input type="name" name="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name" />
                        </div>

                        <div class="form-group">
                            <label for="exampleInputEmail1" className="label-color-edit">Address</label>
                            <input type="name" name="address" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter address" />
                        </div>

                        <div class="form-group">
                            <label for="exampleInputEmail1" className="label-color-edit">Phone</label>
                            <input type="text" name="phone" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter phone" />
                        </div>

                        <div class="form-group">
                            <label for="exampleInputEmail1" className="label-color-edit">Mail</label>
                            <input type="email" name="mail" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        <div className="text-center"><button className="btn btn-primary">Create Hotel</button></div>
                    </form>
                </div>
            </div>
        </div>
    }
}

export default connect(mapStateToProps)(CreateHotelModal)