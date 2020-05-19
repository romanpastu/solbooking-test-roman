import React from 'react'
import { Alert } from 'react-bootstrap'
class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            wrongCombo : false,
            serverError: false
        }
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
            wrongCombo: false,
            serverError: false
        })
    }


    render() {
        return (
            <div>
                <form>
                {this.state.wrongCombo ? <Alert variant="danger" dismissible onClose={this.handleDismiss}> Wrong username and password combination </Alert> : null}
                {this.state.serverError ? <Alert variant="danger" dismissible onClose={this.handleDismiss}> Server Error </Alert> : null}
                <div class="form-group">
                        <label for="exampleInputEmail1">Username</label>
                        <input type="text" name="username" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username" onChange={this.handleChange} />
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" onChange={this.handleChange}/>
                </div>
                <div className="text-center buttonContainer">
                    <button type="submit" class="btn btn-primary buttonLogin" onClick={this.handleSubmit}>Submit</button>
                </div>
                </form>
            </div>
        )
    }
}

export default LoginForm;