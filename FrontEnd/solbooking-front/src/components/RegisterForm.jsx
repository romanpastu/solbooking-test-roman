import React from 'react'
import { Alert } from 'react-bootstrap'

export default class RegisterForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            username: "",
            fullName: "",
            password1: "",
            password2: "",
            passwordsMustBeEqual: false,
            wrongEmail: false,
            noFullName: false,
            noPassword: false

        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDismiss = this.handleDismiss.bind(this)
    }

    handleChange = (evt) => {
        const target = evt.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

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
                        <input type="text" name="fullName" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Full Name" onChange={this.handleChange} />
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