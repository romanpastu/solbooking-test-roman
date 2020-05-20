import React from 'react'
import NavBar from './NavBar'
import API from '../services/axiosObject.js'
import constants from "../constants.js"
import Reactable from "reactable"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import "./DashBoard.css"
export default class DashBoard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            hotelList: []
        }
    this.getHotelList = this.getHotelList.bind(this)
    }

    componentDidMount(){
        this.getHotelList();
    }

    getHotelList(){
       API.get(constants.urlBackend+"/user/6/hotel-list").then(res => {
           this.setState({
            hotelList: res.data
           }, () => {
               console.log(this.state.hotelList)
           })
       }).catch(err => {
           console.log(err)
       })
    }

    render(){
        var hotels = this.state.hotelList

        const Table = Reactable.Table,
            Td = Reactable.Td,
            Tr = Reactable.Tr;

        if (hotels.length === 0) {
            return <p>loading</p>
        }


        return(
            <div>
                <NavBar logout={this.props.logout}/>
                <div className="text-center"><h3>Listado de Hoteles</h3></div>
                <Table
                    className="table"
                    filterable={['Name','Address']}
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
                                <Td column="Manage"><div><FontAwesomeIcon className="editIcon" onClick={() => console.log("hi")} icon={faEdit}></FontAwesomeIcon>
                                    <FontAwesomeIcon className="editIcon" onClick={() => console.log("hi")} icon={faTrashAlt}></FontAwesomeIcon>
                                </div></Td>
                            </Tr>
                        )
                    })}
                </Table>
            </div>
        )
    }
}
