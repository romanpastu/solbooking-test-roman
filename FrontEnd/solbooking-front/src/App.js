import React from 'react';
import LoginPage from "./components/LoginPage"
import { Route, Switch } from 'react-router-dom'
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {

    }
  }

  render() {
    return(
      <div>
        <Switch>
          <Route path="/login" render={(props) => <LoginPage {...props}/>}></Route>
        </Switch>
      </div>
    )
  }
}

export default App;
