import React from "react";
import ReviewService from '../../services/ReviewService';
const reviewService = new ReviewService();
import RestService from '../../services/RestService';
const restService = new RestService();
import Select from 'react-select';

export default class ReviewForm extends React.Component{
    
    constructor(props){
        super(props);
        this.props = props;
        this.state = {
            text_review: '',
            rating: '',
            rest_name: '',
            answer:'',
            visit_date: '',
            rests: []
        }
    }

    async componentDidMount(){
        const {data} = this.props;
        const rests = await restService.fetchData();
        
        this.setState({
            text_review: data.text_review,
            rating: data.rating,
            rest_name: data.rest_name,
            answer: data.answer,
            visit_date: data.visit_date,
            rests: rests
        })
    }

    selectChange = selectedOption => {
      this.setState({ 
        rest_name: selectedOption.value 
      },
        () => console.log(`Option selected:`, this.state.rest_name)
      );
    };

    submitHandler = async (event) => {  
        event.preventDefault();
        const {text_review, rating, rest_name, answer, visit_date} = this.state;
        let result;
        const id = this.props.data.id;
        if(this.props.addOrEdit==='edit'){
            result = await reviewService.edit(id, text_review, rating, rest_name, answer, visit_date); 
        }else{
            result = await reviewService.add(text_review, rating, rest_name, answer, visit_date);    
        }
        if (result.error) {
          alert('Wrong credential.')
          return;
        }   
        this.props.onComplete();
    }

    onCangeHandler = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value
        })
    }

    render(){
        const {data, readOnly, editOwner} = this.props;
        const word = 'checked';
        const {rests} = this.state;
        const options = [];
        for(let r of rests){
          options.push({
            value: r.name, label: r.name
          })
        }
        
        
    return(
        <form style={{marginLeft:'1%', marginRight:'1%'}} className="alert alert-primary" onSubmit={(ev) => this.submitHandler(ev)} >
        <fieldset>
            
            <div className="form-group">
                <label htmlFor="inputRestName">Reastaurant name</label>
                {this.props.forRestNameType !== true  ?
                <input id="inputRestName" type="text" name="rest_name" className="form-control" required onChange={this.onCangeHandler} readOnly={editOwner} defaultValue={data.rest_name}/>
                :
                //place for select element
                  <Select value={this.state.rest_name} onChange={this.selectChange} options={options} />
                }
            </div>
            
            <div className="form-group">
                <label htmlFor="inputTextReview">Text of review</label>
                <textarea readOnly={editOwner} rows="4" id="inputTextReview" className="form-control" name="text_review" required onChange={this.onCangeHandler} defaultValue={data.text_review}></textarea>
            </div>

            <div>
              <p>Rating of restaurant: </p>
            <div className="form-check form-check-inline">
              <input checked={this.state.rating === "1"} disabled={editOwner} className="form-check-input" type="radio" name="rating" id={"inlineRadio1"} value="1" onChange={this.onCangeHandler}/>
              <label className="form-check-label" htmlFor="inlineRadio1">1</label>
            </div>
            <div className="form-check form-check-inline" >
              <input checked={this.state.rating === "2"} disabled={editOwner} className="form-check-input" type="radio" name="rating" id="inlineRadio2" value="2" required onChange={this.onCangeHandler}/>
              <label className="form-check-label" htmlFor="inlineRadio2">2</label>
            </div>
            <div className="form-check form-check-inline" >
              <input checked={this.state.rating === "3"} disabled={editOwner} className="form-check-input" type="radio" name="rating" id="inlineRadio3" value="3" required onChange={this.onCangeHandler}/>
              <label className="form-check-label" htmlFor="inlineRadio3">3</label>
            </div>
            <div className="form-check form-check-inline" >
              <input checked={this.state.rating === "4"} disabled={editOwner} className="form-check-input" type="radio" name="rating" id="inlineRadio4" value="4" required onChange={this.onCangeHandler}/>
              <label className="form-check-label" htmlFor="inlineRadio4">4</label>
            </div>
            <div className="form-check form-check-inline" >
              <input checked={this.state.rating === "5"} disabled={editOwner} className="form-check-input" type="radio" name="rating" id="inlineRadio5" value="5" required onChange={this.onCangeHandler}/>
              <label className="form-check-label" htmlFor="inlineRadio5">5</label>
            </div>
            </div>
              
            <div className="form-group">
              <label htmlFor="inputVisitDate">Date of visit</label>
              <input id="inputVisitDate" readOnly={editOwner} type="date" name="visit_date" className="form-control" onChange={this.onCangeHandler} defaultValue={data.visit_date} />
            </div>

            <div className="form-group">
                <label htmlFor="inputAnswer">Answer of owner</label>
                <textarea readOnly={readOnly} rows="4" id="inputAnswer" className="form-control" name="answer" onChange={this.onCangeHandler} defaultValue={data.answer}></textarea>
            </div>
          
            <button type="submit" className="btn btn-primary">Submit</button>

            </fieldset>
        </form> 
        
    )
    }
}
