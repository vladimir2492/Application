import React from 'react';
import Grid from '../DrawTableComponents/Grid';
import Button from 'react-bootstrap/Button';
import ModalContainer from '../DrawTableComponents/ModalContainer';
import UserService from '../../services/UserService';
import UserForm from './UserForm';


export default class UserPage extends React.Component{
    constructor(props){
        super(props);
        
        this.state={
            data:[],
            buttonsAccess: false,
            editRowData:'',
            showEditModal: false, 
            isLoading: false,
            addOrEdit: '',
            options: {
                columns: ['id', 'name', 'email', 'login', 'password', 'access'],
                buttons: [
                    { name: 'Edit', handler: (obj) => this.onEdit(obj), style: {margin:'1%'}},
                    { name: 'Delete', handler: (obj) => this.onDelete(obj), style: {margin:'1%'}}
                    
                ]
            }            
        }
    }

    async componentDidMount(){
        this.refreshData();
        const result = await this.showButtons();
        this.setState({buttonsAccess: result})
        
    }

    onEdit = (object) => {
        this.setState({ showEditModal: true , addOrEdit: 'edit', editRowData: object})
    }

    onFormEditComplete = () => {
        this.closeAddForm();
        this.refreshData();
    }

    async onDelete (object) {
        const id = object.id;
        if (!id) {
            return;
        }
        const userService = new UserService();
        await userService.deleteRow(id);
        this.refreshData();
    }

    onAddPress = () => {
        this.setState({ showEditModal: true , addOrEdit: 'add'})
    }

    closeAddForm = () => {
        this.setState({ showEditModal: false})
    }

    refreshData = async() => {
        const userService = new UserService();
        const usersData = await userService.fetchData();
        this.setState({
            isLoading: true,
            data: usersData
        })
       
    }

    showButtons = async() => {
        const userService = new UserService();
        const result = await userService.access();
        
        if(!result.error){
            if( result.message == 'User'){
                return false;
            }
            return true;
        }return false
    }
    
    render(){
             
        const {data, isLoading, showEditModal, buttonsAccess} = this.state;
        let title='';
        let readOnly, rowData;
        if(this.state.addOrEdit === 'add'){
            title = 'Add user';
            readOnly = false;
            rowData = {};
            
        }
        if(this.state.addOrEdit === 'edit'){
            title = 'Edit user';
            readOnly = true
            rowData = this.state.editRowData;
           
        }
        return (
            <div>
                <Grid options={this.state.options} data={data} isLoading={isLoading} butAccess={buttonsAccess}  component ='users'/>
                {buttonsAccess ? 
                <Button  variant="primary" onClick={this.onAddPress}>
                    Add user
                </Button>
                : null}
                <ModalContainer show={showEditModal} onHide={this.closeAddForm} title={title}>
                    <UserForm onComplete={this.onFormEditComplete} data={rowData} readOnly={readOnly}/>
                </ModalContainer>
            </div>
        )    
    }
}



