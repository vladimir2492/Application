import React, {Component} from "react";
import {
  /*BrowserRouter as Router*/ Router, Link
} from "react-router-dom";
import ListItems from './ListItems';
import SwitchComponent from './SwitchComponent';
import appModel from '../../model/AppModel'
import UserService from "../../services/UserService";
const userService = new UserService();
import { createBrowserHistory } from "history";
const history = createBrowserHistory();



export default class App extends React.Component{
  constructor(props){
    super(props)
    this.props = props
    this.state = {
      checkingLogin: true,
      access: null,
      checckingAccess: false
    }
  }

  async componentDidMount() {
    this.refreshMenu();
  }
  
  refreshMenu = async() => {
    this.setState({ 
      checkingLogin: true,
      checkAccess: false 
    });
    await this.checkAuth(); 
    await this.checkAccess();
  }

  async checkAuth() {
    appModel.loadDataFromLS(); //возвращает true or false, в зависимости от того, залогинен был пользователь или нет 
    if (appModel.isLogined) {  
      this.setState({checkingLogin: false})   
      return;   
    } 
    appModel.setLogined(false);
    return this.setState({checkingLogin: false})
  }

  async checkAccess() {
    appModel.loadAccessFromLS();
    let access = null;
    if(appModel.userAccess === 'Admin'){
      access = 'Admin';
    }
    if(appModel.userAccess === 'User'){
      access = 'User';
    }
    if(appModel.userAccess === 'Owner'){
      access = 'Owner';
    }
    if(access){
      this.setState({
      access: access,
      checckingAccess: true
      })
    }
  }

  logoutRefresh = () =>{
    this.setState({
      checckingAccess: false
    })
  }

  render(){
    if(!document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1") ){
      console.log('token is true')
    }else{
      console.log('token is false')
    }
    const {checkingLogin, checckingAccess, access} = this.state;
    if (checkingLogin) {
      return <div style={{marginLeft:'3%', marginRight:'3%', marginTop:'3%'}}>Loading appplication please wait...</div>
    }
    return(
      <div className="container-fluid">
        <div className="row">
          <Router history={history}>
            <div className="col-2 " style={{paddingTop:'3%', textAlign: 'center',  boxShadow:'0px 3px 10px 1px rgba(138,133,148,0.74)'}}>
              <ListItems currentUser={checckingAccess} isAdmin={access=='Admin'} isAdminOrOwner={access=='Admin'||access=='Owner'} isUser={access=='User'} refreshMenu={this.logoutRefresh}/>
            </div>
            <div className="col-10" style={{paddingTop: '3%'}}>
              <SwitchComponent refreshMenu={this.refreshMenu}/>
            </div>
          </Router>
        </div>
      </div>
    )
  }
}


