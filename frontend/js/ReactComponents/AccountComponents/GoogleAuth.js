import React from 'react';
import UserService from '../../services/UserService';
const userService = new UserService();
import appModel from '../../model/AppModel';
import {Redirect, withRouter} from 'react-router-dom';


class GoogleAuth extends React.Component{

    state = {
        redirectToReferrer: false
    }

    componentDidMount(){
        if(!window.gapi){
            return;
        }
        window.gapi.load('auth2', function(){
            window.gapi.auth2.init({
                client_id: '309850694945-kkvfmk06uobnsj4q6s25n3o8uno65pb8'
            }).then(() => console.log('init OK!'), () => console.log('init error'))
        })
    }

    onClickHandler = async () => {
        const googleAuth = window.gapi.auth2.getAuthInstance();
        googleAuth.signIn({
            scope: 'profile email'
        }).then(
            (user) => _authOk(user),
            ()=> _authErr()
        )
        const _authOk = async (user) =>{
           const googleUser = user.getBasicProfile();
           const userData = {
               img: googleUser.getImageUrl(),
               name: googleUser.getName(),
               email: googleUser.getEmail(),
               access: 'User'               
           }
           console.log('user data in GoogleAuth = '+ JSON.stringify(userData, null, 4));
           const result = await userService.googleAuth(userData);
           if(result.error){
            appModel.setLogined(false);
            alert('Wrong credential.')
            return;
           }
           document.cookie = `token=${result.message}`;
           appModel.setLogined(true);
           appModel.setAccess('User');
           this.setState({redirectToReferrer: true}) ;
           this.props.refreshMenu();
        }
        const _authErr = () => {
            console.log('auth error')
        }

    }

    render(){
        const { from } = this.props.from || { from: { pathname: '/' } }
        const { redirectToReferrer } = this.state; 
        if (redirectToReferrer === true) {
            return <Redirect to={from} />
          } 
        return(
            <div> 
                <button style={{marginTop:'2%'}} className='btn btn-primary' onClick={this.onClickHandler}>Log in with Google</button>
            </div>
        )
    }
}
export default withRouter(GoogleAuth);