import React from 'react';
import UserService from '../../services/UserService';
import axios from 'axios';
import FileUpload from './FileUpload';

const userService = new UserService();

export default class AccountPage extends React.Component{
    state={
        userData: '',
        userImgSrc: '//:0'
    }

    async componentDidMount(){
        const access = await userService.access();
        this.setState({
            userData: access.message
        });
        const id = this.state.userData.id;
        if(id!==undefined && id.split('-')[0] === 'google'){
            return this.setState({
                userImgSrc: access.message.img
            })
        }
        const response = await userService.takeImg(id);
        if(response.error){
            return;
        }
                
    }
    
    render(){
        const {userData} = this.state;
        return(
            <div style={{paddingLeft: '5%'}} >
                <div className='imgArea' style={{boxShadow: '0px 3px 10px 1px rgba(138,133,148,0.74)', display:'inline-block', padding:'5%'}}>
                    <img src={this.state.userImgSrc} alt="user image"></img>
                    <FileUpload id={userData.id} />
                </div>
                <div className="userData" >
                <table className="table table-borderless" style={{width: '30%', marginTop:'5%', marginLeft: '3%', fontSize:'110%', color:'grey'}}>
                     <tbody>   
                        <tr>
                            <th scope="row">id</th> <td>{userData.id}</td>
                        </tr>
                        <tr>    
                            <th scope="row">Name</th>  <td>{userData.name}</td>
                        </tr>
                        <tr>    
                            <th scope="row">e-mail</th> <td>{userData.email}</td>
                        </tr>    
                        <tr>
                            <th scope="row">Access</th> <td>{userData.access}</td>
                        </tr>
                    </tbody>
                </table>    
                </div>
            </div>
        )
    }
}