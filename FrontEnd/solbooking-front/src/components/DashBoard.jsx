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
import "./DashBoard.css"

const mapStateToProps = state => {
    return {
        userId: state.userId
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
            }

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
        event.preventDefault();

        var name = this.state.editHotelInfo.hotelName
        var address = this.state.editHotelInfo.hotelAddres
        var phone = this.state.editHotelInfo.hotelPhone
        var mail = this.state.editHotelInfo.hotelMail
        
        API.post(constants.urlBackend+"/hotel/"+this.state.rowId+"/update",{name, address, phone, mail}).then( res =>{
            console.log(res)
            this.getHotelList();
        }).catch(err => {
            console.log(err)
        })
    }


    

    deleteHotel() {

        API.delete(constants.urlBackend + "/hotel/" + this.state.rowId + "/delete").then(response => {
            console.log(response)
            this.getHotelList();
        }).catch(err => {
            console.log(err)
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
        //     return <p>loading</p>
        // }


        return (
            <div>
                <NavBar logout={this.props.logout} />
                <div className="text-center">
                    <h3>Listado de Hoteles</h3>
                    <button className="btn btn-primary" style={{marginBottom :"0.5vh"}}  onClick={this.showCreateHotelModal}>Create an hotel</button>
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
                />
                <CreateHotelModal showCreateHotelModal={this.state.showCreateHotelModal} closeCreateHotelModal={this.closeCreateHotelModal} getHotelList={this.getHotelList}/>

            </div>
        )
    }
}
export default connect(mapStateToProps)(DashBoard)