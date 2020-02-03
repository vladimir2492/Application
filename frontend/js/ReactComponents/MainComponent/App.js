import React, {Component} from "react";
import {withRouter} from 'react-router-dom';

import {
  BrowserRouter as Router
} from "react-router-dom";

import ListItems from './ListItems';
import SwitchComponent from './SwitchComponent';
import appModel from '../../model/AppModel'
import UserService from "../../services/UserService";

export default class App extends React.Component{
  constructor(props){
    super(props)
    this.props = props
    this.state = {
      checkingLogin: true
    }
  }

  componentDidMount() {
    this.setState({ checkingLogin: true });
    this.checkAuth();    
  }
  
  async checkAuth() {
    appModel.loadDataFromLS(); //возвращает true or false, в зависимости от того, залогинен был пользователь или нет 
    let userService = new UserService();
    if (appModel.isLogined) {
      const accessUser = await userService.access();
      if (!accessUser.error) {
        appModel.user = accessUser;
        this.setState({checkingLogin: false})   
        return;
      }      
    } 
    appModel.setLogined(false);
    return this.setState({checkingLogin: false})
  }

 

  render(){
    if (this.state.checkingLogin) {
      return <div style={{marginLeft:'3%', marginRight:'3%', marginTop:'3%'}}>Loading appplication please wait...</div>
    }
    return(
      <Router>
        <div style={{marginLeft:'3%', marginRight:'3%', marginTop:'3%'}}>
          <ListItems />
          <SwitchComponent />
        </div>
      </Router>

    )
  }
}


