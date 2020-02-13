import React from 'react';
import {Link} from 'react-router-dom';
import Registration from '../UserComponents/Registration';

export default class ListItems extends React.Component{
    render(){
        return(
            <ul style={{margin: '5%'}}>
                <li>
                <Link to={{
                    pathname: '/products',
                    state: {
                        fromNotifications: true
                    }
                }}>Products </Link>
                
                </li>
                <li>
                <Link to={{
                    pathname: '/users',
                    state: {
                        fromNotifications: true
                    }
                }}>Users </Link>
                </li>
                
                <li>
                <Link to={{
                    pathname: '/account',
                    state: {
                        fromNotifications: true
                    }
                }}>Account </Link>
                </li>

                <li style={{paddingTop: '10%'}} >
                    <Registration /> 
                </li>
            </ul>
        )
    }
}
        