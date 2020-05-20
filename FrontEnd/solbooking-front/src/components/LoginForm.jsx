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

    handleDismiss(){
        this.setState({
            wrongCombo: false,
            serverError: false
        })
    }

    handleSubmit = function(event){
        this.setState({
            serverError: false,
            wrongCombo: false
        })
        event.preventDefault();
        this.props.login(this.state.username, this.state.password).then(res => {

        }).catch(err => {
           if(err == "Network error"){
                this.setState({
                    serverError: true
                })
            }else{
                this.setState({
                    wrongCombo: true
                })
            }
        })
    }


    render() {
        return (
            <div>
                <form>
                {this.state.wrongCombo ? <Alert variant="danger" dismissible onClose={this.handleDismiss}> Wrong username and password combination </Alert> : null}
                {this.state.serverError ? <Alert variant="danger" dismissible onClose={this.handleDismiss}> Server Error </Alert> : null}
                <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Username</label>
                        <input type="text" name="username" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={this.handleChange}/>
                </div>
                <div className="text-center buttonContainer">
                    <button type="submit" className="btn btn-primary buttonLogin" onClick={this.handleSubmit}>Submit</button>
                </div>
                </form>
            </div>
        )
    }
}

export default LoginForm;