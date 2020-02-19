import React from 'react';
import Grid from '../DrawTableComponents/Grid';
import Button from "react-bootstrap/Button";
import RestService from '../../services/RestService';
import ModalContainer from '../DrawTableComponents/ModalContainer';
import RestForm from './RestForm';
const restService = new RestService();
import UserService from '../../services/UserService';
const userService = new UserService();

export default class RestPage extends React.Component{
    constructor(props){
        super(props);
        
        this.state={
            data:[],
            addOrEdit:'',
            editRowData:'',
            showEditModal: false, 
            isLoading: false,
            owners: [],
            access:'',
            options: {
                columns: ['id', 'name', 'address', 'id_owner'],
                buttons: [
                    { name: 'Edit', handler: (obj) => this.onEdit(obj), style: {margin:'1%'}},
                    { name: 'Delete', handler: (obj) => this.onDelete(obj), style: {margin:'1%'}}
                    
                ]
            }            
        }
    }

    componentDidMount(){
        this.refreshData();
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
        await restService.deleteRow(id);
        this.refreshData();
    }

    onAddPress = () => {
        this.setState({ showEditModal: true, addOrEdit: 'add'})
    }

    closeAddForm = () => {
        this.setState({ showEditModal: false})
    }

    refreshData = async() =>  {
        //look at access of current user
        const accessRow = await userService.access();
        let accessObj, restsData;
        if(!accessRow.error){
            accessObj = { access: accessRow.message.access, id: accessRow.message.id};
            this.setState({
                access: accessObj
            })
            if(accessObj.access == 'Owner'){
                //выведем все рестораны владельца
                const data = await restService.restsOfOneOwner(accessObj.id);
                if(!data.error){
                    restsData = data.message
                }
            }
            if(accessObj.access == 'Admin'){
                restsData = await restService.fetchData(); 
            }
        }
        //создадим список владельцев
        const users = await userService.fetchData();
        let arrOwners = [];
        for(let user of users){
            if(user.access == 'Owner'){
              arrOwners.push(user)  
            }
        }
        if(arrOwners.length!=0){
            this.setState({
                owners:arrOwners
            })
        }
        this.setState({
            isLoading: true,
            data: restsData,           
        })
    }
    
    render(){        

        let {data, isLoading, showEditModal, owners, access} = this.state;
        let title='';
        let readOnly, rowData;
        if(this.state.addOrEdit === 'add'){
            title = 'Add restaurant';
            readOnly = false;
            rowData = {};
            if(access.access == 'Owner'){
                rowData = {id_owner: access.id}
            }
        }
        if(this.state.addOrEdit === 'edit'){
            title = 'Edit restaurant';
            readOnly = true
            rowData = this.state.editRowData;
        }
        return (
            <div>
                <Grid options={this.state.options} data={data} isLoading={isLoading} />
                <Button variant="primary" onClick={this.onAddPress}>
                    Add restaurant
                </Button>
                <ModalContainer show={showEditModal} onHide={this.closeAddForm} title={title}>
                    <RestForm accessObj={access} onComplete={this.onFormEditComplete} data={rowData} readOnly={readOnly} addOrEdit={this.state.addOrEdit} owners={owners}/>
                </ModalContainer>
            </div>
        )                   
    }
}
