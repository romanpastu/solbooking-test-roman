import React from 'react'
import './DeleteHotelModal.css'

class DeleteHotelModal extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        if(!this.props.showDeleteHotelModal){
            return null;
        }

        return <div className="modalBg">
            <div className="flex-container">

                <div id="open-modal" className="modal-window-1">
                    <h6 className="text-center deleteText">Are you sure that you want to delete the hotel?</h6>
                    <div className="text-center">
                        <button class="btn btn-danger btnDel" onClick={() => this.props.deleteHotel()}>Delete hotel</button>
                        <button class="btn btn-primary btnDel" onClick={() => this.props.closeDeleteHotelModal()}>Cancel</button>
                    </div>

                </div>
            </div>
        </div>
    }

}

export default DeleteHotelModal