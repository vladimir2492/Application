import React from 'react';
import {Component, Route, Redirect} from 'react-router-dom'
import appModel from '../../model/AppModel';


const PrivateRoute = ({ component: Component, ...rest }) => {
    return (<Route {...rest} render={(props) => (
      appModel.isLogined === true
        ? <Component {...props} />
        : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
    )} />)
}

export {PrivateRoute};
