import React, {Component} from "react";
import {withRouter} from 'react-router-dom';
import auth from '../../model/AppModel'
import {
  BrowserRouter as Router
} from "react-router-dom";
import {AuthButton} from '../LoginComponents/AuthButton'

import ListItems from './ListItems';
import SwitchComponent from './SwitchComponent';
import appModel from '../../model/AppModel'
import UserService from "../../services/UserService";
import {Container, Row, Col} from "react-bootstrap";
const userService = new UserService();
//import GoogleAuth from "../AccountComponents/GoogleAuth";

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
      <>
      
      <div className="container-fluid">
        <div className="row">
          <Router>
          <div className="col-2 " style={{paddingTop:'7%', textAlign: 'center',  boxShadow:'0px 3px 10px 1px rgba(138,133,148,0.74)'}}>
          <ListItems />
          <AuthButton auth={auth} /*signout={}*//>
          </div>
          <div className="col-10" style={{paddingTop: '3%'}}>
          <SwitchComponent />
          </div>
          </Router>
        </div>
      </div>

      {/*<Router>
        <div style={{marginLeft:'3%', marginRight:'3%', marginTop:'3%'}}>
          <ListItems />
          <SwitchComponent />
        </div>
      </Router>*/}
      </>

    )
  }
}


