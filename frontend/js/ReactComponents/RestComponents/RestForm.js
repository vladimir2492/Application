import React from "react";
import RestService from '../../services/RestService';
const restService = new RestService();
import ErrorMessage from '../MainComponent/ErrorMessage';
import Select from 'react-select';



export default class RestForm extends React.Component{
    
    constructor(props){
        super(props);
        this.props = props;
        this.state = {
            name: '',
            address: '',
            id_owner: '',
            errorMassage: false,
            errorText:'',
            options: [],
            isDisabled: false
        }
    }

    componentDidMount(){
        const {data, owners, accessObj} = this.props;
        if(accessObj.access == 'Owner'){
            this.setState({
                isDisabled: true
            })
        }
        let options = [];
        let defaultSelectValue;
        for(let owner of owners){
            options.push({value: owner.id, label: `${owner.login}: ${owner.id}`})
        }
        for(let opt of options){
            if(data.id_owner == opt.value){
                defaultSelectValue = opt;
            } 
        }
        this.setState({
            name: data.name,
            address: data.address,
            id_owner: defaultSelectValue,
            options: options
        })
    }

    submitHandler = async (event) => {  
        event.preventDefault();
        const {name, address, id_owner} = this.state;
        let result;
        const id = this.props.data.id;
        if(this.props.addOrEdit == 'edit'){
            result = await restService.edit(id, name, address, id_owner.value); 
        }else{
            result = await restService.add(name, address, id_owner.value);    
        }
        if (result.error) {
          this.setState({
              errorMessage: true,
              errorText: result.message
          })
          setTimeout(this.props.onComplete, 3000);
        }else{
          this.props.onComplete();  
        }   
    }

    onCangeHandler = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value
        })
    }

    selectChange = selectedOption => {
        this.setState({ 
            id_owner: selectedOption
        });
    };

    render(){
        const {data, readOnly} = this.props;
        const {errorMessage, errorText, options, isDisabled} = this.state;
       
    return(
        <>
        {errorMessage == true ? <ErrorMessage text={errorText}/>
        :  
        <form style={{marginLeft:'1%', marginRight:'1%'}} className="alert alert-primary" onSubmit={(ev) => this.submitHandler(ev)} >
        <fieldset>

            <div className="form-group">
                <label htmlFor="inputName">Restaurant name</label>
                <input id="inputName" type="text" name="name" className="form-control" required onChange={this.onCangeHandler} defaultValue={data.name}/>
            </div>

            <div className="form-group">
                <label htmlFor="inputAddress">Address</label>
                <input id="inputAddress" type="text" name="address" className="form-control" required onChange={this.onCangeHandler} defaultValue={data.address}/>
            </div>

            <div className="form-group">
                <label htmlFor="inputIdOwner">id of owner</label>
                {/*<input id="inputIdOwner" type="text" name="id_owner" className="form-control" required onChange={this.onCangeHandler} defaultValue={data.id_owner}/> */}
                <Select isDisabled={isDisabled} value={this.state.id_owner} options={options} onChange={this.selectChange} />
            
            </div>
            
            <button type="submit" className="btn btn-primary">Submit</button>

            </fieldset>
        </form> }
        </>
        
    )
    }
}





