import React from 'react'
import NavBar from './NavBar'
import API from '../services/axiosObject.js'
import constants from "../constants.js"
import Reactable from "reactable"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import DeleteHotelModal from "./DashBoardPanel/DeleteHotelModal"
import EditHotelModal from "./DashBoardPanel/EditHotelModal"
import CreateHotelModal from "./DashBoardPanel/CreateHotelModal"
import { connect } from "react-redux"
import { Alert } from 'react-bootstrap'
import "./DashBoard.css"

const mapStateToProps = state => {
    return {
        userId: state.userId,
        deleteNetworkError: false
    }
}

class DashBoard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hotelList: [],
            rowId: "",
            showDeleteHotelModal: false,
            showEditHotelModal: false,
            showCreateHotelModal: false,
            editHotelInfo: {
                hotelName: "",
                hotelAddres: "",
                hotelPhone: "",
                hotelMail: ""
            },
            deleteNetworkError: false,
            wrongEmailEditHotelModal: false,
            networkErrorEditHotelModal: false

        }
        this.getHotelList = this.getHotelList.bind(this)
        this.deleteHotel = this.deleteHotel.bind(this)
        this.showDeleteHotelModal = this.showDeleteHotelModal.bind(this)
        this.closeDeleteHotelModal = this.closeDeleteHotelModal.bind(this)
        this.showEditHotelModal = this.showEditHotelModal.bind(this)
        this.closeEditHotelModal = this.closeEditHotelModal.bind(this)
        this.handleSubmitHotelEdit = this.handleSubmitHotelEdit.bind(this)
        this.showCreateHotelModal = this.showCreateHotelModal.bind(this)
        this.closeCreateHotelModal = this.closeCreateHotelModal.bind(this)
        this.handleDismiss = this.handleDismiss.bind(this)
        this.handleDismissEditHotelAlerts = this.handleDismissEditHotelAlerts.bind(this)
    }

    componentDidMount() {
        this.getHotelList();
    }

    //Gets the hotel list
    getHotelList() {
        API.get(constants.urlBackend + "/user/"+this.props.userId+"/hotel-list").then(res => {
            this.setState({
                hotelList: res.data
            }, () => {
                console.log(this.state.hotelList)
            })
        }).catch(err => {
            console.log(err)
        })
    }

    //handleChange Functions For the Hotel Edit
    handleChangeName = (evt) => {
        this.setState({
            editHotelInfo: Object.assign({}, this.state.editHotelInfo, {hotelName: evt.target.value})
        })
    }
    handleChangeAddress = (evt) => {
        this.setState({
            editHotelInfo: Object.assign({}, this.state.editHotelInfo, {hotelAddres: evt.target.value})
        })
    }
    handleChangePhone = (evt) => {
        this.setState({
            editHotelInfo: Object.assign({}, this.state.editHotelInfo, {hotelPhone: evt.target.value})
        })
    }
    handleChangeMail = (evt) => {
        this.setState({
            editHotelInfo: Object.assign({}, this.state.editHotelInfo, {hotelMail: evt.target.value})
        })
    }

    //handleSubmit for the Hotel Edit
    handleSubmitHotelEdit(event){
        this.setState({
            wrongEmailEditHotelModal: false
        })
        event.preventDefault();

        var name = this.state.editHotelInfo.hotelName
        var address = this.state.editHotelInfo.hotelAddres
        var phone = this.state.editHotelInfo.hotelPhone
        var mail = this.state.editHotelInfo.hotelMail
        
        API.post(constants.urlBackend+"/hotel/"+this.state.rowId+"/update",{name, address, phone, mail}).then( res =>{
            console.log(res)
            this.getHotelList();
        }).catch(err => {
            if (err == "Error: Request failed with status code 401") {
                this.setState({
                    wrongEmailEditHotelModal: true
                })
            }else if (err = "Error: Network Error") {
                this.setState({
                    networkErrorEditHotelModal: true
                })
            }
            console.log(err)
        })
    }

    handleDismissEditHotelAlerts(){
        this.setState({
                wrongEmailEditHotelModal: false,
                networkErrorEditHotelModal: false
        })
    }


    

    deleteHotel() {

        API.delete(constants.urlBackend + "/hotel/" + this.state.rowId + "/delete").then(response => {
            console.log(response)
            this.getHotelList();
            this.closeDeleteHotelModal();
        }).catch(err => {
            console.log(err)
            if(err == "Error: Network Error"){
                this.setState({
                    deleteNetworkError: true,
                    showDeleteHotelModal: false
                })
            }
        })
    }

    showDeleteHotelModal(rowId) {
        this.setState({
            showDeleteHotelModal: true,
            rowId: rowId
        })
    }

    closeDeleteHotelModal() {
        this.setState({
            showDeleteHotelModal: false
        }, () => {

        })
    }

    handleDismiss(){
        this.setState({
            deleteNetworkError: false
        })
    }

    showCreateHotelModal() {
        console.log("showed")
        this.setState({
            showCreateHotelModal: true,
        })
        
    }

    closeCreateHotelModal() {
        this.setState({
            showCreateHotelModal: false
        }, () => {

        })
    }

    showEditHotelModal(rowId, hotelName, hotelAddress, hotelPhone, hotelMail) {
        let obj = Object.assign({}, this.state.editHotelInfo)

        obj.hotelName= hotelName;
        obj.hotelAddres = hotelAddress;
        obj.hotelPhone = hotelPhone;
        obj.hotelMail = hotelMail;

        this.setState({
            showEditHotelModal: true,
            rowId: rowId,
            editHotelInfo: obj
        }, () =>{
            
        })
    }

    closeEditHotelModal() {
        this.setState({
            showEditHotelModal: false
        })
    }


    render() {
        var hotels = this.state.hotelList

        const Table = Reactable.Table,
            Td = Reactable.Td,
            Tr = Reactable.Tr;

        
            // if (hotels.length === 0) {
            //     return <p>You currnetly have no hotels, create one!</p>
            // }

        return (
            <div>
                <NavBar logout={this.props.logout} />
                {this.state.deleteNetworkError ? <Alert variant="danger" dismissible onClose={this.handleDismiss}> There was a network error while deleting the hotel </Alert> : null}
                <div className="text-center">
                    <h3>Listado de Hoteles</h3>
                    <button className="btn btn-primary" style={{marginBottom :"0.5vh"}}  onClick={this.showCreateHotelModal}>Crear un hotel</button>
                </div>
                
                <Table
                    className="table"
                    filterable={['Name', 'Address']}
                    itesPerPage={10}
                    currentPage={0}
                    sortable={true}
                >
                    {hotels.map((row) => {
                        return (
                            <Tr className={row.className} key={row.id}>
                                <Td column="#">{row.id}</Td>
                                <Td column="Name">{row.name}</Td>
                                <Td column="Address">{row.address}</Td>
                                <Td column="Phone">{row.phone}</Td>
                                <Td column="Mail">{row.mail}</Td>
                                <Td column="Manage"><div><FontAwesomeIcon className="editIcon" onClick={() => this.showEditHotelModal(row.id, row.name, row.address, row.phone, row.mail)} icon={faEdit}></FontAwesomeIcon>
                                    <FontAwesomeIcon className="editIcon" onClick={() => this.showDeleteHotelModal(row.id)} icon={faTrashAlt}></FontAwesomeIcon>
                                </div></Td>
                            </Tr>
                        )
                    })}
                </Table>
                <DeleteHotelModal showDeleteHotelModal={this.state.showDeleteHotelModal} closeDeleteHotelModal={this.closeDeleteHotelModal} deleteHotel={this.deleteHotel} />
                <EditHotelModal 
                handleChangeName={this.handleChangeName}
                handleChangeMail={this.handleChangeMail}
                handleChangePhone={this.handleChangePhone}
                handleChangeAddress={this.handleChangeAddress}
                handleSubmit={this.handleSubmitHotelEdit}
                rowId={this.state.rowId} showEditHotelModal={this.state.showEditHotelModal} closeEditHotelModal={this.closeEditHotelModal} hotelInfo={this.state.editHotelInfo}
                wrongEmailEditHotelModal={this.state.wrongEmailEditHotelModal} handleDismissEditHotelAlerts={this.handleDismissEditHotelAlerts}
                networkErrorEditHotelModal = {this.state.networkErrorEditHotelModal}
                />
                <CreateHotelModal showCreateHotelModal={this.state.showCreateHotelModal} closeCreateHotelModal={this.closeCreateHotelModal} getHotelList={this.getHotelList}/>

            </div>
        )
    }
}
export default connect(mapStateToProps)(DashBoard)