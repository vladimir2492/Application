import React from 'react';
import {Component, Route, Redirect} from 'react-router-dom'
import appModel from '../../model/AppModel';


const PrivateRoute = ({ component: Component, ...rest }) => {
    return (<Route {...rest} render={(props) => (
      (appModel.isLogined === true && document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1"))
        ? <Component {...props} />
        : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
    )} />)
}

export {PrivateRoute};
