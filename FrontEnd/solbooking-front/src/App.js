import React from 'react';
import LoginPage from "./components/LoginPage"
import compose from 'recompose/compose'
import { connect } from "react-redux";
import DashBoard from "./components/DashBoard"
import { Route, Switch , withRouter} from 'react-router-dom'
import constants from './constants.js'
import Cookies from 'js-cookie';
import qs from 'qs'
import axios from 'axios'
import isAuthenticated from './services/authService';
import PrivateRoute from './components/PrivateRoute';
import './App.css';
import { setUserName } from "./redux/actions/reduxActions.js"
import { getUserName } from "./services/userInfo.js"
function mapDispatchToProps(dispatch) {
  return {
    setUserName: element => dispatch(setUserName(element))
  }
}

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = { 
      authenticationChecked: false,
      isAuthenticated: false
    }
  }

  componentDidMount(){
    //when the app is mounted, without triggering the auth process, we must check the token in order to redirect it from undesired routes like /login, so we check the state onMount 
    isAuthenticated().then((result) => {
      if (result === true) {
        this.setState({
            isAuthenticated: true,
            authenticationChecked: true
          })
      } else {
        this.setState({ isAuthenticated: false, authenticationChecked: true })
      }
    });

    this.props.setUserName(getUserName())
    
  }

  login = (nickname, password) =>{
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: constants.urlBackend + "/login",
        data: qs.stringify({ nickname, password }),
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      }).then((res)=> {
        if(res.data.accesstoken != undefined){
          Cookies.set('accesstoken', res.data.accesstoken)
        }

        isAuthenticated().then((result) => {
          if(result === true){
            this.props.setUserName(getUserName())
            this.setState({isAuthenticated: true, authenticationChecked: true}, () =>{
              this.props.history.push('/dashboard')
            })
            resolve(true)
          } else{
            this.setState({isAuthenticated:false, authenticationChecked: true})
            if(res.data == "error"){
              reject("error")
            }else if (res.data.code == "ETIMEDOUT"){
              reject("Network error");
            }
          }
        })
      })
      
    })
  }

  logout = () => {
    Cookies.remove('accesstoken')
    this.setState({
      isAuthenticated : false,
      authenticationChecked: true
    }, () =>{
      this.props.setUserName("")
      this.props.history.push("/")
    })
    
  }

  render() {
    if (!this.state.authenticationChecked) return null;
    return(
      <div>
        <Switch>
          <Route exact path="/" render={(props) => <LoginPage {...props} login={this.login} authed={this.state.isAuthenticated}/>}></Route>
          <PrivateRoute authed={this.state.isAuthenticated} path="/dashboard" render={() => <DashBoard {...this.props} logout={this.logout}/>}></PrivateRoute>
          <Route path="/" render={(props) => this.props.history.push("/")} />  
        </Switch>
      </div>
    )
  }
}

export default compose(
  withRouter,
  connect(null, mapDispatchToProps)
)(App);
