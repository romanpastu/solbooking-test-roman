import React from 'react'
import './LoginPage.css'
import LoginFrom from './LoginForm'
import RegisterForm from './RegisterForm'

export default class LoginPage extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            displayLogin: true
        }
        this.displayLogin = this.displayLogin.bind(this);
        this.displayRegister = this.displayRegister.bind(this);
    }

    componentDidMount(){
        //if the user was already authed, it should be autoredirected to the dashboard
        if(this.props.authed){
            this.props.history.push('/dashboard')
        }
    }

    displayLogin() {
        this.setState({
            displayLogin: true
        })
    }

    displayRegister() {
        this.setState({
            displayLogin: false
        })
    }

    render() {
        var selectedRegister = ""
        var selectedLogin = ""
        if(this.state.displayLogin){
            selectedLogin = "selectorLogin selectorLoginSelected"
            selectedRegister= "selectorRegister"
        }else{
            selectedLogin = "selectorLogin"
            selectedRegister= "selectorRegister selectorRegisterSelected"
        }
        
        return (<div>
            <div className="blurredBg"></div>
            <div className="formContainer">
                <div className="titleContainer">
                    <p className="title">SolBooking</p>
                </div>
                <div className="formIn">
                    <div className="selectorContainer">
                        <div className={selectedLogin} onClick={this.displayLogin}>Login</div>
                        <div className={selectedRegister} onClick={this.displayRegister}>Register</div>
                    </div>
                    <br></br>
                    {this.state.displayLogin ? <LoginFrom login={this.props.login} /> : <RegisterForm login={this.props.login} {...this.props} />}
                </div>
            </div>
        </div>
        )
    }
}