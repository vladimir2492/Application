import React from 'react';
import {Link} from 'react-router-dom';
import Registration from '../UserComponents/Registration';
import {AuthButton} from '../LoginComponents/AuthButton';
import auth from '../../model/AppModel';

export default class ListItems extends React.Component{  

    render(){
        const {currentUser, isAdmin, isAdminOrOwner, isUser, refreshMenu} = this.props;
        console.log('currentUser = '+ currentUser + ', isAdmin = ' + isAdmin + ', isAdminOrOwner = ' + isAdminOrOwner + ', isUser = '+ isUser)
        return(
            currentUser ?
            <ul style={{margin: '5%'}}>

                {isAdmin &&                
                    <li>
                        <Link to={{
                            pathname: '/users',
                            state: {
                                fromNotifications: true
                            }
                        }}>Users </Link>
                    </li>}

                {isAdminOrOwner &&        
                    <li>
                        <Link to={{
                            pathname: '/reviews',
                            state: {
                                fromNotifications: true
                            }
                        }}>Reviews </Link>
                    </li>}
                

                <li>
                     <Link to="/" >Main page</Link>
                </li>

                {isAdminOrOwner &&    
                    <li>
                        <Link to={{
                            pathname: '/restaurants',
                            state: {
                                fromNotifications: true
                            }
                        }}>Restaurants </Link>
                    </li>}

                {isUser &&            
                    <li>
                        <Link to={{
                            pathname: '/restaurants_user',
                            state: {
                                fromNotifications: true
                            }
                        }}>Restaurants for User </Link>
                    </li>}

                {/*<li style={{paddingTop: '10%'}} >
                    <Registration /> 
                    </li>*/}

                <li style={{paddingTop:'5%'}} >
                    <AuthButton auth={auth} refreshMenu={refreshMenu} />
                </li>

            </ul>
            :
            <ul>
                <li>
                    <Link to={{
                        pathname: '/login',
                        state: {
                            fromNotifications: true
                        }
                    }}>Login in, please </Link>
                </li>

                <li style={{paddingTop: '10%'}} >
                    <Registration /> 
                </li>
            </ul>
            
        )
    }
}
        