import React, {Fragment} from "react";
import axios from 'axios';
import {BACKEND_URL} from '../../config';

export default class FileUpload extends React.Component{

    state={
        selectedFile:'',
        selectedFileName:'Choose img',
        uploadPercentage: 0
    }

    selectHandler = (event) => {
        this.setState({
            selectedFile: event.target.files[0],
            selectedFileName: event.target.files[0].name
        })
    }

    submitHandler = async(event) => {
        const userId = this.props.id;
        const path = `${BACKEND_URL}/upload`;
        event.preventDefault();
        const file = this.state.selectedFile;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('id', userId);
        const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        try{
            const res = await axios.post(path, formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + authToken 
                },
                onUploadProgress: progressEvent => {
                    this.setState({uploadPercentage:
                      parseInt(
                        Math.round((progressEvent.loaded * 100) / progressEvent.total)
                      )}
                    );
                    // Clear percentage
                    setTimeout(() => {
                        this.setState({uploadPercentage:0, selectedFileName:'Choose img'});
                        this.props.refreshImage(userId);
                    }
                    , 1000);
                    
                }
            })
        }catch(err){
            console.log('Error!!!')
        }
    }
    
    render(){       
        const {selectedFile, selectedFileName, uploadPercentage} = this.state;
        return(
            <Fragment>
                <form onSubmit={this.submitHandler}>
                    <div className="input-group" style={{marginTop:'3%'}}>
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="inputGroupFile04" accept="image/*" onChange={this.selectHandler}/>
                        <label className="custom-file-label" htmlFor="inputGroupFile04">{this.state.selectedFileName}</label>
                    </div>
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="submit">Upload</button>
                    </div>
                    </div>
                </form> 
                <div className="progress">
                    <div className="progress-bar"
                        role="progressbar" 
                        style={{width: `${uploadPercentage}%`}}>
                        {uploadPercentage}%
                    </div>
                </div>
            </Fragment>
        )
    }
}