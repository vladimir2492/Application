import React from 'react';
import RestService from '../../services/RestService';
const restService = new RestService();
import RestArea from './RestArea';
import ReviewService from '../../services/ReviewService';
const reviewService = new ReviewService();
import ModalContainer from '../DrawTableComponents/ModalContainer';
import ReviewForm from '../ReviewComponents/ReviewForm';

export default class ReactPageForUser extends React.Component{
    state={
        restsData: [],
        showModal: false,
        addOrEdit: '',
        rowData:'',
        options: {
            buttons: [
                { name: 'Add new comment', handler: (obj) => this.onAdd(obj), style: {display:'block', marginLeft:'auto'}} 
            ]
        } 
    }
    async componentDidMount(){
        this.refreshData();        
    }

    onFormComplete = () => {
        this.closeAddForm();
        this.refreshData();
    }

    closeAddForm = () => {
        this.setState({ showModal: false})
    }

    refreshData = async() => {
        let data = await restService.fetchData();
        for(let d of data){
            const rating = await reviewService.getRating(d.name);
            if(!rating.error){
                d.rating = rating.message
            }
            const lastComment = await reviewService.lastReview(d.name);
            const result = lastComment.message;
            if(!lastComment.error && result!=null){
                d.last_review=result
            }
        }
        data = data.sort(compare);
       
        this.setState({
            restsData: data
        }) 
    }

    onAdd = (object) => {
        this.setState({ showModal: true , addOrEdit: 'add', rowData: object})
    }

    

    render(){
        const {restsData, showModal, options, rowData} = this.state;
        const readOnly = true;
        const title = 'Add new comment';
        
        return (
            <>
            {
            restsData.map(
                function(rest){
                    return <RestArea data={rest} options={options} key={rest.id}/> 
                }
            )
            }    
            <ModalContainer show={showModal} onHide={this.closeAddForm} title={title}>
                <ReviewForm onComplete={this.onFormComplete} data={rowData} readOnly={readOnly}/>
            </ModalContainer>
            </>
        )
    }
}

function compare(a, b){
    if(a.rating.average > b.rating.average) return -1;
    if(b.rating.average > a.rating.average) return 1;
    return 0;
}