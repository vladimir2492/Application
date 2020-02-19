import React from 'react';
import Grid from '../DrawTableComponents/Grid';
import Button from "react-bootstrap/Button";
import ReviewService from '../../services/ReviewService';
import ModalContainer from '../DrawTableComponents/ModalContainer';
import ReviewForm from './ReviewForm';
const reviewService = new ReviewService();
import UserService from '../../services/UserService';
const userService = new UserService();
import RestService from '../../services/RestService';
const restService = new RestService();

const compare = function (a, b){
    if(a.rest_name > b.rest_name) return 1;
    if(b.rest_name > a.rest_name) return -1;
    return 0;
}

export default class ReviewPage extends React.Component{
    constructor(props){
        super(props);
        
        this.state={
            data:[],
            editRowData:'',
            showEditModal: false, 
            isLoading: false,
            access:'',
            options: {
                columns: ['id', 'rest_name', 'text_review', 'rating', 'answer', 'visit_date'],
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
        await reviewService.deleteRow(id);
        this.refreshData();
    }

    onAddPress = () => {
        this.setState({ showEditModal: true, addOrEdit: 'add'})
    }

    closeAddForm = () => {
        this.setState({ showEditModal: false})
    }

    refreshData = async() =>  {
        //look at access of user
        let reviewsWithoutAnswer = [];
        const userRow = await userService.access();
        if(!userRow.error){
            if(userRow.message.access == 'Owner'){
                const id = userRow.message.id;
                const rests = await restService.fetchData();
                if(rests.length != 0){
                    const ownerRests = [];
                    for(let rest of rests){
                        if(rest.id_owner == id){
                            ownerRests.push(rest);
                        }
                    }
                    //console.log('ownerRests = '+ JSON.stringify(ownerRests, null, 4))
                    if(ownerRests.length!=0){
                        const reviewsData = await reviewService.oneRestReviewsWithoutAnswer(ownerRests);
                        if(!reviewsData.error){
                            reviewsWithoutAnswer = reviewsData.message;
                        }
                    }
                }
            }
            if(userRow.message.access == 'Admin'){
                reviewsWithoutAnswer = await reviewService.fetchData();
                reviewsWithoutAnswer = reviewsWithoutAnswer.sort(compare);
            }
        }
        this.setState({
            isLoading: true,
            data: reviewsWithoutAnswer,  
            access: userRow.message.access         
        })
    }
    
    render(){        
        let {data, isLoading, showEditModal, access, options} = this.state;
        let ownerDelete;
        let title='';
        const readOnly= false;
        let rowData, forRestNameType;
        let editOwner = false;
        if(this.state.addOrEdit === 'add'){
            title = 'Add review';
            rowData = {};
            forRestNameType = true;
        }
        if(this.state.addOrEdit === 'edit'){
            title = 'Edit review';
            rowData = this.state.editRowData;
            if(access == 'Owner'){
                editOwner = true;
            }
        }
        //если это владелец, то удаляем кнопку удаления на странице комментариев
        if(access == 'Owner'){
            for(let i=0; i<options.buttons.length; i++){
                if(options.buttons[i].name == 'Delete'){
                    options.buttons.splice(i, 1)
                }
            }
        }
        
        
      
        return (
            <div>
                <Grid options={options} data={data} isLoading={isLoading}  />
                <Button style={access == 'Owner' ? {display: 'none'} : {}} variant="primary" onClick={this.onAddPress}>
                    Add review
                </Button>
                <ModalContainer show={showEditModal} onHide={this.closeAddForm} title={title}>
                    <ReviewForm editOwner={editOwner} onComplete={this.onFormEditComplete} data={rowData} readOnly={readOnly} addOrEdit={this.state.addOrEdit} forRestNameType={forRestNameType}/>
                </ModalContainer>
            </div>
        )                   
    }
}


