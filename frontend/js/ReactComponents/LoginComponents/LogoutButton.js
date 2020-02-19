import UserService from '../../services/UserService';
import React from 'react';
import {withRouter} from 'react-router-dom';
import appModel from '../../model/AppModel';
const userService = new UserService();

class LogoutButton extends React.Component{
    submitHandler = async (event) => {
      event.preventDefault();
      const {refreshMenu} = this.props;
      await refreshMenu();
      const result = await userService.logout();
      if (result.error) {
        alert('Wrong credential.')
        return;
      }
      appModel.setLogined(false);
      appModel.setAccess(null);
      this.props.history.push('/')
    }
  
    render(){
    
      return(
        <form className="logoutArea" onSubmit={(ev) => this.submitHandler(ev)}>
          <button className='btn btn-primary'> Log out </button>
        </form>
      )
    }
  }

  export default withRouter(LogoutButton);