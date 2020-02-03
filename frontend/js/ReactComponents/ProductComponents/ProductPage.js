import React from 'react';
import Grid from '../DrawTableComponents/Grid';
import Button from "react-bootstrap/Button";
import ProductService from '../../services/ProductService';
import ModalContainer from '../DrawTableComponents/ModalContainer';
import ProductForm from './ProductForm';


export default class ProductPage extends React.Component{
    constructor(props){
        super(props);
        
        this.onAddPress = this.onAddPress.bind(this);
        this.closeAddForm = this.closeAddForm.bind(this);
        this.state={
            data:[],
            editRowData:'',
            showEditModal: false, 
            isLoading: false,
            options: {
                columns: ['id', 'category', 'model', 'discription', 'quantity', 'sales', 'price'],
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
        const productService = new ProductService();
        await productService.deleteRow(id);
        this.refreshData();
    }

    onAddPress() {
        this.setState({ showEditModal: true, addOrEdit: 'add'})
    }

    closeAddForm(){
        this.setState({ showEditModal: false})
    }

    refreshData = async() =>  {
        const productService = new ProductService();
        const productsData = await productService.fetchData();
        this.setState({
            isLoading: true,
            data: productsData,           
        })
    }
    
    render(){        
        let {data, isLoading, showEditModal} = this.state;
        let title='';
        let readOnly, rowData;
        if(this.state.addOrEdit === 'add'){
            title = 'Add product';
            readOnly = false;
            rowData = {};
            
        }
        if(this.state.addOrEdit === 'edit'){
            title = 'Edit product';
            readOnly = true
            rowData = this.state.editRowData;
           
        }
        return (
            <div>
                <Grid options={this.state.options} data={data} isLoading={isLoading} />
                <Button variant="primary" onClick={this.onAddPress}>
                    Add product
                </Button>
                <ModalContainer show={showEditModal} onHide={this.closeAddForm} title={title}>
                    <ProductForm onComplete={this.onFormEditComplete} data={rowData} readOnly={readOnly}/>
                </ModalContainer>
            </div>
        )                   
    }
}


