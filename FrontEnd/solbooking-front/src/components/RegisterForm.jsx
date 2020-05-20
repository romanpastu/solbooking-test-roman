import React from 'react'
import { Alert } from 'react-bootstrap'
import axios from 'axios'
import constants from "../constants.js"
import qs from 'qs'
export default class RegisterForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            username: "",
            name: "",
            password1: "",
            password2: "",
            passwordsMustBeEqual: false,
            noName: false,
            noUsername: false,
            noPassword: false,
            networkError: false

        }
       
        this.handleDismiss = this.handleDismiss.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = (evt) => {
        const target = evt.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }

    handleSubmit = function (event){
        this.setState({
            passwordsMustBeEqual: false,
            noPassword: false,
            noUsername: false,
            noName: false
        })
        const {username, name, password1, password2} = this.state
        event.preventDefault();
        axios({
            method: 'post',
            url: constants.urlBackend + "/register",
            data: qs.stringify({username, name, password1, password2}),
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then((res) =>{
            
            // this.props.login(username,password2)
        }).catch(err => {
            if (!err.status) {
                this.setState({
                    networkError: true
                })
            }else{
                if(err.response.status == 400){
                    this.setState({
                        passwordsMustBeEqual: true
                    })
                }else if(err.response.status == 401){
                    this.setState({
                        noPassword: true
                    })
                }else if(err.response.status == 402){
                    this.setState({
                        noUsername: true
                    })
                }else if(err.response.status == 403){
                    this.setState({
                        noName : true
                    })
                }
            }
        })
    }

    handleDismiss(){
        this.setState({
            passwordsMustBeEqual: false,
            noUsername: false,
            noName: false,
            noPassword: false,
            networkError: false
        })
    }

    render() {
        return (
            <div>
                <form>
                {this.state.passwordsMustBeEqual ? <Alert variant="danger" dismissible onClose={this.handleDismiss}> Passwords must be equal </Alert> : null}
                {this.state.noName ? <Alert variant="danger" dismissible onClose={this.handleDismiss}> You must input a full name </Alert> : null}
                {this.state.noUsername ? <Alert variant="danger" dismissible onClose={this.handleDismiss}> You must input an username </Alert> : null}
                {this.state.noPassword ? <Alert variant="danger" dismissible onClose={this.handleDismiss}> Theres no password </Alert> : null}
                {this.state.networkError ? <Alert variant="danger" dismissible onClose={this.handleDismiss}> Network Error </Alert> : null}
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Username</label>
                        <input type="text" name="username" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Full Name</label>
                        <input type="text" name="name" className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="Enter Full Name" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" name="password1" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <input type="password" name="password2" className="form-control" id="exampleInputPassword2" placeholder="Confirm Password" onChange={this.handleChange} />
                    </div>

                    <div className="text-center buttonContainer">
                        <button type="submit" className="btn btn-primary buttonLogin" onClick={this.handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}