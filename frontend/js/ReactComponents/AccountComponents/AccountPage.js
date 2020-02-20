import React from 'react';
import UserService from '../../services/UserService';
import axios from 'axios';
import FileUpload from './FileUpload';
const userService = new UserService();
import {BACKEND_URL} from '../../config/index';

export default class AccountPage extends React.Component{
    state={
        userData: '',
        userImgSrc: null
    }

    async componentDidMount(){
        const access = await userService.access();
        if(!access.error){
            this.setState({
                userData: access.message
            });
            const id = this.state.userData.id;
            if(id!==undefined && id.split('-')[0] === 'google'){
                //взять изображение с гугла
                const googleSrc = access.message.img;
                this.setState({userImgSrc: googleSrc});
                return;
            }
            await this.refreshImage(id);
        }           
    }

    refreshImage = async(id) => {
        const response = await userService.takeImg(id);
        if(!response.error){
            if(response.message!=null){
                this.setState({userImgSrc: `${BACKEND_URL}/images/${response.message}`})
            }
        }
    }
    
    render(){
        const {userData, userImgSrc} = this.state;
        let allowUploadImg = true;
        if(userData.id!==undefined && userData.id.split('-')[0] === 'google'){
            allowUploadImg = false;
        }
        return(
            <div style={{paddingLeft: '5%'}} >
                <div className='imgArea' style={{boxShadow: '0px 3px 10px 1px rgba(138,133,148,0.74)', display:'inline-block', padding:'5%'}}>
                    {userImgSrc!=null ? <img src={userImgSrc} alt="user img" width='180'></img>:
                    <div>Upload your new user image</div>}
                    { allowUploadImg && <FileUpload id={userData.id} refreshImage={this.refreshImage}/>}
                </div>
                <div className="userData" >
                <table className="table table-borderless" style={{width: '30%', marginTop:'5%', marginLeft: '3%', fontSize:'110%', color:'grey'}}>
                     <tbody>   
                        <tr>
                            <th scope="row">id</th><td>{userData.id}</td>
                        </tr>
                        <tr>    
                            <th scope="row">Name</th><td>{userData.name}</td>
                        </tr>
                        <tr>    
                            <th scope="row">e-mail</th><td>{userData.email}</td>
                        </tr>    
                        <tr>
                            <th scope="row">Access</th><td>{userData.access}</td>
                        </tr>
                    </tbody>
                </table>    
                </div>
            </div>
        )
    }
}