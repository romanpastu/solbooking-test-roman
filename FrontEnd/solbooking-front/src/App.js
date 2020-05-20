import React from 'react';
import LoginPage from "./components/LoginPage"
import { Route, Switch } from 'react-router-dom'
import constants from './constants.js'
import Cookies from 'js-cookie';
import qs from 'qs'
import axios from 'axios'
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = { 
      authenticationChecked: false,
      isAuthenticated: false
    }
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
      })
    })
  }

  render() {
    return(
      <div>
        <Switch>
          <Route exact path="/" render={(props) => <LoginPage {...props} login={this.login}/>}></Route>
          <Route path="/dashboard" render={() => <div><p>Welcome to the dashboard</p></div>}></Route>
        </Switch>
      </div>
    )
  }
}

export default App;
