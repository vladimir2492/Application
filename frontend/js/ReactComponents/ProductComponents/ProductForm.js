import React from "react";
import Modal from "react-bootstrap/Modal";
import ProductService from '../../services/ProductService';

export default class ProductForm extends React.Component{
    
    constructor(props){
        super(props);
        this.props = props;
        this.state = {
            category:'',
            model:'',
            discription:'',
            quantity:'',
            sales:'',
            price:'',            
        }
    }

    componentDidMount(){
        const {data} = this.props;
        this.setState({
            //id: data.id,
            category: data.category,
            model: data.model,
            discription: data.discription,
            quantity: data.quantity,
            sales: data.sales,
            price: data.price
        })
    }


    submitHandler = async (event) => {  
        event.preventDefault();
        const productService = new ProductService();
        const {category, model, discription, quantity, sales, price} = this.state;
        let result;
        const id = this.props.data.id;
        if(this.props.readOnly){
            result = await productService.edit(id, category, model, discription, quantity, sales, price); 
        }else{
            result = await productService.add(category, model, discription, quantity, sales, price);    
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
        const {data, readOnly} = this.props;
    return(
        <form style={{marginLeft:'1%', marginRight:'1%'}} className="alert alert-primary" onSubmit={(ev) => this.submitHandler(ev)} >
        <fieldset>
            <div className="form-group">
                <label htmlFor="inputCategory">Category</label>
                <input id="inputCategory" /*readOnly={readOnly}*/ name="category" placeholder="Computer" className="form-control" required onChange={this.onCangeHandler} value={data.category}/>
            </div>
            <div className="form-group">
                <label htmlFor="inputModel">Model</label>
                <input id="inputModel" name="model" className="form-control" required onChange={this.onCangeHandler} defaultValue={data.model}/>
            </div>
            <div className="form-group">
                <label htmlFor="inputDiscription">Discription</label>
                <input id="inputDiscription" defaultValue={data.discription} name="discription" className="form-control" required onChange={this.onCangeHandler} />
            </div>
            <div className="form-group">
                <label htmlFor="inputQuantity">Quantity</label>
                <input id="inputQuantity" name="quantity" defaultValue={data.quantity} className="form-control " type="number" min="0" required onChange={this.onCangeHandler} />
            </div>
            <div className="form-group">
                <label htmlFor="inputSales">Sales</label>
                <input id="inputSales" name="sales" defaultValue={data.sales} className="form-control" type="number" min="0" required onChange={this.onCangeHandler} />
            </div>
            <div className="form-group">
                <label htmlFor="inputPrice">Price</label>
                <input id="inputPrice" name="price" defaultValue={data.price} className="form-control" type="number" min="0" required onChange={this.onCangeHandler} />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>

            </fieldset>
        </form> 
        
    )
    }
}

