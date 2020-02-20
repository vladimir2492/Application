import React from 'react';

export default class LastComment extends React.Component{
    render(){
        const {id, text_review, rating, rest_name, visit_date} = this.props.data;
        let {answer} = this.props;
        if(answer!=null){
            answer = 'Owner of restaurant answer: \n'+answer;
        }
        if(id!=null){
           return(
            <div className="lastCommenr" style={{marginTop:'3%', boxShadow: '0px 3px 10px 1px rgba(138,133,148,0.74)', padding:'1%', display:'block',textAlign:'center', width:'40%'}}>
                <b>LAST COMMENT:</b>
                <div className="id"><b>id: </b>{id}</div>
                <div className="restName"><b>Name of restaurant: </b>{rest_name}</div>
                <div className="text" style={{fontSize:'130%'}}><b>{text_review}</b></div>
                <div className="rating"><b>Rating of restaurant: </b>{rating}</div>
                <div className="visitDate"><b>Date of visit is: </b>{visit_date}</div>
                <div className="answer">
                   {answer}
                </div>
            </div>
            ) 
        }
        return(
            <div className="placeForLastComment"></div>
        )
        
    }
}