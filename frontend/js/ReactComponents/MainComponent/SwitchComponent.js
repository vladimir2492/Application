import React from 'react';
import {Route, Switch} from 'react-router-dom';
import LoginPage from '../LoginComponents/LoginPage';
import UserTable from '../UserComponents/UserPage';
import ProductPage from '../ProductComponents/ProductPage';
import {PrivateRoute} from '../LoginComponents/PrivateRoute';
import AccountPage from '../AccountComponents/AccountPage';




export default class SwitchComponent extends React.Component{
    render(){

                
        return(
            <>
           
           <Switch>    
                <Route path='/login'><LoginPage location={this.props.location} /></Route>
                <PrivateRoute path='/users' component={UserTable} />
                <PrivateRoute path="/products" component={ProductPage} />
                <PrivateRoute path="/account" component={AccountPage} />
            </Switch> 
            </>
        )
    }
}
