import {withRouter} from 'react-router-dom';
import React from 'react';
import appModel from '../../model/AppModel';
import LogoutButton from './LogoutButton';

const AuthButton = withRouter(({history, refreshMenu}) => (
    appModel.isLogined ? (
      <LogoutButton refreshMenu={refreshMenu}/>
      //<button className="btn btn-primary" style={{marginBottom: '3%'}}>Sign out</button>
  ) : (
    <p>You are not logged in.</p>
    
  )
  
))



export {AuthButton};