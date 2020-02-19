import React from 'react';
import {Route, Switch} from 'react-router-dom';
import LoginPage from '../LoginComponents/LoginPage';
import UserPage from '../UserComponents/UserPage';
import {PrivateRoute} from '../LoginComponents/PrivateRoute';
import AccountPage from '../AccountComponents/AccountPage';
import RestPage from '../RestComponents/RestPage';
import ReviewPage from '../ReviewComponents/ReviewPage';
import RestPageForUser from '../RestComponents/RestPageForUser';

export default class SwitchComponent extends React.Component{
    render(){
                        
        return(
            
           <div> 
                <Route path='/login'><LoginPage refreshMenu={this.props.refreshMenu}/></Route>
                <PrivateRoute path='/users' component={UserPage} />
                {/*<PrivateRoute path="/account" component={AccountPage} />*/}
                <PrivateRoute exact path="/" component={AccountPage} />
                <PrivateRoute path="/restaurants" component={RestPage} />
                <PrivateRoute path="/reviews" component={ReviewPage} />
                <PrivateRoute path="/restaurants_user" component={RestPageForUser} />
                   
            </div>
           
            
        )
    }
}
