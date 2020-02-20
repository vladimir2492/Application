import React from 'react';
import ReviewService from '../../services/ReviewService';
import LastComment from './LastComment';
const reviewService = new ReviewService();
import ButtonsArea from '../DrawTableComponents/ButtonsArea';

export default class RestArea extends React.Component{
    
    render(){
        const{id, name, address, id_owner, rating} = this.props.data;
        const {min, max, average} = rating;
        const {options} = this.props; 
        const buttons = options.buttons; 
        
        return(
            <div className="restArea" style={{border: 'grey solid 1px', padding:'3%', color:'black', margin:'5%', marginLeft:'10%', marginRight:'10%'}}>
                <div className="id"><b>id:</b> {id}</div>
                <div className="restName"><b>Name of restaurant:</b> {name}</div>
                <div className="restAddress"><b>Address:</b> {address}</div>
                <div className="rating">
                    <div className="min"><b>Minimum grade:</b> {min}</div>
                    <div className="max"><b>Maximum grade:</b> {max}</div>
                    <div className="average"><b>Average grade:</b> {average}</div>
                </div>
               
                {this.props.data.last_review && <LastComment data={this.props.data.last_review} />}

                <ButtonsArea data={buttons} rowData={{rest_name: name}}/>
                
                
            </div>
        )
    }
}