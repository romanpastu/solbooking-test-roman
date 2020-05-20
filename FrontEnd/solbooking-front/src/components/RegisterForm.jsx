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
            wrongEmail: false,
            noFullName: false,
            noPassword: false

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
            console.log(res)
            this.props.login(username,password2)
        })
    }

    handleDismiss(){
        this.setState({
            passwordsMustBeEqual: false,
            wrongEmail: false,
            noFullName: false,
            noPassword: false
        })
    }

    render() {
        return (
            <div>
                <form>
                {this.state.passwordsMustBeEqual ? <Alert variant="danger" dismissible onClose={this.handleDismiss}> Passwords must be equal </Alert> : null}
                {this.state.wrongEmail ? <Alert variant="danger" dismissible onClose={this.handleDismiss}> Wrong email </Alert> : null}
                {this.state.noFullName ? <Alert variant="danger" dismissible onClose={this.handleDismiss}> You must input a first name </Alert> : null}
                {this.state.noPassword ? <Alert variant="danger" dismissible onClose={this.handleDismiss}> Theres no password </Alert> : null}
                    <div class="form-group">
                        <label for="exampleInputEmail1">Username</label>
                        <input type="text" name="username" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username" onChange={this.handleChange} />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Full Name</label>
                        <input type="text" name="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Full Name" onChange={this.handleChange} />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" name="password1" class="form-control" id="exampleInputPassword1" placeholder="Password" onChange={this.handleChange} />
                    </div>
                    <div class="form-group">
                        <input type="password" name="password2" class="form-control" id="exampleInputPassword1" placeholder="Confirm Password" onChange={this.handleChange} />
                    </div>

                    <div className="text-center buttonContainer">
                        <button type="submit" class="btn btn-primary buttonLogin" onClick={this.handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}