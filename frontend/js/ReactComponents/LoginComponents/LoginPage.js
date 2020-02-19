import React from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import UserService from '../../services/UserService';
import appModel from '../../model/AppModel';
import GoogleAuth from '../AccountComponents/GoogleAuth';


class LoginPage extends React.Component{

  state = {
    redirectToReferrer: false,
    login: '',
    password: '' 
  }
  
  loginChangeHandler = (event) => {
    this.setState({login: event.target.value});
  }

  passwordChangeHandler = (event) => {
    this.setState({password: event.target.value})
  }

  submitHandler = async (event) => {  
    event.preventDefault();
    const userService = new UserService();
    const result = await userService.login(this.state.login, this.state.password);    
    if (result.error) {
      appModel.setLogined(false);
      alert('Wrong credential.');
      await this.props.refreshMenu();
      return;
    } 
    document.cookie = `token=${result.token}`;  
    appModel.setLogined(true); 
    const accessRow = await userService.access();
    if (!accessRow.error){
      appModel.setAccess(accessRow.message.access);
    }
    this.setState({redirectToReferrer: true});
    await this.props.refreshMenu();    
  }

  render(){
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state;  

    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }

    return(
      <div>
      <form onSubmit={(ev) => this.submitHandler(ev)} style = {{marginTop: '3%', fontSize: '27pt', color: 'slategray'}}>
                <fieldset style={{marginLeft: '20%', marginRight: '20%'}}>
                    <legend style={{borderBottom: ' 1px solid grey', fornSize: '30pt'}}>Enter the site</legend>

                      <div className="form-group">
                      <label htmlFor="inputLogin">Login</label>
                      <input id="inputLogin" name="login" placeholder="Enter login" className="form-control" required onChange={this.loginChangeHandler}/>
                      </div>

                      <div className="form-group">
                      <label htmlFor="inputPassword">Password</label>
                      <input type="password" id="inputPassword" onChange={this.passwordChangeHandler} name="password" placeholder="Enter password" className="form-control" required />
                      </div>

                    <button  id="loginFormBtn" type="submit" className="btn btn-primary" >Sign in</button>
                    <GoogleAuth from={this.props.location.state}/>
                </fieldset>
            </form>
      
    </div>
    )
  }
}

export default withRouter(LoginPage);