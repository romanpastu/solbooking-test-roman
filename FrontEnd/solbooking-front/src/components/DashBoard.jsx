import React from 'react'
import NavBar from './NavBar'
import API from '../services/axiosObject.js'
import constants from "../constants.js"
import Reactable from "reactable"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import DeleteHotelModal from "./DashBoardPanel/DeleteHotelModal"
import EditHotelModal from "./DashBoardPanel/EditHotelModal"
import "./DashBoard.css"
export default class DashBoard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hotelList: [],
            rowId: "",
            showDeleteHotelModal: false,
            showEditHotelModal: false,
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
    }

    componentDidMount() {
        this.getHotelList();
    }
    //handleChange Functions
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

    getHotelList() {
        API.get(constants.urlBackend + "/user/6/hotel-list").then(res => {
            this.setState({
                hotelList: res.data
            }, () => {
                console.log(this.state.hotelList)
            })
        }).catch(err => {
            console.log(err)
        })
    }

    deleteHotel() {

        API.delete(constants.urlBackend + "/hotel/" + this.state.rowId + "/delete").then(response => {
            console.log(response)
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

    componentDidUpdate(){
        
    }

    render() {
        var hotels = this.state.hotelList

        const Table = Reactable.Table,
            Td = Reactable.Td,
            Tr = Reactable.Tr;

        if (hotels.length === 0) {
            return <p>loading</p>
        }


        return (
            <div>
                <NavBar logout={this.props.logout} />
                <div className="text-center">
                    <h3>Listado de Hoteles</h3>
                    <button className="btn btn-primary">Create an hotel</button>
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
                rowId={this.state.rowId} showEditHotelModal={this.state.showEditHotelModal} closeEditHotelModal={this.closeEditHotelModal} hotelInfo={this.state.editHotelInfo}
                />
            </div>
        )
    }
}
