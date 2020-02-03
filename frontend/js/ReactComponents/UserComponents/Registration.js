import React from 'react';
import Button from 'react-bootstrap/Button';
import ModalContainer from '../DrawTableComponents/ModalContainer';
import UserForm from './UserForm';

export default class Registration extends React.Component{
    constructor(props){
        super(props);

        this.state={
            showModal: false
        }
    }

    onRegistrPress = () => {
        this.setState({ showModal: true , addOrEdit: 'add'})
    }

    closeForm = () => {
        this.setState({ showModal: false})
    }

    render(){
        const title = 'Registration';
        const readOnly = false;
        const {showModal} = this.state;
        return(
            <div>
                <Button onClick={this.onRegistrPress} style={{fontSize: '150%'}}>
                    Registration
                </Button>  
                <ModalContainer show={showModal} onHide={this.closeForm} title={title}>
                    <UserForm onComplete={this.closeForm} data={{}} readOnly={readOnly} registr='registr'/>
                </ModalContainer>
            </div>
        )
    }
}